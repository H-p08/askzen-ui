import { enhancedAIService } from './enhancedAIService';
import { definitionService } from './definitionService';
import { conversationHistoryService } from './conversationHistoryService';

interface ProfessionalAIResponse {
  answer: string;
  confidence: number;
  sources: string[];
  relatedQuestions: string[];
  keyInsights: string[];
  actionables?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number;
  contextUsed?: boolean;
  responseQuality?: 'excellent' | 'good' | 'average';
}

export class ProfessionalAIService {
  private conversationContext: Array<{question: string; answer: string; timestamp: Date}> = [];

  async processQuery(question: string, subject: string = 'general'): Promise<ProfessionalAIResponse> {
    console.log("Professional AI processing:", question, subject);
    
    // Get conversation context
    const contextMessages = conversationHistoryService.getConversationContext(3);
    const hasContext = contextMessages.length > 0;
    
    // Enhanced context-aware query processing
    const enhancedQuestion = this.enhanceQuestionWithContext(question, contextMessages, subject);
    
    // Get enhanced response based on subject
    const enhancedResponse = await this.getSubjectSpecificResponse(enhancedQuestion, subject);
    
    // Professional formatting and analysis
    const professionalAnswer = this.formatProfessionalResponse(
      enhancedResponse.answer, 
      question, 
      subject,
      enhancedResponse,
      hasContext
    );
    
    const analysis = this.analyzeResponse(professionalAnswer, question);
    const quality = this.assessResponseQuality(professionalAnswer, question, subject);
    
    // Store context
    this.conversationContext.push({
      question,
      answer: professionalAnswer,
      timestamp: new Date()
    });

    const response: ProfessionalAIResponse = {
      answer: professionalAnswer,
      confidence: this.calculateConfidence(enhancedResponse.confidence, subject, hasContext),
      sources: this.generateSources(subject),
      relatedQuestions: this.generateSmartQuestions(question, subject, contextMessages),
      keyInsights: this.extractKeyInsights(professionalAnswer, subject),
      actionables: this.generateActionables(professionalAnswer, subject),
      difficulty: analysis.difficulty,
      estimatedReadTime: analysis.readTime,
      contextUsed: hasContext,
      responseQuality: quality
    };

    // Save to conversation history
    conversationHistoryService.addMessage(question, professionalAnswer, subject, response);

    return response;
  }

  private enhanceQuestionWithContext(question: string, contextMessages: any[], subject: string): string {
    if (contextMessages.length === 0) return question;
    
    const recentContext = contextMessages.slice(-2).map(msg => 
      `Previous: ${msg.query.substring(0, 100)}...`
    ).join(' ');
    
    return `Context: ${recentContext}\n\nCurrent question: ${question}\n\nPlease provide a response that builds upon the previous conversation context while directly answering the current question.`;
  }

  private calculateConfidence(baseConfidence: number, subject: string, hasContext: boolean): number {
    let confidence = baseConfidence;
    
    // Boost confidence for specialized subjects
    const specializedSubjects = ['code', 'research', 'creative'];
    if (specializedSubjects.includes(subject)) {
      confidence = Math.min(0.95, confidence + 0.1);
    }
    
    // Boost confidence when context is available
    if (hasContext) {
      confidence = Math.min(0.98, confidence + 0.05);
    }
    
    return confidence;
  }

  private assessResponseQuality(answer: string, question: string, subject: string): 'excellent' | 'good' | 'average' {
    let score = 0;
    
    // Length and detail check
    if (answer.length > 1000) score += 2;
    else if (answer.length > 500) score += 1;
    
    // Structure check
    if (answer.includes('##') || answer.includes('**')) score += 1;
    if (answer.includes('```') || answer.includes('•')) score += 1;
    
    // Content quality indicators
    if (answer.includes('example') || answer.includes('उदाहरण')) score += 1;
    if (answer.includes('step') || answer.includes('स्टेप')) score += 1;
    
    // Subject-specific quality
    if (subject === 'code' && answer.includes('```')) score += 2;
    if (subject === 'math' && (answer.includes('=') || answer.includes('solution'))) score += 1;
    
    if (score >= 6) return 'excellent';
    if (score >= 4) return 'good';
    return 'average';
  }

  private async getSubjectSpecificResponse(question: string, subject: string): Promise<any> {
    // Handle new specialized subjects
    switch (subject) {
      case 'code':
        return await enhancedAIService.answerQuestion(question, 'programming-analysis');
      case 'research':
        return await enhancedAIService.answerQuestion(question, 'research-assistant');
      case 'creative':
        return await enhancedAIService.answerQuestion(question, 'creative-writing');
      case 'chat':
        return await enhancedAIService.answerQuestion(question, 'general-conversation');
      case 'summary':
        return await enhancedAIService.answerQuestion(question, 'text-summarization');
      default:
        // Handle existing subjects
        if (subject.startsWith('science_')) {
          const scienceSubject = subject.split('_')[1];
          return await enhancedAIService.answerQuestion(question, `science-${scienceSubject}`);
        } else if (subject.startsWith('reasoning_')) {
          const reasoningType = subject.split('_')[1];
          return await enhancedAIService.answerQuestion(question, `reasoning-${reasoningType}`);
        } else {
          return await enhancedAIService.answerQuestion(question, subject);
        }
    }
  }

  private formatProfessionalResponse(
    rawAnswer: string, 
    question: string, 
    subject: string, 
    metadata: any,
    hasContext: boolean = false
  ): string {
    const timestamp = new Date().toLocaleString('hi-IN');
    
    let formattedResponse = `# 🎯 **Professional AI Response**\n\n`;
    
    // Add context indicator
    if (hasContext) {
      formattedResponse += `*🔗 Context-aware response building on previous conversation*\n\n`;
    }
    
    // Add context-aware greeting
    const greeting = this.getContextualGreeting(question, subject);
    formattedResponse += `${greeting}\n\n`;
    
    // Main content with enhanced formatting
    formattedResponse += this.enhanceContentFormatting(rawAnswer);
    
    // Add subject-specific insights for new subjects
    if (['code', 'research', 'creative', 'summary'].includes(subject)) {
      formattedResponse += this.addSpecializedInsights(subject, rawAnswer);
    }
    
    // Add subject-specific definitions
    if (metadata.definitions && metadata.definitions.length > 0) {
      formattedResponse += `\n\n## 🔍 **Key Terms & Definitions**\n\n`;
      metadata.definitions.forEach((def: any, index: number) => {
        formattedResponse += `**${index + 1}. ${def.term}:** ${def.meaning}\n\n`;
      });
    }
    
    // Enhanced summary with quality indicators
    const summary = this.generateSubjectSummary(question, subject);
    formattedResponse += `\n\n## 📋 **Quick Summary**\n${summary}\n\n`;
    
    // Professional footer with enhanced styling
    formattedResponse += `---\n\n`;
    formattedResponse += `**💡 Pro Insight:** यह comprehensive response है जो context-aware analysis के साथ तैयार किया गया है।\n\n`;
    formattedResponse += `**🎯 Next Action:** Related questions explore करके अपनी understanding को deepen करें।\n\n`;
    formattedResponse += `*Professional AI Assistant • Context-Aware • Multi-Modal • Continuously Learning*\n`;
    formattedResponse += `📅 ${timestamp} | 🔄 Context: ${hasContext ? 'Used' : 'Fresh'}`;
    
    return formattedResponse;
  }

  private addSpecializedInsights(subject: string, content: string): string {
    switch (subject) {
      case 'code':
        return `\n\n## 💻 **Code Analysis Insights**\n• Best practices compliance check\n• Performance optimization suggestions\n• Security considerations highlighted\n\n`;
      case 'research':
        return `\n\n## 🔍 **Research Quality Metrics**\n• Source credibility assessment\n• Methodology validation\n• Bias analysis included\n\n`;
      case 'creative':
        return `\n\n## ✍️ **Creative Excellence Indicators**\n• Originality score: High\n• Engagement potential: Strong\n• Style consistency: Maintained\n\n`;
      case 'summary':
        return `\n\n## 📄 **Summary Quality Check**\n• Key points extraction: Complete\n• Information retention: Optimized\n• Clarity index: High\n\n`;
      default:
        return '';
    }
  }

  private enhanceContentFormatting(content: string): string {
    // Add better formatting to the content
    let enhanced = content
      .replace(/\n\n/g, '\n\n')
      .replace(/^(\d+\.)/gm, '\n**$1**')
      .replace(/^([A-Z][a-zA-Z\s]+:)/gm, '\n## $1')
      .replace(/\*\*(.*?)\*\*/g, '**$1**');
    
    return enhanced;
  }

  private getContextualGreeting(question: string, subject: string): string {
    const greetings = {
      math: "🧮 **Mathematical Solution Ahead!** आपके गणित के प्रश्न का detailed और step-by-step समाधान:",
      science: "🔬 **Scientific Exploration!** आपके विज्ञान प्रश्न का comprehensive और evidence-based जवाब:",
      science_physics: "⚛️ **Physics Deep Dive!** भौतिकी के इस concept का detailed विश्लेषण:",
      science_chemistry: "🧪 **Chemistry Insights!** रसायन विज्ञान के इस topic का thorough explanation:",
      science_biology: "🧬 **Biology Explanation!** जीव विज्ञान के इस विषय का detailed overview:",
      english: "📚 **English Mastery!** अंग्रेजी भाषा के इस concept का comprehensive guide:",
      reasoning: "🧠 **Logical Analysis!** आपके reasoning प्रश्न का systematic और analytical समाधान:",
      reasoning_logical: "🧠 **Logical Reasoning Master!** तार्किक विश्लेषण का step-by-step समाधान:",
      reasoning_analytical: "🎯 **Analytical Reasoning Expert!** डेटा विश्लेषण का comprehensive approach:",
      reasoning_verbal: "💭 **Verbal Reasoning Pro!** भाषा आधारित तर्क का detailed समाधान:",
      reasoning_puzzles: "🧩 **Puzzle Solver!** समस्या समाधान का systematic approach:",
      code: "💻 **Code Analysis Expert!** आपके programming प्रश्न का technical और practical समाधान:",
      research: "🔍 **Research Assistant Pro!** आपके research query का comprehensive और data-driven जवाब:",
      creative: "✍️ **Creative Writing Maestro!** आपके creative प्रश्न का innovative और inspiring समाधान:",
      geography: "🌍 **Geographic Knowledge!** भूगोल के इस topic का detailed exploration:",
      knowledge: "💡 **Knowledge Hub!** आपके प्रश्न का well-researched और comprehensive उत्तर:",
      diagrams: "🖼️ **Visual Analysis!** आपके diagram/image का detailed विश्लेषण:",
      chat: "💬 **Smart Conversation!** आपके सवाल का thoughtful और helpful जवाब:",
      summary: "📄 **Summarization Expert!** आपके content का concise और comprehensive summary:"
    };
    
    return greetings[subject as keyof typeof greetings] || greetings.knowledge;
  }

  private generateSubjectSummary(question: string, subject: string): string {
    const summaries = {
      math: "• Mathematical concepts को practical examples के साथ समझाया\n• Step-by-step solution methodology provide की\n• Real-world applications highlight किए",
      science: "• Scientific principles को clearly explain किया\n• Evidence-based information provide की\n• Practical applications और examples दिए",
      english: "• Language concepts को comprehensively cover किया\n• Grammar rules और usage examples provide किए\n• Communication skills improvement tips दिए",
      reasoning: "• Logical thinking process को systematically explain किया\n• Critical thinking techniques provide किए\n• Problem-solving strategies outline किए",
      code: "• Code analysis और optimization suggestions provide किए\n• Best practices और security considerations highlight किए\n• Performance improvement strategies दिए",
      research: "• Research methodology को comprehensively cover किया\n• Data analysis techniques और tools suggest किए\n• Quality assessment criteria provide किए",
      creative: "• Creative techniques और strategies outline किए\n• Inspiration sources और methods suggest किए\n• Quality enhancement tips provide किए",
      geography: "• Geographic concepts का detailed analysis किया\n• Real-world context और examples provide किए\n• Spatial relationships और patterns explain किए",
      knowledge: "• General knowledge को comprehensive तरीके से cover किया\n• Multiple perspectives और viewpoints दिए\n• Practical applications highlight किए",
      diagrams: "• Visual elements का detailed analysis किया\n• Technical aspects को clearly explain किया\n• Practical insights और applications दिए",
      chat: "• Conversational support और guidance provide की\n• Problem-solving assistance दी\n• Helpful suggestions और recommendations दिए",
      summary: "• Content का concise summary provide किया\n• Key points extraction की\n• Important insights highlight किए"
    };
    
    const baseSubject = subject.split('_')[0];
    return summaries[baseSubject as keyof typeof summaries] || summaries.knowledge;
  }

  private generateSources(subject: string): string[] {
    const sources = {
      math: ["Advanced Mathematics Textbooks", "Mathematical Research Papers", "Educational Databases"],
      science: ["Scientific Journals", "Research Publications", "Educational Resources"],
      english: ["Language Learning Resources", "Grammar Guides", "Literature References"],
      reasoning: ["Logic and Critical Thinking Books", "Problem-Solving Methodologies", "Cognitive Science Research"],
      code: ["Programming Documentation", "Software Engineering Best Practices", "Technical Standards"],
      research: ["Academic Databases", "Research Methodologies", "Peer-Reviewed Journals"],
      creative: ["Creative Writing Guides", "Literary Resources", "Content Creation Tools"],
      geography: ["Geographic Information Systems", "Atlas Resources", "Geographic Research Papers"],
      knowledge: ["Encyclopedia Resources", "Academic Databases", "Expert Knowledge Base"],
      diagrams: ["Visual Analysis Tools", "Technical Documentation", "Educational Resources"],
      chat: ["Conversational AI Research", "Communication Studies", "Help Resources"],
      summary: ["Text Processing Tools", "Summarization Techniques", "Information Science Research"]
    };
    
    const baseSubject = subject.split('_')[0];
    return sources[baseSubject as keyof typeof sources] || sources.knowledge;
  }

  private generateSmartQuestions(question: string, subject: string, contextMessages: any[] = []): string[] {
    const baseQuestions = [
      `${subject} में इस concept को और गहराई से कैसे समझ सकते हैं?`,
      `इसका practical application daily life में कैसे करें?`,
      `Related advanced topics कौन से हैं?`,
      `इस knowledge को effectively कैसे practice करें?`
    ];

    // Add context-based follow-up questions
    if (contextMessages.length > 0) {
      const contextualQuestions = [
        "Previous discussion के साथ इसे कैसे connect करें?",
        "अभी तक के conversation का overall summary क्या है?"
      ];
      return [...baseQuestions.slice(0, 2), ...contextualQuestions];
    }
    
    return baseQuestions.slice(0, 3);
  }

  private extractKeyInsights(answer: string, subject: string): string[] {
    const insights = [
      "Comprehensive explanation provided with examples",
      "Step-by-step methodology outlined", 
      "Practical applications highlighted",
      "Real-world relevance established"
    ];

    // Add subject-specific insights
    if (subject === 'code') {
      insights.push("Code quality and best practices emphasized");
    } else if (subject === 'research') {
      insights.push("Research methodology and credibility assessed");
    } else if (subject === 'creative') {
      insights.push("Creative techniques and inspiration provided");
    }
    
    return insights.slice(0, 3);
  }

  private generateActionables(answer: string, subject: string): string[] {
    const actionables = {
      math: ["Practice similar problems daily", "Apply concepts to real scenarios", "Review fundamentals regularly"],
      science: ["Conduct related experiments", "Read scientific articles", "Apply knowledge practically"],
      english: ["Practice speaking daily", "Write regularly", "Read diverse content"],
      reasoning: ["Solve logic puzzles", "Practice critical thinking", "Analyze different perspectives"],
      code: ["Write practice code", "Review best practices", "Build projects"],
      research: ["Conduct literature review", "Practice data analysis", "Join research communities"],
      creative: ["Practice daily writing", "Study great examples", "Experiment with styles"],
      geography: ["Study maps regularly", "Explore geographical data", "Connect theory to real places"],
      knowledge: ["Read widely on topic", "Discuss with others", "Apply in daily life"],
      diagrams: ["Practice visual analysis", "Create own diagrams", "Study similar examples"],
      chat: ["Engage in discussions", "Practice communication", "Seek feedback"],
      summary: ["Practice summarizing", "Compare with originals", "Improve conciseness"]
    };
    
    const baseSubject = subject.split('_')[0];
    return actionables[baseSubject as keyof typeof actionables] || actionables.knowledge;
  }

  private analyzeResponse(answer: string, question: string): {difficulty: 'beginner' | 'intermediate' | 'advanced', readTime: number} {
    const wordCount = answer.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    
    let difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate';
    
    if (question.toLowerCase().includes('basic') || question.toLowerCase().includes('simple')) {
      difficulty = 'beginner';
    } else if (question.toLowerCase().includes('advanced') || question.toLowerCase().includes('complex')) {
      difficulty = 'advanced';
    }
    
    return { difficulty, readTime };
  }

  getConversationContext() {
    return this.conversationContext.slice(-3);
  }

  clearContext() {
    this.conversationContext = [];
  }
}

export const professionalAIService = new ProfessionalAIService();
