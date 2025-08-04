
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  History, 
  Search, 
  MessageSquare, 
  Trash2, 
  Download, 
  Upload,
  Plus,
  Clock,
  X,
  Filter
} from "lucide-react";
import { conversationHistoryService } from "@/services/conversationHistoryService";

interface ConversationHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  onThreadSelect: (threadId: string) => void;
  currentThreadId: string | null;
}

const ConversationHistory = ({ isOpen, onClose, onThreadSelect, currentThreadId }: ConversationHistoryProps) => {
  const [threads, setThreads] = useState(conversationHistoryService.getThreads());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setThreads(conversationHistoryService.getThreads());
    }
  }, [isOpen]);

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = searchQuery === "" || 
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.messages.some(msg => 
        msg.query.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesSubject = selectedSubject === "all" || thread.subject === selectedSubject;
    
    return matchesSearch && matchesSubject;
  });

  const handleThreadSelect = (threadId: string) => {
    conversationHistoryService.switchToThread(threadId);
    onThreadSelect(threadId);
    setThreads(conversationHistoryService.getThreads());
  };

  const handleDeleteThread = (threadId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    conversationHistoryService.deleteThread(threadId);
    setThreads(conversationHistoryService.getThreads());
    toast({
      title: "🗑️ Conversation Deleted",
      description: "Thread successfully removed from history"
    });
  };

  const handleNewConversation = () => {
    const threadId = conversationHistoryService.createNewThread("math");
    onThreadSelect(threadId);
    setThreads(conversationHistoryService.getThreads());
    onClose();
  };

  const handleExport = () => {
    const data = conversationHistoryService.exportThreads();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `askzen-conversations-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "📁 Export Complete",
      description: "Conversations exported successfully"
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result as string;
      if (conversationHistoryService.importThreads(data)) {
        setThreads(conversationHistoryService.getThreads());
        toast({
          title: "📥 Import Successful",
          description: "Conversations imported successfully"
        });
      } else {
        toast({
          title: "❌ Import Failed",
          description: "Invalid file format",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  };

  const subjects = ["all", "math", "science", "english", "reasoning", "code", "research", "creative"];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex">
      <Card className="w-96 h-full bg-background border-r border-border rounded-none animate-slide-in-right">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <History className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Conversation History</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center space-x-2 mb-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="flex-1 px-2 py-1 border rounded text-sm"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === "all" ? "All Subjects" : subject.charAt(0).toUpperCase() + subject.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button size="sm" onClick={handleNewConversation} className="flex-1">
              <Plus className="h-4 w-4 mr-1" />
              New Chat
            </Button>
            <Button size="sm" variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" asChild>
              <label>
                <Upload className="h-4 w-4" />
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </Button>
          </div>
        </div>

        {/* Conversation List */}
        <ScrollArea className="flex-1 p-4">
          {filteredThreads.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No conversations found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredThreads.map((thread) => (
                <Card
                  key={thread.id}
                  className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                    currentThreadId === thread.id ? 'bg-primary/10 border-primary' : ''
                  }`}
                  onClick={() => handleThreadSelect(thread.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate mb-1">{thread.title}</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {thread.subject}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {thread.updatedAt.toLocaleDateString('hi-IN')}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {thread.messages[0]?.query || "Empty conversation"}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => handleDeleteThread(thread.id, e)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                    <span>{thread.messages.length} messages</span>
                    <div className="flex space-x-1">
                      {thread.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </Card>
      
      {/* Overlay */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

export default ConversationHistory;
