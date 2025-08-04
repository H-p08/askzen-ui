
interface ConversationMessage {
  id: string;
  query: string;
  response: string;
  subject: string;
  timestamp: Date;
  metadata: {
    confidence: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    readTime: number;
    sources: string[];
    keyInsights: string[];
  };
}

interface ConversationThread {
  id: string;
  title: string;
  subject: string;
  messages: ConversationMessage[];
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

class ConversationHistoryService {
  private threads: ConversationThread[] = [];
  private currentThreadId: string | null = null;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('askzen_conversations');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.threads = parsed.threads?.map((thread: any) => ({
          ...thread,
          createdAt: new Date(thread.createdAt),
          updatedAt: new Date(thread.updatedAt),
          messages: thread.messages?.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })) || []
        })) || [];
        this.currentThreadId = parsed.currentThreadId;
      }
    } catch (error) {
      console.error('Error loading conversation history:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('askzen_conversations', JSON.stringify({
        threads: this.threads,
        currentThreadId: this.currentThreadId
      }));
    } catch (error) {
      console.error('Error saving conversation history:', error);
    }
  }

  createNewThread(subject: string, title?: string): string {
    const threadId = Date.now().toString();
    const thread: ConversationThread = {
      id: threadId,
      title: title || `New ${subject} conversation`,
      subject,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [subject]
    };

    this.threads.unshift(thread);
    this.currentThreadId = threadId;
    this.saveToStorage();
    return threadId;
  }

  addMessage(query: string, response: string, subject: string, metadata: any): void {
    if (!this.currentThreadId) {
      this.createNewThread(subject, query.substring(0, 50) + '...');
    }

    const thread = this.threads.find(t => t.id === this.currentThreadId);
    if (!thread) return;

    const message: ConversationMessage = {
      id: Date.now().toString(),
      query,
      response,
      subject,
      timestamp: new Date(),
      metadata: {
        confidence: metadata.confidence || 0.8,
        difficulty: metadata.difficulty || 'intermediate',
        readTime: metadata.estimatedReadTime || 3,
        sources: metadata.relatedTopics || [],
        keyInsights: metadata.keyInsights || []
      }
    };

    thread.messages.push(message);
    thread.updatedAt = new Date();
    
    // Auto-generate better title from first message
    if (thread.messages.length === 1 && thread.title.startsWith('New')) {
      thread.title = this.generateThreadTitle(query, subject);
    }

    this.saveToStorage();
  }

  private generateThreadTitle(query: string, subject: string): string {
    const maxLength = 60;
    let title = query.length > maxLength ? query.substring(0, maxLength) + '...' : query;
    return `${subject}: ${title}`;
  }

  getCurrentThread(): ConversationThread | null {
    return this.threads.find(t => t.id === this.currentThreadId) || null;
  }

  getThreads(): ConversationThread[] {
    return this.threads.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  switchToThread(threadId: string): void {
    this.currentThreadId = threadId;
    this.saveToStorage();
  }

  deleteThread(threadId: string): void {
    this.threads = this.threads.filter(t => t.id !== threadId);
    if (this.currentThreadId === threadId) {
      this.currentThreadId = this.threads[0]?.id || null;
    }
    this.saveToStorage();
  }

  searchConversations(query: string): ConversationMessage[] {
    const results: ConversationMessage[] = [];
    const searchLower = query.toLowerCase();
    
    this.threads.forEach(thread => {
      thread.messages.forEach(message => {
        if (
          message.query.toLowerCase().includes(searchLower) ||
          message.response.toLowerCase().includes(searchLower)
        ) {
          results.push(message);
        }
      });
    });

    return results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  exportThreads(): string {
    return JSON.stringify(this.threads, null, 2);
  }

  importThreads(data: string): boolean {
    try {
      const imported = JSON.parse(data);
      if (Array.isArray(imported)) {
        this.threads = imported.map(thread => ({
          ...thread,
          createdAt: new Date(thread.createdAt),
          updatedAt: new Date(thread.updatedAt),
          messages: thread.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        this.saveToStorage();
        return true;
      }
    } catch (error) {
      console.error('Import failed:', error);
    }
    return false;
  }

  getConversationContext(maxMessages: number = 5): ConversationMessage[] {
    const currentThread = this.getCurrentThread();
    if (!currentThread) return [];
    
    return currentThread.messages.slice(-maxMessages);
  }

  clearAllThreads(): void {
    this.threads = [];
    this.currentThreadId = null;
    this.saveToStorage();
  }
}

export const conversationHistoryService = new ConversationHistoryService();
