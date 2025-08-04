
import { BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative p-2 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg">
              <BookOpen className="h-7 w-7 text-white" />
              <Sparkles className="h-3 w-3 text-yellow-300 absolute -top-1 -right-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AskZen Pro
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                Enhanced AI Learning Platform
              </span>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground/80 hover:text-primary transition-all duration-200 font-medium hover:scale-105 transform">
              🏠 Home
            </a>
            <a href="#" className="text-foreground/80 hover:text-secondary transition-all duration-200 font-medium hover:scale-105 transform">
              📚 Subjects
            </a>
            <a href="#" className="text-foreground/80 hover:text-accent transition-all duration-200 font-medium hover:scale-105 transform">
              💡 Features
            </a>
            <a href="/admin" className="text-foreground/80 hover:text-destructive transition-all duration-200 font-medium hover:scale-105 transform">
              ⚙️ Admin
            </a>
          </nav>

          {/* AI Status Indicator */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-700">AI Online</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" className="md:hidden hover:bg-primary/10" size="sm">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
