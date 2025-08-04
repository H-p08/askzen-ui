
import { useState, useRef } from "react";
import { Search, Upload, Mic, Camera, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface SearchAreaProps {
  selectedSubject: string;
  onSearch: (query: string) => void;
  onImageUpload: (files: FileList) => void;
}

const SearchArea = ({ selectedSubject, onSearch, onImageUpload }: SearchAreaProps) => {
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
    } else {
      toast({
        title: "⚠️ Empty Query",
        description: "कृपया कोई प्रश्न लिखें या voice input का उपयोग करें।",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageUpload(files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleVoiceInput = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "🎤 Voice Input Not Supported",
        description: "आपका browser voice input support नहीं करता।",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsRecording(true);
      
      // Simulate voice recording for now
      setTimeout(() => {
        setIsRecording(false);
        toast({
          title: "🎤 Voice Input Complete",
          description: "Voice को text में convert कर रहे हैं...",
        });
      }, 3000);
      
    } catch (error) {
      setIsRecording(false);
      toast({
        title: "❌ Voice Input Error",
        description: "Voice input में technical issue है।",
        variant: "destructive",
      });
    }
  };

  const getSubjectInfo = () => {
    const subjectMap: { [key: string]: { name: string; emoji: string; placeholder: string } } = {
      math: { 
        name: "Mathematics", 
        emoji: "📐", 
        placeholder: "गणित का प्रश्न पूछें जैसे: 'algebra solve करें', 'geometry के बारे में बताएं', या specific problem type करें..." 
      },
      science: { 
        name: "Science", 
        emoji: "🔬", 
        placeholder: "विज्ञान का प्रश्न पूछें। Physics, Chemistry, या Biology select करने के लिए ऊपर के options का उपयोग करें..." 
      },
      science_physics: { 
        name: "Physics", 
        emoji: "⚛️", 
        placeholder: "Physics का प्रश्न पूछें जैसे: 'Newton के laws explain करें', 'energy conservation क्या है?'..." 
      },
      science_chemistry: { 
        name: "Chemistry", 
        emoji: "🧪", 
        placeholder: "Chemistry का प्रश्न पूछें जैसे: 'atomic structure समझाएं', 'chemical reactions के types?'..." 
      },
      science_biology: { 
        name: "Biology", 
        emoji: "🧬", 
        placeholder: "Biology का प्रश्न पूछें जैसे: 'cell structure क्या है?', 'photosynthesis process explain करें'..." 
      },
      english: { 
        name: "English", 
        emoji: "📖", 
        placeholder: "English का प्रश्न पूछें जैसे: 'grammar rules', 'essay writing tips', 'vocabulary building'..." 
      },
      reasoning: { 
        name: "Reasoning", 
        emoji: "🧮", 
        placeholder: "Logical reasoning का प्रश्न पूछें जैसे: 'puzzle solve करें', 'critical thinking tips'..." 
      },
      geography: { 
        name: "Geography", 
        emoji: "🌍", 
        placeholder: "Geography का प्रश्न पूछें जैसे: 'world maps', 'climate zones', 'countries और capitals'..." 
      },
      knowledge: { 
        name: "General Knowledge", 
        emoji: "🧠", 
        placeholder: "General knowledge का प्रश्न पूछें जैसे: 'current affairs', 'historical facts', 'general awareness'..." 
      },
      diagrams: { 
        name: "Diagrams", 
        emoji: "🖼️", 
        placeholder: "Diagram या image related प्रश्न पूछें। Images upload करके analyze भी करवा सकते हैं..." 
      }
    };

    return subjectMap[selectedSubject] || subjectMap.knowledge;
  };

  const currentSubject = getSubjectInfo();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-fade-in">
        {/* Subject Info Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <span className="text-3xl">{currentSubject.emoji}</span>
            <h2 className="text-2xl font-bold text-gray-800">{currentSubject.name}</h2>
          </div>
          <p className="text-sm text-gray-600">Enhanced AI के साथ comprehensive answers पाएं</p>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={currentSubject.placeholder}
            className="min-h-[120px] pr-16 text-base leading-relaxed resize-none border-2 border-gray-200 focus:border-primary rounded-xl"
          />
          <div className="absolute bottom-3 right-3 flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceInput}
              disabled={isRecording}
              className={`p-2 hover:bg-blue-50 ${isRecording ? 'animate-pulse bg-red-50 text-red-600' : ''}`}
              title="Voice Input"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleSearch}
              disabled={!query.trim()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Search className="h-4 w-4 mr-2" />
              Search & Analyze
            </Button>

            <Button
              variant="outline"
              onClick={triggerFileUpload}
              className="border-2 border-green-300 text-green-700 hover:bg-green-50 transform hover:scale-105 transition-all duration-200"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </Button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*,.pdf,.doc,.docx"
              multiple
              className="hidden"
            />
          </div>

          {/* Quick Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuery("इस topic के बारे में detail में बताएं")}
              className="text-xs bg-gray-50 hover:bg-gray-100"
            >
              📚 Detail में बताएं
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuery("इसे step by step समझाएं")}
              className="text-xs bg-gray-50 hover:bg-gray-100"
            >
              📝 Step by Step
            </Button>
          </div>
        </div>

        {/* Features Info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <Camera className="h-4 w-4 text-blue-500" />
              <span>Image Analysis Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileImage className="h-4 w-4 text-green-500" />
              <span>Multiple File Formats</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mic className="h-4 w-4 text-purple-500" />
              <span>Voice Input Ready</span>
            </div>
          </div>
        </div>

        {/* Recording Status */}
        {isRecording && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center animate-pulse">
            <div className="text-red-600 font-semibold">🎤 Recording in Progress...</div>
            <div className="text-red-500 text-sm">Speak clearly into your microphone</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchArea;
