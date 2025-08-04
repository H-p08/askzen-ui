import { useState } from "react";
import { RefreshCw, ThumbsUp, ThumbsDown, Share2, Copy, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface AnswerDisplayProps {
  answer: string | null;
  isLoading: boolean;
  onRegenerate: () => void;
  onFeedback: (type: 'helpful' | 'not-helpful') => void;
}

const AnswerDisplay = ({ answer, isLoading, onRegenerate, onFeedback }: AnswerDisplayProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    if (answer) {
      try {
        await navigator.clipboard.writeText(answer);
        setIsCopied(true);
        toast({
          title: "Answer copied!",
          description: "The answer has been copied to your clipboard.",
        });
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        toast({
          title: "Copy failed",
          description: "Unable to copy to clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  const handleShare = async () => {
    if (answer && navigator.share) {
      try {
        await navigator.share({
          title: 'AskZen Answer',
          text: answer,
        });
      } catch (err) {
        // Fallback to copy
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleSpeak = () => {
    if (answer && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(answer);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
      toast({
        title: "Reading answer",
        description: "Text-to-speech is now playing.",
      });
    } else {
      toast({
        title: "Speech not supported",
        description: "Your browser doesn't support text-to-speech.",
        variant: "destructive",
      });
    }
  };

  if (!answer && !isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8 text-center bg-card/50 border border-border/50">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Volume2 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Ready to help you learn!</h3>
          <p className="text-muted-foreground">
            Ask a question or upload an image to get started with AI-powered answers.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="bg-card border border-border/50 shadow-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
          <h3 className="text-lg font-semibold">AI Answer</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onRegenerate}
              disabled={isLoading}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {answer}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {answer && !isLoading && (
          <div className="px-6 py-4 border-t border-border/50 bg-muted/20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Was this helpful?</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFeedback('helpful')}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFeedback('not-helpful')}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  Not Helpful
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSpeak}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Volume2 className="h-4 w-4 mr-1" />
                  Listen
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  {isCopied ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AnswerDisplay;