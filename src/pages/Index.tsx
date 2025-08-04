import { useState } from "react";
import Header from "@/components/Header";
import SubjectTabs from "@/components/SubjectTabs";
import SearchArea from "@/components/SearchArea";
import AnswerDisplay from "@/components/AnswerDisplay";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState("math");
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const sampleAnswer = `Based on your ${selectedSubject} question: "${query}"\n\nHere's a comprehensive answer:\n\n1. First, let's break down the problem step by step.\n\n2. We need to identify the key concepts involved.\n\n3. Then we'll apply the appropriate formulas or methods.\n\n4. Finally, we'll solve and verify our answer.\n\nThis is a simulated response. In a real implementation, this would be powered by an AI model that provides detailed, accurate answers tailored to the specific subject and question asked.`;
      
      setCurrentAnswer(sampleAnswer);
      setIsLoading(false);
      
      toast({
        title: "Answer generated!",
        description: "Your AI-powered answer is ready.",
      });
    }, 2000);
  };

  const handleImageUpload = (files: FileList) => {
    const fileNames = Array.from(files).map(f => f.name).join(", ");
    toast({
      title: "Images uploaded!",
      description: `Processing: ${fileNames}`,
    });
    
    // Simulate processing uploaded images
    setIsLoading(true);
    setTimeout(() => {
      const sampleAnswer = `I've analyzed your uploaded image(s): ${fileNames}\n\nBased on the visual content, here's what I can help you with:\n\n• I can see mathematical equations, diagrams, or text that needs solving\n• Let me break down the problem shown in the image\n• Here's the step-by-step solution...\n\nThis is a simulated response for image analysis. In a real implementation, this would use computer vision and AI to accurately read and solve problems from uploaded images.`;
      
      setCurrentAnswer(sampleAnswer);
      setIsLoading(false);
    }, 3000);
  };

  const handleRegenerate = () => {
    if (currentAnswer) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentAnswer(currentAnswer + "\n\n[Regenerated] Here's an alternative explanation or approach to the same problem...");
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleFeedback = (type: 'helpful' | 'not-helpful') => {
    toast({
      title: type === 'helpful' ? "Thank you!" : "Feedback received",
      description: type === 'helpful' 
        ? "We're glad the answer was helpful!" 
        : "We'll use your feedback to improve our responses.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SubjectTabs 
        selectedSubject={selectedSubject} 
        onSubjectSelect={setSelectedSubject} 
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
