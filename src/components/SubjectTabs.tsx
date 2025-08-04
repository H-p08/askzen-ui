
import { useState } from "react";
import { Calculator, Microscope, BookOpen, Brain, Globe, Lightbulb, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScienceSubTabs from "./ScienceSubTabs";

interface Subject {
  id: string;
  name: string;
  icon: React.ElementType;
  emoji: string;
  colorClass: string;
}

const subjects: Subject[] = [
  { id: "math", name: "Math", icon: Calculator, emoji: "📐", colorClass: "bg-orange-100 hover:bg-orange-200 text-orange-700" },
  { id: "science", name: "Science", icon: Microscope, emoji: "🔬", colorClass: "bg-green-100 hover:bg-green-200 text-green-700" },
  { id: "english", name: "English", icon: BookOpen, emoji: "📖", colorClass: "bg-purple-100 hover:bg-purple-200 text-purple-700" },
  { id: "reasoning", name: "Reasoning", icon: Brain, emoji: "🧮", colorClass: "bg-blue-100 hover:bg-blue-200 text-blue-700" },
  { id: "geography", name: "Geography", icon: Globe, emoji: "🌍", colorClass: "bg-emerald-100 hover:bg-emerald-200 text-emerald-700" },
  { id: "knowledge", name: "General Knowledge", icon: Lightbulb, emoji: "🧠", colorClass: "bg-violet-100 hover:bg-violet-200 text-violet-700" },
  { id: "diagrams", name: "Diagrams", icon: Image, emoji: "🖼️", colorClass: "bg-amber-100 hover:bg-amber-200 text-amber-700" },
];

interface SubjectTabsProps {
  selectedSubject: string;
  onSubjectSelect: (subjectId: string) => void;
}

const SubjectTabs = ({ selectedSubject, onSubjectSelect }: SubjectTabsProps) => {
  const [selectedScienceSubject, setSelectedScienceSubject] = useState("physics");

  const handleSubjectSelect = (subjectId: string) => {
    onSubjectSelect(subjectId);
    
    // Smooth scroll to search area after selecting subject
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
    // Pass the specific science subject to parent
    onSubjectSelect(`science_${scienceSubjectId}`);
  };

  return (
    <>
      <div className="w-full bg-card/30 backdrop-blur-sm border-b border-border/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ScrollArea className="w-full">
            <div className="flex space-x-3 pb-2">
              {subjects.map((subject) => {
                const Icon = subject.icon;
                const isSelected = selectedSubject === subject.id || selectedSubject.startsWith(`${subject.id}_`);
                
                return (
                  <Button
                    key={subject.id}
                    variant={isSelected ? "default" : "ghost"}
                    className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 min-w-fit transform hover:scale-105 ${
                      isSelected 
                        ? "bg-primary text-primary-foreground shadow-md scale-105" 
                        : `${subject.colorClass} border border-border/50`
                    }`}
                    onClick={() => handleSubjectSelect(subject.id)}
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

      <ScienceSubTabs
        selectedSubSubject={selectedScienceSubject}
        onSubSubjectSelect={handleScienceSubjectSelect}
        isVisible={selectedSubject === "science" || selectedSubject.startsWith("science_")}
      />
    </>
  );
};

export default SubjectTabs;
