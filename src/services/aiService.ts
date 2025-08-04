
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
        answer: "Please provide your Perplexity API key to get real AI-powered answers.",
        error: "No API key provided"
      };
    }

    try {
      const systemPrompt = this.getSystemPrompt(subject);
      
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
              content: question
            }
          ],
          temperature: 0.3,
          top_p: 0.9,
          max_tokens: 2000,
          return_images: false,
          return_related_questions: false,
          search_recency_filter: 'month',
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return {
          answer: data.choices[0].message.content
        };
      } else {
        throw new Error('Invalid response format from AI service');
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        answer: "I apologize, but I'm having trouble processing your request right now. Please check your API key and try again.",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private getSystemPrompt(subject: string): string {
    const basePrompt = "You are an expert educational AI assistant. Provide clear, accurate, and comprehensive answers that help students learn. Structure your responses with step-by-step explanations when appropriate.";
    
    const subjectPrompts = {
      math: "You specialize in mathematics. Break down problems step by step, show calculations clearly, and explain the reasoning behind each step. Include formulas when relevant.",
      science: "You specialize in scientific subjects including physics, chemistry, and biology. Explain concepts clearly with examples and relate them to real-world applications.",
      english: "You specialize in English language arts, literature, grammar, and writing. Provide detailed explanations with examples and help improve writing skills.",
      reasoning: "You specialize in logical reasoning and critical thinking. Help students analyze problems systematically and develop problem-solving strategies.",
      geography: "You specialize in geography, world cultures, and environmental studies. Provide comprehensive information about places, cultures, and geographical phenomena.",
      knowledge: "You have broad knowledge across multiple subjects. Provide well-researched, factual answers with context and background information.",
      diagrams: "You specialize in interpreting and explaining visual content including diagrams, charts, and graphs. Describe what you see and explain the concepts shown."
    };

    return basePrompt + " " + (subjectPrompts[subject as keyof typeof subjectPrompts] || subjectPrompts.knowledge);
  }
}

export const aiService = new AIService();
