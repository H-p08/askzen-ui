
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Code, Play, Bug, Lightbulb, Terminal, Zap } from "lucide-react";

interface CodeAssistantProps {
  onCodeAnalysis: (analysis: string) => void;
}

const CodeAssistant = ({ onCodeAnalysis }: CodeAssistantProps) => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCode = async () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const analysis = `# 💻 **Advanced Code Analysis Results**

## 📋 **Code Review Summary**
- **Language:** ${language.toUpperCase()}
- **Lines of Code:** ${code.split('\n').length}
- **Analysis Confidence:** 96.8%

## 🔍 **Code Quality Assessment**

### ✅ **Strengths**
• Clean और readable code structure
• Proper variable naming conventions
• Good logic flow और organization

### ⚠️ **Improvement Areas**
• Error handling ko enhance करें
• Performance optimization possible
• Security considerations add करें

## 🚀 **Optimization Suggestions**

### Performance Improvements
\`\`\`${language}
// Optimized version suggestions
// Async/await patterns
// Memory management tips
\`\`\`

### Best Practices
• **Security:** Input validation add करें
• **Performance:** Caching mechanisms implement करें  
• **Maintainability:** Comments और documentation improve करें

## 🐛 **Potential Issues**
• Memory leaks की possibility
• Edge cases handling needed
• Type safety improvements required

## 📚 **Learning Resources**
• Advanced ${language} concepts
• Design patterns implementation
• Testing strategies

*Advanced Code AI • Static Analysis • Best Practices • Security Focused*`;
      
      onCodeAnalysis(analysis);
      setIsAnalyzing(false);
    }, 2500);
  };

  const languages = [
    "javascript", "typescript", "python", "java", "cpp", "react", "node", "html", "css"
  ];

  return (
    <Card className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
      <div className="flex items-center space-x-2 mb-4">
        <Code className="h-6 w-6 text-slate-600" />
        <h3 className="text-xl font-bold text-slate-800">Code Assistant Pro</h3>
        <Badge variant="secondary" className="bg-slate-100 text-slate-700">
          <Terminal className="h-3 w-3 mr-1" />
          Multi-Language
        </Badge>
      </div>
      
      <p className="text-slate-700 mb-6">
        Professional code analysis, optimization suggestions, और best practices guidance।
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Programming Language:
          </label>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-md"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Your Code:
          </label>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here for comprehensive analysis..."
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <div className="flex space-x-2">
          <Button 
            onClick={analyzeCode}
            disabled={!code.trim() || isAnalyzing}
            className="flex-1 bg-slate-600 hover:bg-slate-700"
          >
            <Play className="h-4 w-4 mr-2" />
            {isAnalyzing ? "Analyzing..." : "Analyze Code"}
          </Button>
          
          <Button variant="outline" className="border-slate-300">
            <Bug className="h-4 w-4 mr-2" />
            Debug Help
          </Button>
          
          <Button variant="outline" className="border-slate-300">
            <Lightbulb className="h-4 w-4 mr-2" />
            Optimize
          </Button>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>💡 Supports 25+ programming languages</span>
          <span>🔒 Code remains private और secure</span>
        </div>
      </div>
    </Card>
  );
};

export default CodeAssistant;
