
import { useState } from "react";
import { RefreshCw, ThumbsUp, ThumbsDown, Share2, Copy, Volume2, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface AnswerDisplayProps {
  answer: string | null;
  isLoading: boolean;
  onRegenerate: () => void;
  onFeedback: (type: 'helpful' | 'not-helpful') => void;
  metadata?: {
    confidence: number;
    relatedTopics: string[];
    followUpQuestions: string[];
  };
}

const AnswerDisplay = ({ answer, isLoading, onRegenerate, onFeedback, metadata }: AnswerDisplayProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  console.log("Enhanced AnswerDisplay rendered with props:", {
    answer: answer ? `${answer.substring(0, 50)}...` : null,
    isLoading,
    hasAnswer: !!answer,
    hasMetadata: !!metadata
  });

  const handleCopy = async () => {
    if (answer) {
      try {
        await navigator.clipboard.writeText(answer);
        setIsCopied(true);
        toast({
          title: "📋 Answer copied!",
          description: "Complete answer has been copied to your clipboard.",
        });
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        toast({
          title: "❌ Copy failed",
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
          title: 'AskZen Pro - Enhanced AI Answer',
          text: answer,
        });
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleSpeak = () => {
    if (answer && 'speechSynthesis' in window) {
      if (isListening) {
        speechSynthesis.cancel();
        setIsListening(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(answer);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.onstart = () => setIsListening(true);
      utterance.onend = () => setIsListening(false);
      utterance.onerror = () => setIsListening(false);
      
      speechSynthesis.speak(utterance);
      toast({
        title: "🔊 Reading answer",
        description: "Enhanced text-to-speech is now playing.",
      });
    } else {
      toast({
        title: "❌ Speech not supported",
        description: "Your browser doesn't support text-to-speech.",
        variant: "destructive",
      });
    }
  };

  if (!answer && !isLoading) {
    console.log("Rendering enhanced empty state");
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8 text-center bg-gradient-to-br from-card/50 to-muted/20 border border-border/50 shadow-lg">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Enhanced AI Ready to Help! 🚀
          </h3>
          <p className="text-muted-foreground mb-4">
            Ask any question or upload images to get comprehensive, intelligent answers
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge variant="secondary" className="bg-math/20">Math Solutions</Badge>
            <Badge variant="secondary" className="bg-science/20">Science Explanations</Badge>
            <Badge variant="secondary" className="bg-english/20">English Help</Badge>
            <Badge variant="secondary" className="bg-reasoning/20">Logic & Reasoning</Badge>
          </div>
        </Card>
      </div>
    );
  }

  console.log("Rendering enhanced answer content");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="bg-card border border-border/50 shadow-xl overflow-hidden">
        {/* Enhanced Header */}
        <div className="px-6 py-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Enhanced AI Response</h3>
                {metadata && (
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">
                        {Math.round(metadata.confidence * 100)}% Confidence
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      AI Enhanced
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onRegenerate}
                disabled={isLoading}
                className="text-muted-foreground hover:text-foreground hover:bg-primary/10"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Regenerate
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <span className="text-sm text-muted-foreground">Enhanced AI is thinking...</span>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {answer}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Metadata Section */}
        {metadata && !isLoading && (
          <div className="px-6 py-4 bg-muted/10 border-t border-border/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Related Topics */}
              {metadata.relatedTopics && metadata.relatedTopics.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Related Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {metadata.relatedTopics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs hover:bg-primary/10 cursor-pointer">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Follow-up Questions */}
              {metadata.followUpQuestions && metadata.followUpQuestions.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Suggested Questions:</h4>
                  <div className="space-y-1">
                    {metadata.followUpQuestions.slice(0, 2).map((question, index) => (
                      <div key={index} className="text-xs text-primary/80 hover:text-primary cursor-pointer p-1 rounded hover:bg-primary/5">
                        • {question}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Actions */}
        {answer && !isLoading && (
          <div className="px-6 py-4 border-t border-border/50 bg-gradient-to-r from-muted/5 to-background/5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground font-medium">Was this helpful?</span>
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
                  Needs Work
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSpeak}
                  className={`text-muted-foreground hover:text-foreground ${isListening ? 'text-primary bg-primary/10' : ''}`}
                >
                  <Volume2 className="h-4 w-4 mr-1" />
                  {isListening ? 'Stop' : 'Listen'}
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
