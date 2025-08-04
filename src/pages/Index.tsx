
import { useState } from "react";
import Header from "@/components/Header";
import SubjectTabs from "@/components/SubjectTabs";
import SearchArea from "@/components/SearchArea";
import AnswerDisplay from "@/components/AnswerDisplay";
import ApiKeyInput from "@/components/ApiKeyInput";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { aiService } from "@/services/aiService";

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState("math");
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [lastQuery, setLastQuery] = useState<string>("");
  const { toast } = useToast();

  console.log("Index component rendered with:", {
    selectedSubject,
    currentAnswer: currentAnswer ? `${currentAnswer.substring(0, 50)}...` : null,
    isLoading,
    hasApiKey
  });

  const handleApiKeySet = (apiKey: string) => {
    console.log("Setting API key...");
    aiService.setApiKey(apiKey);
    setHasApiKey(true);
    toast({
      title: "API Key सेट हो गया!",
      description: "अब आप किसी भी प्रश्न का AI-powered उत्तर प्राप्त कर सकते हैं।",
    });
  };

  const handleSearch = async (query: string) => {
    console.log("handleSearch called with query:", query);
    console.log("Has API key:", hasApiKey);
    
    if (!hasApiKey) {
      toast({
        title: "API Key आवश्यक है",
        description: "कृपया पहले अपनी Perplexity API key डालें।",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setLastQuery(query);
    setCurrentAnswer(null); // Clear previous answer
    
    try {
      console.log("Calling AI service for question:", query);
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
          description: "आपका AI-powered उत्तर तैयार है।",
        });
      } else {
        console.log("Response has error:", response.error);
        toast({
          title: "API Key की जांच करें",
          description: "कृपया अपनी Perplexity API key की जांच करें और दोबारा कोशिश करें।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      setCurrentAnswer("क्षमा करें, आपके प्रश्न को process करते समय error आया। कृपया दोबारा कोशिश करें।");
      toast({
        title: "Error",
        description: "AI response पाने में failed। कृपया अपनी API key check करें और दोबारा try करें।",
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
      // For now, we'll analyze the image names and ask the AI about them
      const imageAnalysisQuery = `I have uploaded the following image files: ${fileNames}. Based on the file names, can you help me understand what kind of academic content these might contain and how I can get help with them?`;
      
      const response = await aiService.answerQuestion(imageAnalysisQuery, selectedSubject);
      
      console.log("Image analysis response:", response);
      setCurrentAnswer(`I've received your uploaded files: ${fileNames}\n\n${response.answer}\n\nNote: Full image analysis requires additional setup. For now, I can help you with questions about the content if you describe what's in the images.`);
      setLastQuery(`Image analysis: ${fileNames}`);
      
    } catch (error) {
      console.error("Image upload error:", error);
      setCurrentAnswer(`I've received your uploaded files: ${fileNames}\n\nI can help you with questions about the content. Please describe what's in the images or ask specific questions about the subject matter.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    console.log("handleRegenerate called with lastQuery:", lastQuery);
    if (lastQuery && hasApiKey) {
      setIsLoading(true);
      
      try {
        const regenerationPrompt = `कृपया इस प्रश्न का एक alternative explanation या different approach प्रदान करें: ${lastQuery}`;
        const response = await aiService.answerQuestion(regenerationPrompt, selectedSubject);
        
        console.log("Regenerated response received");
        setCurrentAnswer(response.answer);
        
        toast({
          title: "उत्तर दोबारा generate हुआ!",
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
    } else if (!hasApiKey) {
      toast({
        title: "API Key आवश्यक है",
        description: "Answer regenerate करने के लिए पहले अपनी API key set करें।",
        variant: "destructive",
      });
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
      
      <ApiKeyInput 
        onApiKeySet={handleApiKeySet}
        hasApiKey={hasApiKey}
      />
      
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
