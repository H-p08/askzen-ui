import { useState } from "react";
import { Calculator, Microscope, BookOpen, Brain, Globe, Lightbulb, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Subject {
  id: string;
  name: string;
  icon: React.ElementType;
  emoji: string;
  colorClass: string;
}

const subjects: Subject[] = [
  { id: "math", name: "Math", icon: Calculator, emoji: "📐", colorClass: "bg-subjects-math/20 hover:bg-subjects-math/30 text-orange-700" },
  { id: "science", name: "Science", icon: Microscope, emoji: "🔬", colorClass: "bg-subjects-science/20 hover:bg-subjects-science/30 text-green-700" },
  { id: "english", name: "English", icon: BookOpen, emoji: "📖", colorClass: "bg-subjects-english/20 hover:bg-subjects-english/30 text-purple-700" },
  { id: "reasoning", name: "Reasoning", icon: Brain, emoji: "🧮", colorClass: "bg-subjects-reasoning/20 hover:bg-subjects-reasoning/30 text-blue-700" },
  { id: "geography", name: "Geography", icon: Globe, emoji: "🌍", colorClass: "bg-subjects-geography/20 hover:bg-subjects-geography/30 text-emerald-700" },
  { id: "knowledge", name: "General Knowledge", icon: Lightbulb, emoji: "🧠", colorClass: "bg-subjects-knowledge/20 hover:bg-subjects-knowledge/30 text-violet-700" },
  { id: "diagrams", name: "Diagrams", icon: Image, emoji: "🖼️", colorClass: "bg-subjects-diagrams/20 hover:bg-subjects-diagrams/30 text-amber-700" },
];

interface SubjectTabsProps {
  selectedSubject: string;
  onSubjectSelect: (subjectId: string) => void;
}

const SubjectTabs = ({ selectedSubject, onSubjectSelect }: SubjectTabsProps) => {
  return (
    <div className="w-full bg-card/30 backdrop-blur-sm border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ScrollArea className="w-full">
          <div className="flex space-x-3 pb-2">
            {subjects.map((subject) => {
              const Icon = subject.icon;
              const isSelected = selectedSubject === subject.id;
              
              return (
                <Button
                  key={subject.id}
                  variant={isSelected ? "default" : "ghost"}
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 min-w-fit ${
                    isSelected 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : `${subject.colorClass} border border-border/50`
                  }`}
                  onClick={() => onSubjectSelect(subject.id)}
                >
                  <span className="text-base">{subject.emoji}</span>
                  <Icon className="h-4 w-4" />
                  <span className="font-medium text-sm whitespace-nowrap">{subject.name}</span>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SubjectTabs;