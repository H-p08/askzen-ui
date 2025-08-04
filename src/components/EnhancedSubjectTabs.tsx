
import { useState } from "react";
import { 
  Calculator, 
  Microscope, 
  BookOpen, 
  Brain, 
  Globe, 
  Lightbulb, 
  Image, 
  Code, 
  Search, 
  PenTool,
  Zap,
  MessageSquare,
  FileText,
  Eye,
  Target,
  Sparkles,
  Bot,
  GraduationCap,
  Workflow
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import ScienceSubTabs from "./ScienceSubTabs";
import ReasoningSubTabs from "./ReasoningSubTabs";

interface Subject {
  id: string;
  name: string;
  icon: React.ElementType;
  emoji: string;
  colorClass: string;
  description: string;
  isNew?: boolean;
  isPremium?: boolean;
  isAdvanced?: boolean;
}

const subjects: Subject[] = [
  { 
    id: "math", 
    name: "Mathematics", 
    icon: Calculator, 
    emoji: "📐", 
    colorClass: "bg-orange-100 hover:bg-orange-200 text-orange-700",
    description: "गणित और mathematical problem solving"
  },
  { 
    id: "science", 
    name: "Science", 
    icon: Microscope, 
    emoji: "🔬", 
    colorClass: "bg-green-100 hover:bg-green-200 text-green-700",
    description: "Physics, Chemistry, Biology concepts"
  },
  { 
    id: "english", 
    name: "English", 
    icon: BookOpen, 
    emoji: "📖", 
    colorClass: "bg-purple-100 hover:bg-purple-200 text-purple-700",
    description: "Language learning और grammar"
  },
  { 
    id: "reasoning", 
    name: "Reasoning", 
    icon: Brain, 
    emoji: "🧠", 
    colorClass: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    description: "Logical और analytical thinking"
  },
  { 
    id: "vision", 
    name: "Vision AI", 
    icon: Eye, 
    emoji: "👁️", 
    colorClass: "bg-purple-100 hover:bg-purple-200 text-purple-700",
    description: "Advanced image और visual analysis",
    isNew: true,
    isAdvanced: true
  },
  { 
    id: "code", 
    name: "Code Analysis", 
    icon: Code, 
    emoji: "💻", 
    colorClass: "bg-slate-100 hover:bg-slate-200 text-slate-700",
    description: "Programming और code review",
    isAdvanced: true
  },
  { 
    id: "learning", 
    name: "Learning Path", 
    icon: Target, 
    emoji: "🎯", 
    colorClass: "bg-green-100 hover:bg-green-200 text-green-700",
    description: "Personalized learning roadmaps",
    isNew: true,
    isAdvanced: true
  },
  { 
    id: "research", 
    name: "Research Assistant", 
    icon: Search, 
    emoji: "🔍", 
    colorClass: "bg-indigo-100 hover:bg-indigo-200 text-indigo-700",
    description: "Deep research और data analysis",
    isAdvanced: true
  },
  { 
    id: "creative", 
    name: "Creative Writing", 
    icon: PenTool, 
    emoji: "✍️", 
    colorClass: "bg-pink-100 hover:bg-pink-200 text-pink-700",
    description: "Creative content और storytelling"
  },
  { 
    id: "chat", 
    name: "Enhanced Chat", 
    icon: Bot, 
    emoji: "🤖", 
    colorClass: "bg-emerald-100 hover:bg-emerald-200 text-emerald-700",
    description: "Multi-mode conversational AI",
    isNew: true,
    isPremium: true
  },
  { 
    id: "tutor", 
    name: "AI Tutor", 
    icon: GraduationCap, 
    emoji: "🎓", 
    colorClass: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    description: "Personalized teaching assistant",
    isNew: true,
    isPremium: true
  },
  { 
    id: "workflow", 
    name: "Smart Workflow", 
    icon: Workflow, 
    emoji: "⚡", 
    colorClass: "bg-orange-100 hover:bg-orange-200 text-orange-700",
    description: "Productivity और automation",
    isNew: true,
    isAdvanced: true
  },
  { 
    id: "geography", 
    name: "Geography", 
    icon: Globe, 
    emoji: "🌍", 
    colorClass: "bg-emerald-100 hover:bg-emerald-200 text-emerald-700",
    description: "World knowledge और locations"
  },
  { 
    id: "knowledge", 
    name: "General Knowledge", 
    icon: Lightbulb, 
    emoji: "💡", 
    colorClass: "bg-violet-100 hover:bg-violet-200 text-violet-700",
    description: "General facts और information"
  },
  { 
    id: "diagrams", 
    name: "Visual Analysis", 
    icon: Image, 
    emoji: "🖼️", 
    colorClass: "bg-amber-100 hover:bg-amber-200 text-amber-700",
    description: "Image analysis और diagrams"
  },
  { 
    id: "summary", 
    name: "Summarizer", 
    icon: FileText, 
    emoji: "📄", 
    colorClass: "bg-teal-100 hover:bg-teal-200 text-teal-700",
    description: "Text summarization और analysis"
  }
];

interface EnhancedSubjectTabsProps {
  selectedSubject: string;
  onSubjectSelect: (subjectId: string) => void;
}

const EnhancedSubjectTabs = ({ selectedSubject, onSubjectSelect }: EnhancedSubjectTabsProps) => {
  const [selectedScienceSubject, setSelectedScienceSubject] = useState("physics");
  const [selectedReasoningSubject, setSelectedReasoningSubject] = useState("logical");

  const handleSubjectSelect = (subjectId: string) => {
    onSubjectSelect(subjectId);
    
    setTimeout(() => {
      const searchArea = document.getElementById('search-area');
      if (searchArea) {
        searchArea.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);
  };

  const handleScienceSubjectSelect = (scienceSubjectId: string) => {
    setSelectedScienceSubject(scienceSubjectId);
    onSubjectSelect(`science_${scienceSubjectId}`);
  };

  const handleReasoningSubjectSelect = (reasoningSubjectId: string) => {
    setSelectedReasoningSubject(reasoningSubjectId);
    onSubjectSelect(`reasoning_${reasoningSubjectId}`);
  };

  return (
    <>
      <div className="w-full bg-gradient-to-r from-background via-muted/30 to-background backdrop-blur-sm border-b border-border/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center mb-3">
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🚀 Enhanced Mini Gemini • Advanced AI Assistant
            </h2>
            <p className="text-sm text-muted-foreground">Choose your specialized AI assistant with advanced capabilities</p>
          </div>
          
          <ScrollArea className="w-full">
            <div className="flex space-x-3 pb-2">
              {subjects.map((subject) => {
                const Icon = subject.icon;
                const isSelected = selectedSubject === subject.id || selectedSubject.startsWith(`${subject.id}_`);
                
                return (
                  <Button
                    key={subject.id}
                    variant={isSelected ? "default" : "ghost"}
                    className={`flex-shrink-0 flex flex-col items-center space-y-1 px-4 py-3 rounded-xl transition-all duration-300 min-w-fit transform hover:scale-105 relative ${
                      isSelected 
                        ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg scale-105" 
                        : `${subject.colorClass} border border-border/50 hover:shadow-md`
                    }`}
                    onClick={() => handleSubjectSelect(subject.id)}
                  >
                    {subject.isNew && (
                      <Badge className="absolute -top-2 -right-1 bg-green-500 text-white text-xs px-1 py-0">
                        NEW
                      </Badge>
                    )}
                    {subject.isPremium && (
                      <Badge className="absolute -top-2 -right-1 bg-yellow-500 text-white text-xs px-1 py-0">
                        PRO
                      </Badge>
                    )}
                    {subject.isAdvanced && !subject.isNew && !subject.isPremium && (
                      <Badge className="absolute -top-2 -right-1 bg-purple-500 text-white text-xs px-1 py-0">
                        <Sparkles className="h-2 w-2" />
                      </Badge>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-base">{subject.emoji}</span>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-sm whitespace-nowrap">{subject.name}</div>
                      <div className="text-xs opacity-75 max-w-[120px] leading-tight">{subject.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>

      <ScienceSubTabs
        selectedSubSubject={selectedScienceSubject}
        onSubSubjectSelect={handleScienceSubjectSelect}
        isVisible={selectedSubject === "science" || selectedSubject.startsWith("science_")}
      />

      <ReasoningSubTabs
        selectedSubSubject={selectedReasoningSubject}
        onSubSubjectSelect={handleReasoningSubjectSelect}
        isVisible={selectedSubject === "reasoning" || selectedSubject.startsWith("reasoning_")}
      />
    </>
  );
};

export default EnhancedSubjectTabs;
