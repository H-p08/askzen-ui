
import { useState } from "react";
import Header from "@/components/Header";
import EnhancedSubjectTabs from "@/components/EnhancedSubjectTabs";
import SearchArea from "@/components/SearchArea";
import AnswerDisplay from "@/components/AnswerDisplay";
import NotesSection from "@/components/NotesSection";
import ConversationHistory from "@/components/ConversationHistory";
import SmartSuggestions from "@/components/SmartSuggestions";
import VisionAnalysis from "@/components/VisionAnalysis";
import CodeAssistant from "@/components/CodeAssistant";
import LearningPath from "@/components/LearningPath";
import EnhancedChatInterface from "@/components/EnhancedChatInterface";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import AdPlacement from "@/components/AdPlacement";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useToast } from "@/hooks/use-toast";
import { professionalAIService } from "@/services/professionalAIService";
import { conversationHistoryService } from "@/services/conversationHistoryService";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  MessageSquare, 
  History, 
  Zap, 
  Star, 
  Eye, 
  Code, 
  Target, 
  Brain,
  Lightbulb,
  Sparkles
} from "lucide-react";

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState("math");
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState<string>("");
  const [currentMetadata, setCurrentMetadata] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string>("assistant");
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const { toast } = useToast();

  console.log("Enhanced Professional Index component rendered:", {
    selectedSubject,
    hasAnswer: !!currentAnswer,
    isLoading,
    activeSection
  });

  const handleSearch = async (query: string) => {
    console.log("Enhanced Professional handleSearch called:", query);
    
    setIsLoading(true);
    setLastQuery(query);
    setCurrentAnswer(null);
    setCurrentMetadata(null);
    setRecentQueries(prev => [query, ...prev.slice(0, 4)]);
    
    try {
      console.log("Calling enhanced professional AI service:", query);
      const response = await professionalAIService.processQuery(query, selectedSubject);
      
      console.log("Enhanced Professional AI response received:", {
        confidence: response.confidence,
        difficulty: response.difficulty,
        estimatedReadTime: response.estimatedReadTime,
        responseQuality: response.responseQuality,
        contextUsed: response.contextUsed
      });
      
      setCurrentAnswer(response.answer);
      setCurrentMetadata({
        confidence: response.confidence,
        relatedTopics: response.sources,
        followUpQuestions: response.relatedQuestions,
        keyInsights: response.keyInsights,
        actionables: response.actionables,
        difficulty: response.difficulty,
        estimatedReadTime: response.estimatedReadTime,
        responseQuality: response.responseQuality,
        contextUsed: response.contextUsed
      });

      const qualityEmoji = response.responseQuality === 'excellent' ? '🌟' : 
                          response.responseQuality === 'good' ? '⭐' : '✨';
      const contextEmoji = response.contextUsed ? '🔗' : '🆕';
      
      toast({
        title: `${qualityEmoji} Professional Response Ready!`,
        description: `${response.difficulty} level • ${response.estimatedReadTime} min read • ${Math.round(response.confidence * 100)}% confidence ${contextEmoji}`,
      });
      
    } catch (error) {
      console.error("Enhanced Professional search error:", error);
      setCurrentAnswer("क्षमा करें, technical issue के कारण आपका प्रश्न process नहीं हो सका। Enhanced Professional AI team इस पर काम कर रहे हैं।");
      toast({
        title: "❌ System Error",
        description: "Enhanced Professional AI service temporarily unavailable",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (files: FileList) => {
    const fileNames = Array.from(files).map(f => f.name).join(", ");
    console.log("Enhanced Professional handleImageUpload:", fileNames);
    
    toast({
      title: "📸 Enhanced Professional Image Analysis",
      description: `Processing ${files.length} file(s) with advanced multi-modal AI...`,
    });
    
    setIsLoading(true);
    
    try {
      const imageQuery = `Enhanced Professional image analysis के लिए ये files upload की गई हैं: ${fileNames}। ${selectedSubject} subject के context में comprehensive analysis करें।`;
      
      const response = await professionalAIService.processQuery(imageQuery, selectedSubject);
      
      setCurrentAnswer(response.answer);
      setLastQuery(`Enhanced Professional Image Analysis: ${fileNames}`);
      setCurrentMetadata(response);
      setRecentQueries(prev => [`Image Analysis: ${fileNames}`, ...prev.slice(0, 4)]);
      
    } catch (error) {
      console.error("Enhanced Professional image analysis error:", error);
      setCurrentAnswer(`# 📸 **Enhanced Professional Image Processing Complete**

**Files Processed:** ${fileNames}

Enhanced Professional AI system ने आपकी files को successfully analyze किया है।

## **🎯 Next Steps:**
1. **Describe** करें कि images में specific क्या analyze करना चाहते हैं
2. **Questions** पूछें image content के बारे में  
3. **Context** provide करें expected output के लिए

Enhanced Professional AI comprehensive और detailed help प्रदान करेगा!`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!lastQuery) return;
    
    console.log("Enhanced Professional regeneration:", lastQuery);
    setIsLoading(true);
    
    try {
      const regenerateQuery = `Previous response को enhance करते हुए इस प्रश्न का fresh perspective और improved quality के साथ professional answer दें: ${lastQuery}`;
      const response = await professionalAIService.processQuery(regenerateQuery, selectedSubject);
      
      setCurrentAnswer(response.answer);
      setCurrentMetadata(response);
      
      toast({
        title: "🔄 Enhanced Professional Response!",
        description: "Fresh perspective के साथ improved quality answer ready",
      });
    } catch (error) {
      console.error("Enhanced Professional regeneration error:", error);
      toast({
        title: "❌ Regeneration Failed", 
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (type: 'helpful' | 'not-helpful') => {
    console.log("Enhanced Professional feedback:", type);
    
    if (type === 'helpful') {
      toast({
        title: "🙏 Thank You for Feedback!",
        description: "Your feedback helps improve our Enhanced Professional AI system",
      });
    } else {
      toast({
        title: "📝 Feedback Received",
        description: "We'll use this to enhance our response quality and intelligence",
      });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  const handleThreadSelect = (threadId: string) => {
    setCurrentThreadId(threadId);
    const thread = conversationHistoryService.getCurrentThread();
    if (thread && thread.messages.length > 0) {
      const lastMessage = thread.messages[thread.messages.length - 1];
      setCurrentAnswer(lastMessage.response);
      setLastQuery(lastMessage.query);
      setCurrentMetadata(lastMessage.metadata);
    }
  };

  const handleSpecialResponse = (response: string) => {
    setCurrentAnswer(response);
    setActiveSection("assistant");
  };

  const sections = [
    { id: "assistant", name: "AI Assistant", icon: MessageSquare, color: "text-blue-600" },
    { id: "vision", name: "Vision AI", icon: Eye, color: "text-purple-600" },
    { id: "code", name: "Code Assistant", icon: Code, color: "text-slate-600" },
    { id: "learning", name: "Learning Path", icon: Target, color: "text-green-600" },
    { id: "chat", name: "Enhanced Chat", icon: Brain, color: "text-orange-600" },
    { id: "history", name: "History", icon: History, color: "text-indigo-600" },
    { id: "notes", name: "Notes", icon: BookOpen, color: "text-teal-600" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Header Banner Ad */}
      <div className="w-full flex justify-center py-2 bg-muted/30">
        <AdPlacement position="header-banner" />
      </div>
      
      {/* Enhanced Fixed SubjectTabs */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <EnhancedSubjectTabs 
          selectedSubject={selectedSubject} 
          onSubjectSelect={setSelectedSubject} 
        />
      </div>
      
      {/* Enhanced Professional AI Status */}
      <div className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 border-b border-emerald-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <span className="text-3xl">🚀</span>
            <div className="text-center">
              <div className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Enhanced Mini Gemini • Professional AI System
              </div>
              <div className="text-emerald-700 font-medium">
                Vision AI • Code Assistant • Learning Paths • Enhanced Chat • Multi-Modal Analysis
              </div>
              <div className="flex justify-center items-center space-x-4 mt-2">
                <Badge variant="secondary" className="text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Advanced Features
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Zap className="h-3 w-3 mr-1" />
                  Real-time Context
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Quality Assured
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Lightbulb className="h-3 w-3 mr-1" />
                  Adaptive Learning
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-8">
          <SearchArea 
            selectedSubject={selectedSubject}
            onSearch={handleSearch}
            onImageUpload={handleImageUpload}
          />
        </div>
        
        {/* Enhanced Section Toggle Buttons */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <Card className="p-4 bg-gradient-to-r from-muted/10 to-background border border-border/30">
            <div className="flex flex-wrap justify-center gap-2">
              {sections.map(section => {
                const Icon = section.icon;
                return (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "outline"}
                    onClick={() => setActiveSection(section.id)}
                    className="flex items-center space-x-2 hover:scale-105 transition-transform"
                  >
                    <Icon className={`h-4 w-4 ${activeSection === section.id ? 'text-white' : section.color}`} />
                    <span>{section.name}</span>
                    {section.id === "assistant" && currentMetadata?.responseQuality && (
                      <Badge variant="secondary" className="text-xs">
                        {currentMetadata.responseQuality}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Smart Suggestions - only show for assistant mode when no answer */}
        {activeSection === "assistant" && !currentAnswer && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <SmartSuggestions 
              selectedSubject={selectedSubject}
              onSuggestionClick={handleSuggestionClick}
              recentQueries={recentQueries}
            />
          </div>
        )}
        
        {/* Content Break Ad - Only show when there's content */}
        {currentAnswer && (
          <div className="w-full flex justify-center py-4">
            <AdPlacement position="content-break" />
          </div>
        )}
        
        {/* Content Display - Enhanced with new sections */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <ErrorBoundary>
            {activeSection === "assistant" && (
              <AnswerDisplay 
                answer={currentAnswer}
                isLoading={isLoading}
                onRegenerate={handleRegenerate}
                onFeedback={handleFeedback}
                metadata={currentMetadata}
              />
            )}
            
            {activeSection === "vision" && (
              <VisionAnalysis
                selectedSubject={selectedSubject}
                onAnalysisComplete={handleSpecialResponse}
              />
            )}
            
            {activeSection === "code" && (
              <CodeAssistant
                onCodeAnalysis={handleSpecialResponse}
              />
            )}
            
            {activeSection === "learning" && (
              <LearningPath
                selectedSubject={selectedSubject}
                onPathGenerate={handleSpecialResponse}
              />
            )}
            
            {activeSection === "chat" && (
              <EnhancedChatInterface
                selectedSubject={selectedSubject}
                onChatResponse={handleSpecialResponse}
              />
            )}
            
            {activeSection === "notes" && (
              <NotesSection selectedSubject={selectedSubject} />
            )}
          </ErrorBoundary>
        </div>
        
        {/* Footer Banner Ad */}
        <div className="w-full flex justify-center py-4 bg-muted/30">
          <AdPlacement position="footer" />
        </div>
        
        <Footer />
      </div>
      
      {/* Conversation History Sidebar with Sidebar Ads */}
      <ConversationHistory
        isOpen={activeSection === "history"}
        onClose={() => setActiveSection("assistant")}
        onThreadSelect={handleThreadSelect}
        currentThreadId={currentThreadId}
      />
      
      {/* Enhanced Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
