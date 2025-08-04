
import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = maxHeight > 0 ? (scrolled / maxHeight) * 100 : 0;
      
      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };

    const throttledToggleVisibility = throttle(toggleVisibility, 16); // 60fps
    window.addEventListener('scroll', throttledToggleVisibility, { passive: true });

    return () => window.removeEventListener('scroll', throttledToggleVisibility);
  }, []);

  const scrollToTop = () => {
    const scrollToTopSmoothly = () => {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, currentScroll - currentScroll / 8);
        requestAnimationFrame(scrollToTopSmoothly);
      }
    };
    scrollToTopSmoothly();
  };

  function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return function(this: any, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  if (!isVisible) return null;

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-8 right-8 z-50 group">
      <div className="relative">
        {/* Progress Circle Background */}
        <svg 
          className="w-12 h-12 transform -rotate-90 absolute inset-0" 
          viewBox="0 0 40 40"
          aria-hidden="true"
        >
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-primary transition-all duration-200 ease-out"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Main Button */}
        <Button
          onClick={scrollToTop}
          size="icon"
          className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-primary shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 active:scale-95"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </Button>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 pointer-events-none">
        <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
          <div className="font-medium">Top पर जाएं</div>
          <div className="text-xs opacity-75">{Math.round(scrollProgress)}% scrolled</div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900 dark:border-t-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollToTopButton;
