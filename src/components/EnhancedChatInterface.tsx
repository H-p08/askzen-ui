
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Mic, Image, FileText, Zap, Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

interface EnhancedChatInterfaceProps {
  selectedSubject: string;
  onChatResponse: (response: string) => void;
}

const EnhancedChatInterface = ({ selectedSubject, onChatResponse }: EnhancedChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `नमस्ते! मैं आपका ${selectedSubject} specialized AI assistant हूँ। आज किस तरह से help कर सकता हूँ? 🚀`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatMode, setChatMode] = useState("expert");
  const [isTyping, setIsTyping] = useState(false);

  const chatModes = [
    { id: "expert", name: "Expert Mode", emoji: "🎓", desc: "Advanced detailed responses" },
    { id: "simple", name: "Simple Mode", emoji: "😊", desc: "Easy to understand answers" },
    { id: "creative", name: "Creative Mode", emoji: "🎨", desc: "Innovative and creative solutions" },
    { id: "tutor", name: "Tutor Mode", emoji: "👨‍🏫", desc: "Step-by-step teaching approach" }
  ];

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response based on mode
    setTimeout(() => {
      const responses = {
        expert: `# 🎓 **Expert Analysis**\n\n**Query:** ${inputMessage}\n\n## Professional Response\n\nयह एक comprehensive और detailed analysis है आपके प्रश्न का। ${selectedSubject} के context में expert-level insights provide करता हूँ।\n\n### Key Points:\n• Technical accuracy के साथ detailed explanation\n• Industry standards और best practices\n• Advanced concepts और methodologies\n• Real-world applications और case studies\n\n*Expert Mode: Maximum depth and precision*`,
        
        simple: `## 😊 **Simple Explanation**\n\n**आपका सवाल:** ${inputMessage}\n\n### Easy Answer:\n\nमैं आपके प्रश्न को simple और easy language में explain करता हूँ। ${selectedSubject} के basics को समझना आसान बनाता हूँ।\n\n**मुख्य बातें:**\n✅ Simple और clear explanation\n✅ Step-by-step breakdown\n✅ Easy examples और analogies\n✅ No complex terminology\n\n*Simple Mode: Easy to understand for everyone*`,
        
        creative: `# 🎨 **Creative Solution**\n\n**Challenge:** ${inputMessage}\n\n## Innovative Approach\n\nआपके प्रश्न के लिए creative और innovative solutions present करता हूँ। ${selectedSubject} में out-of-the-box thinking apply करते हैं।\n\n### Creative Elements:\n🌟 Unique perspectives और approaches\n🎯 Innovative problem-solving methods\n💡 Creative examples और analogies\n🚀 Future-oriented thinking\n\n*Creative Mode: Innovation meets knowledge*`,
        
        tutor: `# 👨‍🏫 **Tutor Mode - Step by Step**\n\n**Learning Objective:** ${inputMessage}\n\n## Teaching Approach\n\nआपको step-by-step manner में समझाता हूँ, exactly जैसे एक experienced tutor करता है।\n\n### Learning Steps:\n\n**Step 1:** Foundation Building\n- Basic concepts explanation\n- Core principles understanding\n\n**Step 2:** Practical Application  \n- Examples और practice problems\n- Hands-on learning approach\n\n**Step 3:** Mastery Check\n- Knowledge assessment\n- Next steps guidance\n\n*Tutor Mode: Personalized teaching experience*`
      };

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[chatMode as keyof typeof responses],
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      onChatResponse(aiResponse.content);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-6 w-6 text-green-600" />
          <h3 className="text-xl font-bold text-green-800">Enhanced AI Chat</h3>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <Zap className="h-3 w-3 mr-1" />
            Multi-Mode
          </Badge>
        </div>
        
        <select 
          value={chatMode}
          onChange={(e) => setChatMode(e.target.value)}
          className="px-3 py-1 border border-green-300 rounded-md text-sm"
        >
          {chatModes.map(mode => (
            <option key={mode.id} value={mode.id}>
              {mode.emoji} {mode.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 p-2 bg-green-100 rounded-lg">
        <p className="text-sm text-green-700">
          <strong>Current Mode:</strong> {chatModes.find(m => m.id === chatMode)?.emoji} {chatModes.find(m => m.id === chatMode)?.desc}
        </p>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="h-96 mb-4 border rounded-lg bg-white p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <div className="flex items-center space-x-2 mb-1">
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                  <span className="text-xs opacity-75">
                    {message.timestamp.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4" />
                  <span className="text-sm">AI typing...</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className="flex space-x-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          className="flex-1"
        />
        <Button onClick={sendMessage} disabled={!inputMessage.trim()}>
          <Send className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="border-green-300">
          <Mic className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="border-green-300">
          <Image className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between mt-4 text-xs text-green-600">
        <span>💬 Context-aware conversations</span>
        <span>🎯 {selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)} specialized</span>
      </div>
    </Card>
  );
};

export default EnhancedChatInterface;
