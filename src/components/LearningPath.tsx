
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Target, Star, CheckCircle, Clock, Trophy } from "lucide-react";

interface LearningPathProps {
  selectedSubject: string;
  onPathGenerate: (path: string) => void;
}

const LearningPath = ({ selectedSubject, onPathGenerate }: LearningPathProps) => {
  const [currentLevel, setCurrentLevel] = useState("beginner");
  const [goals, setGoals] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const levels = [
    { id: "beginner", name: "Beginner", emoji: "🌱" },
    { id: "intermediate", name: "Intermediate", emoji: "🌿" },
    { id: "advanced", name: "Advanced", emoji: "🌳" }
  ];

  const subjectGoals = {
    math: ["Algebra Mastery", "Calculus Foundation", "Problem Solving", "Mathematical Reasoning"],
    science: ["Scientific Method", "Lab Skills", "Theory Application", "Research Writing"],
    english: ["Grammar Perfection", "Vocabulary Building", "Essay Writing", "Communication Skills"],
    reasoning: ["Logical Thinking", "Pattern Recognition", "Critical Analysis", "Decision Making"]
  };

  const generateLearningPath = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const path = `# 🎯 **Personalized Learning Path**

## 📚 **${selectedSubject.toUpperCase()} Mastery Journey**
**Current Level:** ${currentLevel} | **Target Goals:** ${goals.length} objectives

## 🗺️ **Your Learning Roadmap**

### Phase 1: Foundation Building (Weeks 1-3)
**Progress: 0/5 completed**

✅ **Step 1:** Basic concepts overview
- 📖 Core principles की understanding
- 🎯 Fundamental definitions और terminology
- ⏱️ Estimated time: 5-7 hours

⬜ **Step 2:** Interactive exercises
- 🔄 Practice problems और examples  
- 💡 Hands-on learning activities
- ⏱️ Estimated time: 8-10 hours

⬜ **Step 3:** Assessment checkpoint
- 📊 Progress evaluation
- 🔍 Knowledge gaps identification
- ⏱️ Estimated time: 2-3 hours

### Phase 2: Skill Development (Weeks 4-6)
**Progress: 0/4 completed**

⬜ **Advanced Concepts**
- 🎓 Intermediate topics exploration
- 🔬 Real-world applications
- 📝 Project-based learning

⬜ **Practice Intensification** 
- 💪 Regular problem solving
- 🎯 Skill-specific exercises
- 📈 Performance tracking

### Phase 3: Mastery & Application (Weeks 7-8)
**Progress: 0/3 completed**

⬜ **Expert Level Challenges**
- 🏆 Complex problem solving
- 🔄 Peer collaboration
- 🎖️ Certification preparation

## 📊 **Learning Analytics**

### Your Progress Metrics
- **Study Streak:** 🔥 0 days
- **Completed Modules:** 0/12
- **Skill Level:** ${currentLevel}
- **Next Milestone:** Foundation Complete

### Personalized Recommendations
🎯 **Focus Areas:** ${goals.join(', ')}
📅 **Suggested Schedule:** 1-2 hours daily
🏅 **Achievement Target:** Expert level in 8 weeks

## 🔥 **Motivation Boosters**
- 🏆 Weekly achievement badges
- 📈 Progress visualization
- 👥 Study group collaboration
- 🎉 Milestone celebrations

## 📱 **Smart Features**
- 🔔 Daily study reminders
- 📊 Progress analytics
- 🎯 Personalized quizzes  
- 💡 AI-powered hints

*Adaptive Learning • Personalized Experience • Progress Tracking • Goal-Oriented*`;
      
      onPathGenerate(path);
      setIsGenerating(false);
    }, 3000);
  };

  const toggleGoal = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const currentSubjectGoals = subjectGoals[selectedSubject as keyof typeof subjectGoals] || subjectGoals.math;

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-bold text-blue-800">AI Learning Path Generator</h3>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          <Target className="h-3 w-3 mr-1" />
          Personalized
        </Badge>
      </div>
      
      <p className="text-blue-700 mb-6">
        आपके goals और current level के अनुसार personalized learning path create करें।
      </p>

      <div className="space-y-6">
        {/* Current Level Selection */}
        <div>
          <label className="block text-sm font-semibold text-blue-800 mb-3">
            🎓 Your Current Level:
          </label>
          <div className="flex space-x-2">
            {levels.map(level => (
              <Button
                key={level.id}
                variant={currentLevel === level.id ? "default" : "outline"}
                className={currentLevel === level.id ? "bg-blue-600" : "border-blue-300"}
                onClick={() => setCurrentLevel(level.id)}
              >
                <span className="mr-2">{level.emoji}</span>
                {level.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Goals Selection */}
        <div>
          <label className="block text-sm font-semibold text-blue-800 mb-3">
            🎯 Your Learning Goals:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {currentSubjectGoals.map(goal => (
              <Button
                key={goal}
                variant={goals.includes(goal) ? "default" : "outline"}
                className={`justify-start ${goals.includes(goal) ? "bg-blue-600" : "border-blue-300"}`}
                onClick={() => toggleGoal(goal)}
              >
                {goals.includes(goal) ? (
                  <CheckCircle className="h-4 w-4 mr-2" />
                ) : (
                  <Target className="h-4 w-4 mr-2" />
                )}
                {goal}
              </Button>
            ))}
          </div>
        </div>

        {/* Sample Progress */}
        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">Overall Progress</span>
            <span className="text-sm text-blue-600">15%</span>
          </div>
          <Progress value={15} className="h-2" />
          <div className="flex items-center mt-2 text-xs text-blue-600">
            <Clock className="h-3 w-3 mr-1" />
            <span>Next milestone in 3 days</span>
            <Trophy className="h-3 w-3 ml-4 mr-1" />
            <span>2 badges earned</span>
          </div>
        </div>

        <Button 
          onClick={generateLearningPath}
          disabled={isGenerating || goals.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <Star className="h-4 w-4 mr-2" />
          {isGenerating ? "Generating Path..." : "Create My Learning Path"}
        </Button>

        <div className="flex items-center justify-between text-xs text-blue-600">
          <span>🧠 AI-powered curriculum design</span>
          <span>📊 Adaptive learning technology</span>
        </div>
      </div>
    </Card>
  );
};

export default LearningPath;
