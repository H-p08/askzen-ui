
import { useState, useEffect } from 'react';

interface ProfessionalLoaderProps {
  message?: string;
  showProgress?: boolean;
}

const ProfessionalLoader = ({ 
  message = "Professional AI processing your query...", 
  showProgress = true 
}: ProfessionalLoaderProps) => {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    if (showProgress) {
      const progressInterval = setInterval(() => {
        setProgress(prev => prev >= 100 ? 0 : prev + 2);
      }, 100);
      
      return () => {
        clearInterval(dotsInterval);
        clearInterval(progressInterval);
      };
    }

    return () => clearInterval(dotsInterval);
  }, [showProgress]);

  const thinkingMessages = [
    "🧠 Analyzing your question with advanced AI...",
    "📚 Processing knowledge from multiple sources...", 
    "🔍 Generating comprehensive response...",
    "✨ Finalizing professional answer..."
  ];

  const currentMessage = thinkingMessages[Math.floor((progress / 25) % thinkingMessages.length)];

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      {/* Main Loader Animation */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-20 h-20 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
        </div>
        
        {/* Progress ring */}
        {showProgress && (
          <svg className="absolute inset-0 w-20 h-20 transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="30"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="40"
              cy="40"
              r="30"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 30}`}
              strokeDashoffset={`${2 * Math.PI * 30 * (1 - progress / 100)}`}
              className="text-secondary transition-all duration-300"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold text-gray-800">
          {message}{dots}
        </div>
        
        {showProgress && (
          <div className="text-sm text-primary font-medium">
            {currentMessage}
          </div>
        )}
        
        {showProgress && (
          <div className="text-xs text-gray-500">
            Processing: {progress}%
          </div>
        )}
      </div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-bounce"
            style={{
              left: `${20 + i * 12}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfessionalLoader;
