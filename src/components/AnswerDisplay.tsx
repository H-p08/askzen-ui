
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import ProfessionalLoader from "./ProfessionalLoader";

interface AnswerDisplayProps {
  answer: string | null;
  isLoading: boolean;
  onRegenerate: () => void;
  onFeedback: (type: 'helpful' | 'not-helpful') => void;
  metadata: any;
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({ answer, isLoading, onRegenerate, onFeedback, metadata }) => {
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-2 border-primary/20 shadow-lg bg-gradient-to-br from-blue-50/50 to-purple-50/50">
          <ProfessionalLoader 
            message="Professional AI crafting your response"
            showProgress={true}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {answer ? (
        <Card className="border-2 border-primary/20 shadow-lg bg-white/90 backdrop-blur-md">
          <CardContent className="prose max-w-none">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{answer}</ReactMarkdown>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => onFeedback('helpful')}>
                <ThumbsUp className="h-4 w-4 mr-2" />
                Helpful
              </Button>
              <Button variant="outline" size="sm" onClick={() => onFeedback('not-helpful')}>
                <ThumbsDown className="h-4 w-4 mr-2" />
                Not Helpful
              </Button>
            </div>
            <Button onClick={onRegenerate} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-700 hover:to-purple-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="text-center text-gray-500 py-12">
          कोई जवाब नहीं है अभी तक...
        </div>
      )}
    </div>
  );
};

export default AnswerDisplay;
