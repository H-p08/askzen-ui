
import { useState } from "react";
import { Brain, Target, Lightbulb, Puzzle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ReasoningSubject {
  id: string;
  name: string;
  icon: React.ElementType;
  emoji: string;
  colorClass: string;
  description: string;
}

const reasoningSubjects: ReasoningSubject[] = [
  { 
    id: "logical", 
    name: "Logical Reasoning", 
    icon: Brain, 
    emoji: "🧠", 
    colorClass: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    description: "तर्क और विश्लेषण आधारित प्रश्न"
  },
  { 
    id: "analytical", 
    name: "Analytical Reasoning", 
    icon: Target, 
    emoji: "🎯", 
    colorClass: "bg-indigo-100 hover:bg-indigo-200 text-indigo-700",
    description: "डेटा विश्लेषण और पैटर्न"
  },
  { 
    id: "verbal", 
    name: "Verbal Reasoning", 
    icon: Lightbulb, 
    emoji: "💭", 
    colorClass: "bg-cyan-100 hover:bg-cyan-200 text-cyan-700",
    description: "भाषा आधारित तर्क प्रश्न"
  },
  { 
    id: "puzzles", 
    name: "Puzzles & Problems", 
    icon: Puzzle, 
    emoji: "🧩", 
    colorClass: "bg-teal-100 hover:bg-teal-200 text-teal-700",
    description: "पहेली और समस्या समाधान"
  },
];

interface ReasoningSubTabsProps {
  selectedSubSubject: string;
  onSubSubjectSelect: (subjectId: string) => void;
  isVisible: boolean;
}

const ReasoningSubTabs = ({ selectedSubSubject, onSubSubjectSelect, isVisible }: ReasoningSubTabsProps) => {
  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200/50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="text-center mb-3">
          <h3 className="text-sm font-semibold text-blue-700 mb-1">🧠 Reasoning Specializations</h3>
          <p className="text-xs text-blue-600">अपना reasoning type चुनें</p>
        </div>
        
        <ScrollArea className="w-full">
          <div className="flex justify-center space-x-4 pb-2">
            {reasoningSubjects.map((subject) => {
              const Icon = subject.icon;
              const isSelected = selectedSubSubject === subject.id;
              
              return (
                <Button
                  key={subject.id}
                  variant={isSelected ? "default" : "ghost"}
                  className={`flex-shrink-0 flex flex-col items-center space-y-1 px-4 py-3 rounded-xl transition-all duration-300 min-w-fit transform hover:scale-105 ${
                    isSelected 
                      ? "bg-blue-600 text-white shadow-lg scale-105" 
                      : `${subject.colorClass} border border-blue-300/50 hover:border-blue-400`
                  }`}
                  onClick={() => onSubSubjectSelect(subject.id)}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{subject.emoji}</span>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm whitespace-nowrap">{subject.name}</div>
                    <div className="text-xs opacity-75 max-w-[140px] leading-tight">{subject.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ReasoningSubTabs;
