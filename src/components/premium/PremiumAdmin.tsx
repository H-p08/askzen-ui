
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Crown,
  FileText,
  Upload,
  Trash2,
  Settings,
  Star,
  DollarSign,
  Users
} from "lucide-react";

interface PremiumContent {
  id: string;
  name: string;
  type: 'pdf' | 'content' | 'feature';
  isPremium: boolean;
  price?: number;
  description: string;
}

const PremiumAdmin = () => {
  const { toast } = useToast();
  const [premiumSettings, setPremiumSettings] = useState({
    enablePremium: true,
    monthlyPrice: 299,
    yearlyPrice: 2999,
    trialDays: 7,
    maxFreeQuestions: 10
  });

  const [premiumContent, setPremiumContent] = useState<PremiumContent[]>([
    {
      id: '1',
      name: 'Advanced Math Solutions',
      type: 'pdf',
      isPremium: true,
      price: 199,
      description: 'Complete calculus and advanced algebra solutions'
    },
    {
      id: '2',
      name: 'Science Lab Manual',
      type: 'pdf',
      isPremium: true,
      price: 149,
      description: 'Detailed physics, chemistry, biology experiments'
    },
    {
      id: '3',
      name: 'Enhanced AI Responses',
      type: 'feature',
      isPremium: true,
      price: 99,
      description: 'Unlimited questions with detailed explanations'
    }
  ]);

  const [newContent, setNewContent] = useState({
    name: '',
    type: 'pdf' as 'pdf' | 'content' | 'feature',
    description: '',
    price: 0
  });

  const handleSettingsChange = (key: string, value: any) => {
    setPremiumSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: "✅ Settings Updated",
      description: "Premium settings have been updated successfully."
    });
  };

  const togglePremiumStatus = (id: string) => {
    setPremiumContent(prev => prev.map(item =>
      item.id === id ? { ...item, isPremium: !item.isPremium } : item
    ));
    
    toast({
      title: "🔄 Status Updated",
      description: "Premium status has been toggled."
    });
  };

  const addPremiumContent = () => {
    if (!newContent.name.trim()) {
      toast({
        title: "❌ Name Required",
        description: "Please enter a name for the premium content.",
        variant: "destructive"
      });
      return;
    }

    const content: PremiumContent = {
      id: Date.now().toString(),
      name: newContent.name,
      type: newContent.type,
      isPremium: true,
      price: newContent.price,
      description: newContent.description
    };

    setPremiumContent(prev => [...prev, content]);
    setNewContent({ name: '', type: 'pdf', description: '', price: 0 });
    
    toast({
      title: "✅ Content Added",
      description: "New premium content has been added successfully."
    });
  };

  const deletePremiumContent = (id: string) => {
    setPremiumContent(prev => prev.filter(item => item.id !== id));
    toast({
      title: "🗑️ Content Deleted",
      description: "Premium content has been removed."
    });
  };

  const premiumStats = {
    totalContent: premiumContent.length,
    activeContent: premiumContent.filter(item => item.isPremium).length,
    totalRevenue: premiumContent
      .filter(item => item.isPremium)
      .reduce((sum, item) => sum + (item.price || 0), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Premium Management</h2>
            <p className="text-muted-foreground">Manage premium features and content</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{premiumStats.totalContent}</p>
              <p className="text-sm text-muted-foreground">Total Content</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-3">
            <Star className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold">{premiumStats.activeContent}</p>
              <p className="text-sm text-muted-foreground">Active Premium</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-3">
            <DollarSign className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold">₹{premiumStats.totalRevenue}</p>
              <p className="text-sm text-muted-foreground">Potential Revenue</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Premium Settings */}
        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Premium Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Premium Features</Label>
                <p className="text-sm text-muted-foreground">Allow premium subscriptions</p>
              </div>
              <Switch
                checked={premiumSettings.enablePremium}
                onCheckedChange={(checked) => handleSettingsChange('enablePremium', checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Monthly Price (₹)</Label>
              <Input
                type="number"
                value={premiumSettings.monthlyPrice}
                onChange={(e) => handleSettingsChange('monthlyPrice', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Yearly Price (₹)</Label>
              <Input
                type="number"
                value={premiumSettings.yearlyPrice}
                onChange={(e) => handleSettingsChange('yearlyPrice', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Free Trial Days</Label>
              <Input
                type="number"
                value={premiumSettings.trialDays}
                onChange={(e) => handleSettingsChange('trialDays', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Max Free Questions/Day</Label>
              <Input
                type="number"
                value={premiumSettings.maxFreeQuestions}
                onChange={(e) => handleSettingsChange('maxFreeQuestions', parseInt(e.target.value))}
              />
            </div>
          </div>
        </Card>

        {/* Add New Premium Content */}
        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-2 mb-4">
            <Upload className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Add Premium Content</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Content Name</Label>
              <Input
                placeholder="e.g. Advanced Physics PDF"
                value={newContent.name}
                onChange={(e) => setNewContent(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Content Type</Label>
              <select
                className="w-full p-2 border rounded-md bg-background"
                value={newContent.type}
                onChange={(e) => setNewContent(prev => ({ ...prev, type: e.target.value as any }))}
              >
                <option value="pdf">PDF Document</option>
                <option value="content">Text Content</option>
                <option value="feature">Feature Access</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                placeholder="Brief description..."
                value={newContent.description}
                onChange={(e) => setNewContent(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Price (₹)</Label>
              <Input
                type="number"
                placeholder="0"
                value={newContent.price}
                onChange={(e) => setNewContent(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
              />
            </div>
            
            <Button onClick={addPremiumContent} className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Add Premium Content
            </Button>
          </div>
        </Card>
      </div>

      {/* Premium Content List */}
      <Card className="p-6 glass-card">
        <h3 className="text-lg font-semibold mb-4">Premium Content Management</h3>
        <div className="space-y-4">
          {premiumContent.map((content) => (
            <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold">{content.name}</h4>
                  <Badge 
                    variant={content.isPremium ? "default" : "secondary"}
                    className={content.isPremium ? "bg-yellow-500" : ""}
                  >
                    {content.isPremium ? "Premium" : "Free"}
                  </Badge>
                  <Badge variant="outline">{content.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{content.description}</p>
                {content.price && content.price > 0 && (
                  <p className="text-sm font-medium text-green-600">₹{content.price}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={content.isPremium}
                  onCheckedChange={() => togglePremiumStatus(content.id)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deletePremiumContent(content.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PremiumAdmin;
