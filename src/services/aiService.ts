
interface AIResponse {
  answer: string;
  error?: string;
}

export class AIService {
  private apiKey: string | null = null;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || null;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  async answerQuestion(question: string, subject: string = 'general'): Promise<AIResponse> {
    if (!this.apiKey) {
      return {
        answer: "कृपया सही AI-powered जवाब पाने के लिए अपनी Perplexity API key प्रदान करें।",
        error: "No API key provided"
      };
    }

    try {
      const enhancedQuestion = this.enhanceQuestion(question, subject);
      const systemPrompt = this.getSystemPrompt(subject);
      
      console.log("Sending request to Perplexity API with question:", enhancedQuestion);
      
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-large-128k-online',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: enhancedQuestion
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 3000,
          return_images: false,
          return_related_questions: false,
          search_recency_filter: 'month',
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      console.log("API Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("API Response data:", data);
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const answer = data.choices[0].message.content;
        console.log("Generated answer:", answer.substring(0, 100) + "...");
        return {
          answer: this.formatAnswer(answer, subject)
        };
      } else {
        throw new Error('Invalid response format from AI service');
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        answer: "क्षमा करें, मैं अभी आपके प्रश्न का उत्तर देने में असमर्थ हूं। कृपया अपनी API key की जांच करें और दोबारा कोशिश करें। यदि समस्या बनी रहे तो कृपया प्रश्न को अलग तरीके से पूछने की कोशिश करें।",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private enhanceQuestion(question: string, subject: string): string {
    // Add context to make the question more specific and get better answers
    const subjectContext = {
      math: "गणित की समस्या: ",
      science: "विज्ञान का प्रश्न: ",
      english: "अंग्रेजी भाषा का प्रश्न: ",
      reasoning: "तर्क और विश्लेषण: ",
      geography: "भूगोल का प्रश्न: ",
      knowledge: "सामान्य ज्ञान: ",
      diagrams: "चित्र/आरेख विश्लेषण: "
    };

    const context = subjectContext[subject as keyof typeof subjectContext] || "";
    
    // Enhanced question with clear instructions for better answers
    return `${context}${question}

कृपया इस प्रश्न का विस्तृत, सटीक और समझने योग्य उत्तर दें। यदि यह एक समस्या है तो step-by-step समाधान प्रदान करें।`;
  }

  private formatAnswer(answer: string, subject: string): string {
    // Clean and format the answer for better readability
    let formattedAnswer = answer.trim();
    
    // Add subject-specific formatting
    if (subject === 'math') {
      // Ensure math steps are clearly formatted
      formattedAnswer = formattedAnswer.replace(/Step (\d+):/g, '\n**चरण $1:**');
      formattedAnswer = formattedAnswer.replace(/Solution:/g, '\n**समाधान:**');
      formattedAnswer = formattedAnswer.replace(/Answer:/g, '\n**उत्तर:**');
    }
    
    // Add helpful footer
    formattedAnswer += "\n\n---\n*यह AI द्वारा generated उत्तर है। यदि आपको और स्पष्टीकरण चाहिए तो कृपया follow-up प्रश्न पूछें।*";
    
    return formattedAnswer;
  }

  private getSystemPrompt(subject: string): string {
    const basePrompt = `आप एक expert शैक्षिक AI assistant हैं। आपका काम students की मदद करना है। हमेशा clear, accurate, और comprehensive उत्तर दें जो students को सीखने में मदद करें। जब भी उचित हो तो step-by-step explanations दें।

महत्वपूर्ण निर्देश:
- हमेशा सटीक और factual जानकारी दें
- Complex concepts को simple भाषा में समझाएं  
- उदाहरण और real-world applications शामिल करें
- यदि आप किसी चीज़ के बारे में निश्चित नहीं हैं तो इसे स्पष्ट रूप से बताएं
- Step-by-step solutions प्रदान करें जहाँ applicable हो`;
    
    const subjectPrompts = {
      math: "आप गणित के specialist हैं। हर problem को step-by-step तोड़ें, calculations clearly दिखाएं, और हर step की reasoning समझाएं। Relevant formulas भी शामिल करें।",
      science: "आप scientific subjects (physics, chemistry, biology) के specialist हैं। Concepts को clearly समझाएं with examples और real-world applications से relate करें।",
      english: "आप English language arts, literature, grammar, और writing के specialist हैं। Detailed explanations दें with examples और writing skills improve करने में help करें।",
      reasoning: "आप logical reasoning और critical thinking के specialist हैं। Students को problems को systematically analyze करने और problem-solving strategies develop करने में help करें।",
      geography: "आप geography, world cultures, और environmental studies के specialist हैं। Places, cultures, और geographical phenomena के बारे में comprehensive information प्रदान करें।",
      knowledge: "आप multiple subjects में broad knowledge रखते हैं। Well-researched, factual answers दें with context और background information।",
      diagrams: "आप visual content including diagrams, charts, और graphs को interpret और explain करने के specialist हैं। जो देखते हैं उसे describe करें और concepts को explain करें।"
    };

    return basePrompt + "\n\n" + (subjectPrompts[subject as keyof typeof subjectPrompts] || subjectPrompts.knowledge);
  }
}

export const aiService = new AIService();
