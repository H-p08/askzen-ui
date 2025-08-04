import { useState } from "react";
import Header from "@/components/Header";
import SubjectTabs from "@/components/SubjectTabs";
import SearchArea from "@/components/SearchArea";
import AnswerDisplay from "@/components/AnswerDisplay";
import NotesSection from "@/components/NotesSection";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { enhancedAIService } from "@/services/enhancedAIService";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageSquare, ArrowUp } from "lucide-react";

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState("math");
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState<string>("");
  const [currentMetadata, setCurrentMetadata] = useState<any>(null);
  const [showNotes, setShowNotes] = useState(false);
  const { toast } = useToast();

  console.log("Enhanced Index component rendered with:", {
    selectedSubject,
    currentAnswer: currentAnswer ? `${currentAnswer.substring(0, 50)}...` : null,
    isLoading
  });

  const handleSearch = async (query: string) => {
    console.log("handleSearch called with enhanced AI:", query);
    
    setIsLoading(true);
    setLastQuery(query);
    setCurrentAnswer(null);
    setCurrentMetadata(null);
    
    try {
      console.log("Calling enhanced AI service for question:", query);
      const response = await enhancedAIService.answerQuestion(query, selectedSubject);
      
      console.log("Enhanced AI response received:", {
        hasAnswer: !!response.answer,
        confidence: response.confidence,
        relatedTopics: response.relatedTopics,
        followUpQuestions: response.followUpQuestions?.length || 0
      });
      
      setCurrentAnswer(response.answer);
      setCurrentMetadata({
        confidence: response.confidence,
        relatedTopics: response.relatedTopics,
        followUpQuestions: response.followUpQuestions,
        definitions: response.definitions,
        mainConcepts: response.mainConcepts
      });
      
      if (!response.error) {
        toast({
          title: "🎉 बेहतरीन उत्तर तैयार!",
          description: `${Math.round(response.confidence * 100)}% confidence के साथ comprehensive answer with definitions।`,
        });
      } else {
        console.log("Response has error:", response.error);
        toast({
          title: "⚠️ Technical Issue",
          description: "कुछ समस्या हुई है। कृपया दोबारा प्रयास करें।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Enhanced search error:", error);
      setCurrentAnswer("क्षमा करें, technical issue के कारण आपका प्रश्न process नहीं हो सका। कृपया थोड़ी देर बाद दोबारा कोशिश करें।");
      toast({
        title: "❌ Error Occurred",
        description: "Enhanced AI service में temporary issue है।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (files: FileList) => {
    const fileNames = Array.from(files).map(f => f.name).join(", ");
    console.log("Enhanced handleImageUpload called:", fileNames);
    
    toast({
      title: "📸 Images Uploaded Successfully!",
      description: `Processing ${files.length} file(s) with enhanced AI...`,
    });
    
    setIsLoading(true);
    
    try {
      const imageAnalysisQuery = `मैंने ये image files upload की हैं: ${fileNames}। कृपया ${selectedSubject} subject में इन images के साथ कैसे मदद मिल सकती है, detailed guidance दें। साथ ही बताएं कि image-based questions कैसे पूछूं।`;
      
      const response = await enhancedAIService.answerQuestion(imageAnalysisQuery, selectedSubject);
      
      console.log("Enhanced image analysis response:", response);
      
      const enhancedImageResponse = `# 📸 **Image Analysis - ${selectedSubject.toUpperCase()}**

**Uploaded Files:** ${fileNames}

${response.answer}

## **💡 Image-based Learning Tips:**
• **Describe** करें कि image में क्या दिख रहा है
• **Specific questions** पूछें image content के बारे में  
• **Step-by-step** explanation चाहिए तो बताएं
• **Similar problems** solve करना चाहते हैं तो specify करें

## **🎯 Next Steps:**
Image की content को describe करें या specific questions पूछें। Enhanced AI आपको detailed help देगा!`;

      setCurrentAnswer(enhancedImageResponse);
      setLastQuery(`Enhanced Image Analysis: ${fileNames}`);
      setCurrentMetadata(response);
      
    } catch (error) {
      console.error("Enhanced image upload error:", error);
      setCurrentAnswer(`# 📸 **Files Successfully Uploaded**

**Files:** ${fileNames}

Enhanced AI system ने आपकी files successfully receive की हैं। 

## **🚀 How to Get Best Help:**
1. **Describe** करें कि images में क्या content है
2. **Specific questions** पूछें 
3. **Subject context** provide करें
4. **Expected output** बताएं

**Example:** "इस math problem को solve करें" या "इस diagram को explain करें"

Enhanced AI आपको comprehensive और detailed help प्रदान करेगा!`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    console.log("Enhanced handleRegenerate called:", lastQuery);
    if (lastQuery) {
      setIsLoading(true);
      
      try {
        const regenerationPrompt = `कृपया इस प्रश्न का एक अलग approach और more detailed explanation के साथ answer दें: ${lastQuery}. पिछले response से different perspective use करें।`;
        const response = await enhancedAIService.answerQuestion(regenerationPrompt, selectedSubject);
        
        console.log("Enhanced regenerated response received");
        setCurrentAnswer(response.answer);
        setCurrentMetadata(response);
        
        toast({
          title: "🔄 नया Enhanced Answer!",
          description: "आपके प्रश्न पर fresh perspective के साथ detailed response।",
        });
      } catch (error) {
        console.error("Enhanced regeneration error:", error);
        toast({
          title: "❌ Regeneration Failed", 
          description: "Enhanced AI service में issue है। कृपया दोबारा try करें।",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFeedback = (type: 'helpful' | 'not-helpful') => {
    console.log("Enhanced handleFeedback called:", type);
    
    if (type === 'helpful') {
      toast({
        title: "🙏 Thank You!",
        description: "आपका positive feedback Enhanced AI को improve करने में help करता है!",
      });
    } else {
      toast({
        title: "📝 Feedback Noted",
        description: "हम आपके feedback का use करके AI responses को और भी बेहतर बनाएंगे।",
      });
    }
  };

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Fixed SubjectTabs with improved scrolling */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <SubjectTabs 
          selectedSubject={selectedSubject} 
          onSubjectSelect={setSelectedSubject} 
        />
      </div>
      
      {/* Enhanced AI Status */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center space-x-3 text-sm">
            <span className="text-2xl">🚀</span>
            <div className="text-center">
              <div className="font-semibold text-green-700">Enhanced AI System Active</div>
              <div className="text-green-600">Advanced reasoning • Definitions • Notes • Multi-language support</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div id="search-area" className="py-8">
          <SearchArea 
            selectedSubject={selectedSubject}
            onSearch={handleSearch}
            onImageUpload={handleImageUpload}
          />
        </div>
        
        {/* Toggle Buttons for Notes/Answers */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <Card className="p-4 bg-muted/10 border border-border/30">
            <div className="flex justify-center space-x-4">
              <Button
                variant={showNotes ? "outline" : "default"}
                onClick={() => setShowNotes(false)}
                className="flex items-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>AI Answers</span>
              </Button>
              <Button
                variant={showNotes ? "default" : "outline"}
                onClick={() => setShowNotes(true)}
                className="flex items-center space-x-2"
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
      
      {/* Enhanced Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-secondary text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-50 animate-bounce"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Index;
