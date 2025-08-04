
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
    currentAnswer,
    isLoading,
    hasApiKey
  });

  const handleApiKeySet = (apiKey: string) => {
    aiService.setApiKey(apiKey);
    setHasApiKey(true);
  };

  const handleSearch = async (query: string) => {
    console.log("handleSearch called with query:", query);
    setIsLoading(true);
    setLastQuery(query);
    
    try {
      const response = await aiService.answerQuestion(query, selectedSubject);
      
      console.log("AI response received:", response);
      setCurrentAnswer(response.answer);
      
      if (!response.error) {
        toast({
          title: "Answer generated!",
          description: "Your AI-powered answer is ready.",
        });
      } else {
        toast({
          title: "API Key needed",
          description: "Please enter your Perplexity API key to get real AI answers.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      setCurrentAnswer("I apologize, but I encountered an error while processing your question. Please try again.");
      toast({
        title: "Error",
        description: "Failed to get AI response. Please check your API key and try again.",
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
    console.log("handleRegenerate called");
    if (lastQuery && hasApiKey) {
      setIsLoading(true);
      
      try {
        const regenerationPrompt = `Please provide an alternative explanation or different approach to this question: ${lastQuery}`;
        const response = await aiService.answerQuestion(regenerationPrompt, selectedSubject);
        
        console.log("Regenerated response:", response);
        setCurrentAnswer(response.answer);
        
        toast({
          title: "Answer regenerated!",
          description: "Here's a fresh perspective on your question.",
        });
      } catch (error) {
        console.error("Regeneration error:", error);
        toast({
          title: "Error",
          description: "Failed to regenerate answer. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    } else if (!hasApiKey) {
      toast({
        title: "API Key needed",
        description: "Please set your API key first to regenerate answers.",
        variant: "destructive",
      });
    }
  };

  const handleFeedback = (type: 'helpful' | 'not-helpful') => {
    console.log("handleFeedback called with type:", type);
    toast({
      title: type === 'helpful' ? "Thank you!" : "Feedback received",
      description: type === 'helpful' 
        ? "We're glad the answer was helpful!" 
        : "We'll use your feedback to improve our responses.",
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
