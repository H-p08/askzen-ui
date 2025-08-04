
import { useState } from "react";
import Header from "@/components/Header";
import SubjectTabs from "@/components/SubjectTabs";
import SearchArea from "@/components/SearchArea";
import AnswerDisplay from "@/components/AnswerDisplay";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { aiService } from "@/services/aiService";

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState("math");
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState<string>("");
  const { toast } = useToast();

  console.log("Index component rendered with:", {
    selectedSubject,
    currentAnswer: currentAnswer ? `${currentAnswer.substring(0, 50)}...` : null,
    isLoading
  });

  const handleSearch = async (query: string) => {
    console.log("handleSearch called with query:", query);
    
    setIsLoading(true);
    setLastQuery(query);
    setCurrentAnswer(null); // Clear previous answer
    
    try {
      console.log("Calling offline AI service for question:", query);
      const response = await aiService.answerQuestion(query, selectedSubject);
      
      console.log("AI response received:", {
        hasAnswer: !!response.answer,
        hasError: !!response.error,
        answerLength: response.answer?.length || 0
      });
      
      setCurrentAnswer(response.answer);
      
      if (!response.error) {
        toast({
          title: "उत्तर तैयार!",
          description: "आपका intelligent उत्तर तैयार है।",
        });
      } else {
        console.log("Response has error:", response.error);
        toast({
          title: "Error",
          description: "कुछ technical issue हुआ है। कृपया दोबारा कोशिश करें।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      setCurrentAnswer("क्षमा करें, आपके प्रश्न को process करते समय error आया। कृपया दोबारा कोशिश करें।");
      toast({
        title: "Error",
        description: "Response generate करने में failed। कृपया दोबारा try करें।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (files: FileList) => {
    const fileNames = Array.from(files).map(f => f.name).join(", ");
    console.log("handleImageUpload called with files:", fileNames);
    
    toast({
      title: "Images uploaded!",
      description: `Processing: ${fileNames}`,
    });
    
    setIsLoading(true);
    
    try {
      // Image analysis with offline AI
      const imageAnalysisQuery = `I have uploaded image files: ${fileNames}. Please provide guidance on what academic help I can get for image-based questions in ${selectedSubject}.`;
      
      const response = await aiService.answerQuestion(imageAnalysisQuery, selectedSubject);
      
      console.log("Image analysis response:", response);
      setCurrentAnswer(`**Uploaded Files:** ${fileNames}\n\n${response.answer}\n\n**Note:** पूरी image analysis के लिए, कृपया image में दिखाई गई content को text में describe करें, तो मैं detailed help दे सकूंगा।`);
      setLastQuery(`Image analysis: ${fileNames}`);
      
    } catch (error) {
      console.error("Image upload error:", error);
      setCurrentAnswer(`**Uploaded Files:** ${fileNames}\n\nमैं आपकी uploaded files देख सकता हूं। कृपया image में जो content है उसे describe करें या specific questions पूछें, तो मैं detailed help दूंगा।\n\n**उदाहरण:** "इस math problem को solve करें" या "इस diagram को explain करें"`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    console.log("handleRegenerate called with lastQuery:", lastQuery);
    if (lastQuery) {
      setIsLoading(true);
      
      try {
        const regenerationPrompt = `कृपया इस प्रश्न का एक alternative explanation या different approach प्रदान करें: ${lastQuery}`;
        const response = await aiService.answerQuestion(regenerationPrompt, selectedSubject);
        
        console.log("Regenerated response received");
        setCurrentAnswer(response.answer);
        
        toast({
          title: "नया उत्तर तैयार!",
          description: "यहाँ आपके प्रश्न पर एक नया perspective है।",
        });
      } catch (error) {
        console.error("Regeneration error:", error);
        toast({
          title: "Error", 
          description: "Answer regenerate करने में failed। कृपया दोबारा try करें।",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFeedback = (type: 'helpful' | 'not-helpful') => {
    console.log("handleFeedback called with type:", type);
    toast({
      title: type === 'helpful' ? "धन्यवाद!" : "Feedback मिला",
      description: type === 'helpful' 
        ? "हमें खुशी है कि उत्तर helpful था!" 
        : "हम आपके feedback का use करके responses improve करेंगे।",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <SubjectTabs 
        selectedSubject={selectedSubject} 
        onSubjectSelect={setSelectedSubject} 
      />
      
      {/* Welcome message for no API key needed */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center space-x-2 text-sm text-green-600 bg-green-50 rounded-lg p-3">
          <span className="text-lg">🤖</span>
          <span>Offline AI Ready - कोई API key की जरूरत नहीं! किसी भी विषय पर प्रश्न पूछें।</span>
        </div>
      </div>
      
      <SearchArea 
        selectedSubject={selectedSubject}
        onSearch={handleSearch}
        onImageUpload={handleImageUpload}
      />
      
      <AnswerDisplay 
        answer={currentAnswer}
        isLoading={isLoading}
        onRegenerate={handleRegenerate}
        onFeedback={handleFeedback}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
