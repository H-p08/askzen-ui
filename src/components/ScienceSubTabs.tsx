
import { useState } from "react";
import { Atom, FlaskConical, Dna } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ScienceSubject {
  id: string;
  name: string;
  icon: React.ElementType;
  emoji: string;
  colorClass: string;
  description: string;
}

const scienceSubjects: ScienceSubject[] = [
  { 
    id: "physics", 
    name: "Physics", 
    icon: Atom, 
    emoji: "⚛️", 
    colorClass: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    description: "गति, ऊर्जा, बल और प्राकृतिक नियम"
  },
  { 
    id: "chemistry", 
    name: "Chemistry", 
    icon: FlaskConical, 
    emoji: "🧪", 
    colorClass: "bg-green-100 hover:bg-green-200 text-green-700",
    description: "तत्व, अभिक्रियाएं और रासायनिक गुण"
  },
  { 
    id: "biology", 
    name: "Biology", 
    icon: Dna, 
    emoji: "🧬", 
    colorClass: "bg-purple-100 hover:bg-purple-200 text-purple-700",
    description: "जीवन, कोशिका और प्राकृतिक प्रक्रियाएं"
  },
];

interface ScienceSubTabsProps {
  selectedSubSubject: string;
  onSubSubjectSelect: (subjectId: string) => void;
  isVisible: boolean;
}

const ScienceSubTabs = ({ selectedSubSubject, onSubSubjectSelect, isVisible }: ScienceSubTabsProps) => {
  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200/50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="text-center mb-3">
          <h3 className="text-sm font-semibold text-green-700 mb-1">🔬 Science Specializations</h3>
          <p className="text-xs text-green-600">अपना विशेष विषय चुनें</p>
        </div>
        
        <ScrollArea className="w-full">
          <div className="flex justify-center space-x-4 pb-2">
            {scienceSubjects.map((subject) => {
              const Icon = subject.icon;
              const isSelected = selectedSubSubject === subject.id;
              
              return (
                <Button
                  key={subject.id}
                  variant={isSelected ? "default" : "ghost"}
                  className={`flex-shrink-0 flex flex-col items-center space-y-1 px-4 py-3 rounded-xl transition-all duration-300 min-w-fit transform hover:scale-105 ${
                    isSelected 
                      ? "bg-green-600 text-white shadow-lg scale-105" 
                      : `${subject.colorClass} border border-green-300/50 hover:border-green-400`
                  }`}
                  onClick={() => onSubSubjectSelect(subject.id)}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{subject.emoji}</span>
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
  );
};

export default ScienceSubTabs;
