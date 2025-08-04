
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Zap, TrendingUp, Star } from "lucide-react";

interface SmartSuggestionsProps {
  selectedSubject: string;
  onSuggestionClick: (suggestion: string) => void;
  recentQueries: string[];
}

const SmartSuggestions = ({ selectedSubject, onSuggestionClick, recentQueries }: SmartSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const subjectSuggestions: Record<string, string[]> = {
    math: [
      "Quadratic equations का detailed solution with examples",
      "Calculus के basic concepts explain करें",
      "Probability और statistics के real-world applications",
      "Trigonometry के important formulas और shortcuts"
    ],
    science: [
      "Newton के laws of motion with practical examples",
      "Photosynthesis की complete process explain करें",
      "Periodic table के trends और patterns",
      "Chemical bonding के different types"
    ],
    english: [
      "Grammar rules for perfect sentence construction",
      "Essay writing techniques और structure",
      "Vocabulary building के effective methods",
      "Communication skills improvement tips"
    ],
    reasoning: [
      "Logical reasoning के pattern recognition techniques",
      "Analytical reasoning problem solving strategies",
      "Critical thinking development methods",
      "Puzzle solving के systematic approaches"
    ],
    code: [
      "JavaScript ES6 features और best practices",
      "React components optimization techniques",
      "Algorithm complexity analysis methods",
      "Debugging strategies for common errors"
    ],
    research: [
      "Academic research methodology और techniques",
      "Data collection और analysis best practices",
      "Literature review writing guidelines",
      "Statistical analysis for research data"
    ],
    creative: [
      "Story writing techniques और character development",
      "Creative content ideas generation methods",
      "Copywriting strategies for engagement",
      "Blog writing best practices और SEO tips"
    ],
    geography: [
      "Climate change का global impact analysis",
      "World capitals और important geographical facts",
      "Natural disasters के causes और prevention",
      "Economic geography के modern trends"
    ],
    knowledge: [
      "Current affairs का comprehensive overview",
      "Historical events के modern relevance",
      "Scientific discoveries की latest updates",
      "Technology trends और future predictions"
    ],
    diagrams: [
      "Diagram interpretation techniques",
      "Visual data analysis methods",
      "Chart और graph reading skills",
      "Technical drawing understanding"
    ],
    chat: [
      "Daily conversation improvement tips",
      "Problem-solving assistance guidance",
      "Learning strategy recommendations",
      "Personal productivity enhancement"
    ],
    summary: [
      "Long text summarization techniques",
      "Key points extraction methods",
      "Report writing और presentation skills",
      "Information synthesis strategies"
    ]
  };

  const trendingSuggestions = [
    "AI और machine learning का future scope",
    "Climate change solutions और innovations",
    "Digital marketing के latest trends",
    "Career guidance for students in 2025"
  ];

  const popularSuggestions = [
    "Exam preparation strategies और time management",
    "Interview preparation complete guide",
    "Financial planning for beginners",
    "Health और fitness tips for students"
  ];

  useEffect(() => {
    const baseSuggestions = subjectSuggestions[selectedSubject] || subjectSuggestions.knowledge;
    const contextualSuggestions = getContextualSuggestions();
    
    setSuggestions([
      ...baseSuggestions.slice(0, 2),
      ...contextualSuggestions.slice(0, 1),
      ...trendingSuggestions.slice(0, 1),
      ...popularSuggestions.slice(0, 1)
    ]);
  }, [selectedSubject, recentQueries]);

  const getContextualSuggestions = () => {
    if (recentQueries.length === 0) return [];
    
    // Generate follow-up suggestions based on recent queries
    const lastQuery = recentQueries[recentQueries.length - 1]?.toLowerCase() || "";
    
    if (lastQuery.includes("solve") || lastQuery.includes("solution")) {
      return ["Similar problems के और examples चाहिए"];
    }
    if (lastQuery.includes("explain") || lastQuery.includes("definition")) {
      return ["इस topic के advanced concepts भी समझाएं"];
    }
    if (lastQuery.includes("example") || lastQuery.includes("practical")) {
      return ["Real-world applications और case studies"];
    }
    
    return ["Previous answer को और detail में explain करें"];
  };

  const getSuggestionIcon = (index: number) => {
    if (index < 2) return <Lightbulb className="h-4 w-4" />;
    if (index === 2) return <Zap className="h-4 w-4" />;
    if (index === 3) return <TrendingUp className="h-4 w-4" />;
    return <Star className="h-4 w-4" />;
  };

  const getSuggestionBadge = (index: number) => {
    if (index < 2) return null;
    if (index === 2) return <Badge variant="secondary" className="text-xs ml-2">Follow-up</Badge>;
    if (index === 3) return <Badge variant="outline" className="text-xs ml-2">Trending</Badge>;
    return <Badge variant="default" className="text-xs ml-2">Popular</Badge>;
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-muted/30 to-background border border-border/50">
      <div className="flex items-center space-x-2 mb-3">
        <Lightbulb className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">✨ Smart Suggestions</h3>
        <Badge variant="outline" className="text-xs">AI-Powered</Badge>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        {selectedSubject} के लिए AI-generated suggestions और trending topics
      </p>

      <div className="grid gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="ghost"
            className="justify-start text-left h-auto py-3 px-3 hover:bg-primary/5 hover:border-primary/20 border border-transparent transition-all"
            onClick={() => onSuggestionClick(suggestion)}
          >
            <div className="flex items-start space-x-2 w-full">
              <div className="text-primary mt-0.5">
                {getSuggestionIcon(index)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <span className="text-sm font-medium line-clamp-2">{suggestion}</span>
                  {getSuggestionBadge(index)}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>💡 Click any suggestion to explore</span>
          <span>Updated: {new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </Card>
  );
};

export default SmartSuggestions;
