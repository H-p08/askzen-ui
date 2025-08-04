
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Bot,
  Send,
  Users,
  MessageCircle,
  Settings,
  Shield,
  Zap,
  Link as LinkIcon
} from "lucide-react";

const TelegramBot = () => {
  const { toast } = useToast();
  const [botSettings, setBotSettings] = useState({
    botToken: '',
    botUsername: '@AskZenPDFBot',
    isActive: false,
    autoReply: true,
    pdfDelivery: true,
    paymentIntegration: true
  });

  const [channelSettings, setChannelSettings] = useState({
    channelId: '@AskZenPDFChannel',
    channelName: 'AskZen PDF Hub',
    memberCount: 1250,
    isPublic: true
  });

  const [botStats, setBotStats] = useState({
    totalUsers: 2543,
    activeToday: 145,
    messagesProcessed: 8924,
    pdfsDelivered: 1567
  });

  const handleBotToggle = (enabled: boolean) => {
    setBotSettings(prev => ({ ...prev, isActive: enabled }));
    toast({
      title: enabled ? "🤖 Bot Activated" : "⏸️ Bot Deactivated",
      description: enabled ? "Telegram bot is now active and ready!" : "Telegram bot has been paused."
    });
  };

  const saveBotToken = () => {
    if (!botSettings.botToken.trim()) {
      toast({
        title: "❌ Token Required",
        description: "Please enter your Telegram bot token.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "✅ Bot Token Saved",
      description: "Telegram bot has been configured successfully."
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Telegram Integration</h2>
            <p className="text-muted-foreground">Manage bot and channel settings</p>
          </div>
        </div>
        <Badge 
          variant={botSettings.isActive ? "default" : "secondary"}
          className={botSettings.isActive ? "bg-green-500" : ""}
        >
          {botSettings.isActive ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 glass-card">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{botStats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 glass-card">
          <div className="flex items-center space-x-3">
            <Zap className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{botStats.activeToday}</p>
              <p className="text-sm text-muted-foreground">Active Today</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 glass-card">
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold">{botStats.messagesProcessed.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Messages</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 glass-card">
          <div className="flex items-center space-x-3">
            <Send className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold">{botStats.pdfsDelivered.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">PDFs Delivered</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bot Configuration */}
        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-2 mb-4">
            <Bot className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Bot Configuration</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Bot Status</Label>
                <p className="text-sm text-muted-foreground">Enable/disable the bot</p>
              </div>
              <Switch
                checked={botSettings.isActive}
                onCheckedChange={handleBotToggle}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Bot Token</Label>
              <div className="flex space-x-2">
                <Input
                  type="password"
                  placeholder="Enter your Telegram bot token"
                  value={botSettings.botToken}
                  onChange={(e) => setBotSettings(prev => ({ ...prev, botToken: e.target.value }))}
                />
                <Button onClick={saveBotToken}>Save</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Bot Username</Label>
              <Input
                value={botSettings.botUsername}
                onChange={(e) => setBotSettings(prev => ({ ...prev, botUsername: e.target.value }))}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Auto Reply</Label>
                <Switch
                  checked={botSettings.autoReply}
                  onCheckedChange={(checked) => setBotSettings(prev => ({ ...prev, autoReply: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>PDF Delivery</Label>
                <Switch
                  checked={botSettings.pdfDelivery}
                  onCheckedChange={(checked) => setBotSettings(prev => ({ ...prev, pdfDelivery: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Payment Integration</Label>
                <Switch
                  checked={botSettings.paymentIntegration}
                  onCheckedChange={(checked) => setBotSettings(prev => ({ ...prev, paymentIntegration: checked }))}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Channel Management */}
        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-2 mb-4">
            <MessageCircle className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Channel Management</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Channel ID</Label>
              <Input
                value={channelSettings.channelId}
                onChange={(e) => setChannelSettings(prev => ({ ...prev, channelId: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Channel Name</Label>
              <Input
                value={channelSettings.channelName}
                onChange={(e) => setChannelSettings(prev => ({ ...prev, channelName: e.target.value }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Public Channel</Label>
                <p className="text-sm text-muted-foreground">Make channel discoverable</p>
              </div>
              <Switch
                checked={channelSettings.isPublic}
                onCheckedChange={(checked) => setChannelSettings(prev => ({ ...prev, isPublic: checked }))}
              />
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Channel Stats</span>
              </div>
              <p className="text-sm text-blue-700">
                {channelSettings.memberCount.toLocaleString()} members
              </p>
              <Button size="sm" variant="outline" className="mt-2 w-full">
                <LinkIcon className="h-4 w-4 mr-2" />
                Generate Invite Link
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 glass-card">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button variant="outline" className="justify-start">
            <Send className="h-4 w-4 mr-2" />
            Send Broadcast Message
          </Button>
          <Button variant="outline" className="justify-start">
            <Shield className="h-4 w-4 mr-2" />
            Manage Bot Permissions
          </Button>
          <Button variant="outline" className="justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Bot Commands Setup
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TelegramBot;
