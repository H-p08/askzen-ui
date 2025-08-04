
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle,
  Users,
  Send,
  Calendar,
  TrendingUp,
  FileText,
  Image,
  Video,
  Link as LinkIcon
} from "lucide-react";

const TelegramChannel = () => {
  const { toast } = useToast();
  const [postContent, setPostContent] = useState({
    message: '',
    mediaType: 'text',
    scheduledTime: ''
  });

  const [channelStats, setChannelStats] = useState({
    totalMembers: 5420,
    activeMembers: 1250,
    postsToday: 8,
    engagement: 85,
    growth: 12.5
  });

  const [recentPosts, setRecentPosts] = useState([
    {
      id: 1,
      content: "🔥 New Math PDFs uploaded for Class 10th! Algebra and Geometry chapters now available.",
      timestamp: "2 hours ago",
      views: 1250,
      reactions: 89,
      type: "pdf"
    },
    {
      id: 2,
      content: "📚 Science PDFs for Class 9th - Physics, Chemistry, Biology complete solution sets.",
      timestamp: "5 hours ago",
      views: 980,
      reactions: 65,
      type: "pdf"
    },
    {
      id: 3,
      content: "🎯 Join our premium bot for instant PDF access: @AskZenPDFBot",
      timestamp: "1 day ago",
      views: 2100,
      reactions: 145,
      type: "promotion"
    }
  ]);

  const sendPost = () => {
    if (!postContent.message.trim()) {
      toast({
        title: "❌ Message Required",
        description: "Please enter your message content.",
        variant: "destructive"
      });
      return;
    }

    const newPost = {
      id: recentPosts.length + 1,
      content: postContent.message,
      timestamp: "Just now",
      views: 0,
      reactions: 0,
      type: postContent.mediaType
    };

    setRecentPosts(prev => [newPost, ...prev]);
    setPostContent({ message: '', mediaType: 'text', scheduledTime: '' });
    
    toast({
      title: "✅ Post Published",
      description: "Your message has been sent to the channel!"
    });
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-4 w-4 text-red-500" />;
      case 'image': return <Image className="h-4 w-4 text-blue-500" />;
      case 'video': return <Video className="h-4 w-4 text-purple-500" />;
      default: return <MessageCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Telegram Channel</h2>
            <p className="text-muted-foreground">Manage your PDF distribution channel</p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-800">
          @AskZenPDFChannel
        </Badge>
      </div>

      {/* Channel Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4 glass-card">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-blue-500" />
            <div>
              <p className="text-lg font-bold">{channelStats.totalMembers.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Members</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 glass-card">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-lg font-bold">{channelStats.activeMembers.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Active Members</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 glass-card">
          <div className="flex items-center space-x-3">
            <Send className="h-6 w-6 text-purple-500" />
            <div>
              <p className="text-lg font-bold">{channelStats.postsToday}</p>
              <p className="text-xs text-muted-foreground">Posts Today</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 glass-card">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-orange-500" />
            <div>
              <p className="text-lg font-bold">{channelStats.engagement}%</p>
              <p className="text-xs text-muted-foreground">Engagement</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 glass-card">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-6 w-6 text-red-500" />
            <div>
              <p className="text-lg font-bold">+{channelStats.growth}%</p>
              <p className="text-xs text-muted-foreground">Growth Rate</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Post Creation */}
        <Card className="p-6 glass-card lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Create New Post</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Message Content</Label>
              <Textarea
                placeholder="Enter your channel message..."
                value={postContent.message}
                onChange={(e) => setPostContent(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Media Type</Label>
                <select
                  className="w-full p-2 border rounded-md bg-background"
                  value={postContent.mediaType}
                  onChange={(e) => setPostContent(prev => ({ ...prev, mediaType: e.target.value }))}
                >
                  <option value="text">Text Only</option>
                  <option value="pdf">PDF Document</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label>Schedule (Optional)</Label>
                <Input
                  type="datetime-local"
                  value={postContent.scheduledTime}
                  onChange={(e) => setPostContent(prev => ({ ...prev, scheduledTime: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={sendPost} className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 glass-card">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <LinkIcon className="h-4 w-4 mr-2" />
              Generate Invite Link
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Member Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Bulk PDF Upload
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              Growth Reports
            </Button>
          </div>
          
          {/* Channel Info */}
          <div className="mt-6 p-3 bg-cyan-50 rounded-lg">
            <h4 className="font-medium text-cyan-800 mb-2">Channel Info</h4>
            <div className="text-sm text-cyan-700 space-y-1">
              <p>🔗 @AskZenPDFChannel</p>
              <p>📱 t.me/AskZenPDFChannel</p>
              <p>📊 Public Channel</p>
              <p>🎯 Educational Content</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Posts */}
      <Card className="p-6 glass-card">
        <h3 className="text-lg font-semibold mb-4">Recent Channel Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg bg-background/50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getPostIcon(post.type)}
                  <span className="text-sm font-medium">Channel Post</span>
                </div>
                <span className="text-sm text-muted-foreground">{post.timestamp}</span>
              </div>
              <p className="text-sm mb-3">{post.content}</p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>👀 {post.views} views</span>
                <span>❤️ {post.reactions} reactions</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TelegramChannel;
