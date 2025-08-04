import { enhancedAIService } from './enhancedAIService';
import { definitionService } from './definitionService';

interface ProfessionalAIResponse {
  answer: string;
  confidence: number;
  sources: string[];
  relatedQuestions: string[];
  keyInsights: string[];
  actionables?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number;
}

export class ProfessionalAIService {
  private conversationContext: Array<{question: string; answer: string; timestamp: Date}> = [];

  async processQuery(question: string, subject: string = 'general'): Promise<ProfessionalAIResponse> {
    console.log("Professional AI processing:", question, subject);
    
    // Get enhanced response based on subject
    const enhancedResponse = await this.getSubjectSpecificResponse(question, subject);
    
    // Professional formatting and analysis
    const professionalAnswer = this.formatProfessionalResponse(
      enhancedResponse.answer, 
      question, 
      subject,
      enhancedResponse
    );
    
    const analysis = this.analyzeResponse(professionalAnswer, question);
    
    // Store context
    this.conversationContext.push({
      question,
      answer: professionalAnswer,
      timestamp: new Date()
    });

    return {
      answer: professionalAnswer,
      confidence: enhancedResponse.confidence,
      sources: this.generateSources(subject),
      relatedQuestions: this.generateSmartQuestions(question, subject),
      keyInsights: this.extractKeyInsights(professionalAnswer, subject),
      actionables: this.generateActionables(professionalAnswer, subject),
      difficulty: analysis.difficulty,
      estimatedReadTime: analysis.readTime
    };
  }

  private async getSubjectSpecificResponse(question: string, subject: string): Promise<any> {
    // Handle different subject types
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

  private formatProfessionalResponse(
    rawAnswer: string, 
    question: string, 
    subject: string, 
    metadata: any
  ): string {
    const timestamp = new Date().toLocaleString('hi-IN');
    
    let formattedResponse = `# 🎯 **Professional AI Response**\n\n`;
    
    // Add context-aware greeting
    const greeting = this.getContextualGreeting(question, subject);
    formattedResponse += `${greeting}\n\n`;
    
    // Main content with better formatting
    formattedResponse += this.enhanceContentFormatting(rawAnswer);
    
    // Add subject-specific insights
    if (metadata.definitions && metadata.definitions.length > 0) {
      formattedResponse += `\n\n## 🔍 **Key Terms & Definitions**\n\n`;
      metadata.definitions.forEach((def: any, index: number) => {
        formattedResponse += `**${index + 1}. ${def.term}:** ${def.meaning}\n\n`;
      });
    }
    
    // Add subject-specific summary
    const summary = this.generateSubjectSummary(question, subject);
    formattedResponse += `\n\n## 📋 **Quick Summary**\n${summary}\n\n`;
    
    // Professional footer with better styling
    formattedResponse += `---\n\n`;
    formattedResponse += `**💡 Pro Tip:** यह comprehensive response है जो multiple perspectives cover करता है।\n\n`;
    formattedResponse += `**🎓 Next Steps:** Related questions explore करके अपनी learning continue करें।\n\n`;
    formattedResponse += `*Professional AI Assistant • Quality-focused • Continuously Learning*\n`;
    formattedResponse += `📅 ${timestamp}`;
    
    return formattedResponse;
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
      geography: "🌍 **Geographic Knowledge!** भूगोल के इस topic का detailed exploration:",
      knowledge: "💡 **Knowledge Hub!** आपके प्रश्न का well-researched और comprehensive उत्तर:",
      diagrams: "🖼️ **Visual Analysis!** आपके diagram/image का detailed विश्लेषण:"
    };
    
    return greetings[subject as keyof typeof greetings] || greetings.knowledge;
  }

  private generateSubjectSummary(question: string, subject: string): string {
    const summaries = {
      math: "• Mathematical concepts को practical examples के साथ समझाया\n• Step-by-step solution methodology provide की\n• Real-world applications highlight किए",
      science: "• Scientific principles को clearly explain किया\n• Evidence-based information provide की\n• Practical applications और examples दिए",
      english: "• Language concepts को comprehensively cover किया\n• Grammar rules और usage examples provide किए\n• Communication skills improvement tips दिए",
      reasoning: "• Logical thinking process को systematically explain किया\n• Critical thinking techniques provide किए\n• Problem-solving strategies outline किए",
      geography: "• Geographic concepts का detailed analysis किया\n• Real-world context और examples provide किए\n• Spatial relationships और patterns explain किए",
      knowledge: "• General knowledge को comprehensive तरीके से cover किया\n• Multiple perspectives और viewpoints दिए\n• Practical applications highlight किए",
      diagrams: "• Visual elements का detailed analysis किया\n• Technical aspects को clearly explain किया\n• Practical insights और applications दिए"
    };
    
    // Handle sub-subjects
    const baseSubject = subject.split('_')[0];
    return summaries[baseSubject as keyof typeof summaries] || summaries.knowledge;
  }

  private generateSources(subject: string): string[] {
    const sources = {
      math: ["Advanced Mathematics Textbooks", "Mathematical Research Papers", "Educational Databases"],
      science: ["Scientific Journals", "Research Publications", "Educational Resources"],
      english: ["Language Learning Resources", "Grammar Guides", "Literature References"],
      reasoning: ["Logic and Critical Thinking Books", "Problem-Solving Methodologies", "Cognitive Science Research"],
      geography: ["Geographic Information Systems", "Atlas Resources", "Geographic Research Papers"],
      knowledge: ["Encyclopedia Resources", "Academic Databases", "Expert Knowledge Base"],
      diagrams: ["Visual Analysis Tools", "Technical Documentation", "Educational Resources"]
    };
    
    const baseSubject = subject.split('_')[0];
    return sources[baseSubject as keyof typeof sources] || sources.knowledge;
  }

  private generateSmartQuestions(question: string, subject: string): string[] {
    const baseQuestions = [
      `${subject} में इस concept को और गहराई से कैसे समझ सकते हैं?`,
      `इसका practical application daily life में कैसे करें?`,
      `Related advanced topics कौन से हैं?`,
      `इस knowledge को effectively कैसे practice करें?`
    ];
    
    return baseQuestions.slice(0, 3);
  }

  private extractKeyInsights(answer: string, subject: string): string[] {
    const insights = [
      "Comprehensive explanation provided with examples",
      "Step-by-step methodology outlined",
      "Practical applications highlighted",
      "Real-world relevance established"
    ];
    
    return insights.slice(0, 3);
  }

  private generateActionables(answer: string, subject: string): string[] {
    const actionables = {
      math: ["Practice similar problems daily", "Apply concepts to real scenarios", "Review fundamentals regularly"],
      science: ["Conduct related experiments", "Read scientific articles", "Apply knowledge practically"],
      english: ["Practice speaking daily", "Write regularly", "Read diverse content"],
      reasoning: ["Solve logic puzzles", "Practice critical thinking", "Analyze different perspectives"],
      geography: ["Study maps regularly", "Explore geographical data", "Connect theory to real places"],
      knowledge: ["Read widely on topic", "Discuss with others", "Apply in daily life"],
      diagrams: ["Practice visual analysis", "Create own diagrams", "Study similar examples"]
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
