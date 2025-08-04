
import { useState } from "react";
import { Key, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  hasApiKey: boolean;
}

const ApiKeyInput = ({ onApiKeySet, hasApiKey }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSettingKey, setIsSettingKey] = useState(false);
  const { toast } = useToast();

  const handleSetApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key आवश्यक है",
        description: "कृपया अपनी Perplexity API key डालें।",
        variant: "destructive",
      });
      return;
    }

    setIsSettingKey(true);
    onApiKeySet(apiKey.trim());
    
    setTimeout(() => {
      setIsSettingKey(false);
    }, 1000);
  };

  if (hasApiKey) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center space-x-2 text-sm text-green-600 bg-green-50 rounded-lg p-3">
          <Key className="h-4 w-4" />
          <span>API Key configured - AI-powered उत्तर के लिए तैयार!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Card className="glass-card p-6 border-2 border-primary/20">
        <div className="text-center mb-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Key className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">अपना AI Connect करें</h3>
          <p className="text-muted-foreground mb-4">
            किसी भी प्रश्न का real AI-powered उत्तर पाने के लिए अपनी Perplexity API key डालें
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            अपनी free API key यहाँ से प्राप्त करें:{" "}
            <a 
              href="https://www.perplexity.ai/settings/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              perplexity.ai/settings/api
            </a>
          </p>
          <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded mb-4">
            <strong>महत्वपूर्ण:</strong> API key डालने के बाद आप math, science, English, reasoning, geography और किसी भी विषय के प्रश्नों का detailed उत्तर प्राप्त कर सकेंगे!
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Input
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="pplx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="pr-10"
              onKeyPress={(e) => e.key === 'Enter' && handleSetApiKey()}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>

          <Button 
            onClick={handleSetApiKey}
            disabled={!apiKey.trim() || isSettingKey}
            className="w-full"
          >
            {isSettingKey ? "Setup हो रहा है..." : "AI Connect करें"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ApiKeyInput;
