
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Shield, User, Crown, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AskZen PDF Hub
                </h1>
                <p className="text-sm text-muted-foreground">
                  Smart PDF Access & Telegram Bot
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              Enhanced AI
            </Badge>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Telegram Channel Link */}
            <Button 
              variant="outline" 
              size="sm"
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <Send className="h-4 w-4 mr-2" />
              Join Channel
            </Button>
            
            {/* User Profile */}
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            
            {/* Admin Panel Access - Prominent placement */}
            <Link to="/admin">
              <Button 
                variant="outline" 
                size="sm"
                className="border-orange-300 text-orange-700 hover:bg-orange-50 font-semibold"
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin Panel
              </Button>
            </Link>
            
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
