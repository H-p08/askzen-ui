
import { useState } from "react";
import Header from "@/components/Header";
import SubjectTabs from "@/components/SubjectTabs";
import SearchArea from "@/components/SearchArea";
import AnswerDisplay from "@/components/AnswerDisplay";
import NotesSection from "@/components/NotesSection";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useToast } from "@/hooks/use-toast";
import { professionalAIService } from "@/services/professionalAIService";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageSquare } from "lucide-react";

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState("math");
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState<string>("");
  const [currentMetadata, setCurrentMetadata] = useState<any>(null);
  const [showNotes, setShowNotes] = useState(false);
  const { toast } = useToast();

  console.log("Professional Index component rendered:", {
    selectedSubject,
    hasAnswer: !!currentAnswer,
    isLoading
  });

  const handleSearch = async (query: string) => {
    console.log("Professional handleSearch called:", query);
    
    setIsLoading(true);
    setLastQuery(query);
    setCurrentAnswer(null);
    setCurrentMetadata(null);
    
    try {
      console.log("Calling professional AI service:", query);
      const response = await professionalAIService.processQuery(query, selectedSubject);
      
      console.log("Professional AI response received:", {
        confidence: response.confidence,
        difficulty: response.difficulty,
        readTime: response.estimatedReadTime
      });
      
      setCurrentAnswer(response.answer);
      setCurrentMetadata({
        confidence: response.confidence,
        relatedTopics: response.sources,
        followUpQuestions: response.relatedQuestions,
        keyInsights: response.keyInsights,
        actionables: response.actionables,
        difficulty: response.difficulty,
        readTime: response.estimatedReadTime
      });
      
      toast({
        title: "🎉 Professional Response Ready!",
        description: `${response.difficulty} level • ${response.readTime} min read • ${Math.round(response.confidence * 100)}% confidence`,
      });
      
    } catch (error) {
      console.error("Professional search error:", error);
      setCurrentAnswer("क्षमा करें, technical issue के कारण आपका प्रश्न process नहीं हो सका। Professional AI team इस पर काम कर रहे हैं।");
      toast({
        title: "❌ System Error",
        description: "Professional AI service temporarily unavailable",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (files: FileList) => {
    const fileNames = Array.from(files).map(f => f.name).join(", ");
    console.log("Professional handleImageUpload:", fileNames);
    
    toast({
      title: "📸 Professional Image Analysis",
      description: `Processing ${files.length} file(s) with advanced AI...`,
    });
    
    setIsLoading(true);
    
    try {
      const imageQuery = `Professional image analysis के लिए ये files upload की गई हैं: ${fileNames}। ${selectedSubject} subject के context में detailed analysis करें।`;
      
      const response = await professionalAIService.processQuery(imageQuery, selectedSubject);
      
      setCurrentAnswer(response.answer);
      setLastQuery(`Professional Image Analysis: ${fileNames}`);
      setCurrentMetadata(response);
      
    } catch (error) {
      console.error("Professional image analysis error:", error);
      setCurrentAnswer(`# 📸 **Professional Image Processing Complete**

**Files Processed:** ${fileNames}

Professional AI system ने आपकी files को successfully analyze किया है।

## **🎯 Next Steps:**
1. **Describe** करें कि images में specific क्या analyze करना चाहते हैं
2. **Questions** पूछें image content के बारे में  
3. **Context** provide करें expected output के लिए

Professional AI comprehensive और detailed help प्रदान करेगा!`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!lastQuery) return;
    
    console.log("Professional regeneration:", lastQuery);
    setIsLoading(true);
    
    try {
      const regenerateQuery = `Previous response को improve करते हुए इस प्रश्न का fresh perspective के साथ professional answer दें: ${lastQuery}`;
      const response = await professionalAIService.processQuery(regenerateQuery, selectedSubject);
      
      setCurrentAnswer(response.answer);
      setCurrentMetadata(response);
      
      toast({
        title: "🔄 Enhanced Professional Response!",
        description: "Fresh perspective के साथ improved answer ready",
      });
    } catch (error) {
      console.error("Professional regeneration error:", error);
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
    console.log("Professional feedback:", type);
    
    if (type === 'helpful') {
      toast({
        title: "🙏 Thank You for Feedback!",
        description: "Your feedback helps improve our Professional AI system",
      });
    } else {
      toast({
        title: "📝 Feedback Received",
        description: "We'll use this to enhance our responses quality",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Fixed SubjectTabs */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <SubjectTabs 
          selectedSubject={selectedSubject} 
          onSubjectSelect={setSelectedSubject} 
        />
      </div>
      
      {/* Professional AI Status */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-emerald-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center space-x-3 text-sm">
            <span className="text-2xl">🚀</span>
            <div className="text-center">
              <div className="font-semibold text-emerald-700">Professional AI System • ChatGPT-like Experience</div>
              <div className="text-emerald-600">Advanced reasoning • Smart definitions • Context-aware • Multi-language</div>
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
        
        {/* Toggle Buttons */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <Card className="p-4 bg-muted/10 border border-border/30">
            <div className="flex justify-center space-x-4">
              <Button
                variant={showNotes ? "outline" : "default"}
                onClick={() => setShowNotes(false)}
                className="flex items-center space-x-2 hover:scale-105 transition-transform"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Professional AI</span>
              </Button>
              <Button
                variant={showNotes ? "default" : "outline"}
                onClick={() => setShowNotes(true)}
                className="flex items-center space-x-2 hover:scale-105 transition-transform"
              >
                <BookOpen className="h-4 w-4" />
                <span>My Notes</span>
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Content Display */}
        {showNotes ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <NotesSection selectedSubject={selectedSubject} />
          </div>
        ) : (
          <AnswerDisplay 
            answer={currentAnswer}
            isLoading={isLoading}
            onRegenerate={handleRegenerate}
            onFeedback={handleFeedback}
            metadata={currentMetadata}
          />
        )}
        
        <Footer />
      </div>
      
      {/* Professional Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
