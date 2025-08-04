
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings,
  Database,
  Shield,
  Bell,
  Palette,
  Save,
  RefreshCw
} from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: "AskZen",
    siteDescription: "AI Question Solving Platform",
    enableAnalytics: true,
    enableNotifications: true,
    maxQuestionsPerHour: 100,
    responseTimeout: 30,
    maintenanceMode: false,
    allowImageUpload: true,
    maxFileSize: "10",
    welcomeMessage: "Welcome to AskZen! Ask me anything about academics."
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save delay
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings Saved",
        description: "Your changes have been saved successfully.",
      });
    }, 1500);
  };

  const handleReset = () => {
    setSettings({
      siteName: "AskZen",
      siteDescription: "AI Question Solving Platform", 
      enableAnalytics: true,
      enableNotifications: true,
      maxQuestionsPerHour: 100,
      responseTimeout: 30,
      maintenanceMode: false,
      allowImageUpload: true,
      maxFileSize: "10",
      welcomeMessage: "Welcome to AskZen! Ask me anything about academics."
    });
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to defaults.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-muted-foreground">Configure your admin panel and website settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="h-5 w-5" />
            <h3 className="text-lg font-semibold">General Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="welcomeMessage">Welcome Message</Label>
              <Textarea
                id="welcomeMessage"
                value={settings.welcomeMessage}
                onChange={(e) => setSettings({...settings, welcomeMessage: e.target.value})}
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* System Settings */}
        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-2 mb-4">
            <Database className="h-5 w-5" />
            <h3 className="text-lg font-semibold">System Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxQuestions">Max Questions per Hour</Label>
              <Input
                id="maxQuestions"
                type="number"
                value={settings.maxQuestionsPerHour}
                onChange={(e) => setSettings({...settings, maxQuestionsPerHour: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responseTimeout">Response Timeout (seconds)</Label>
              <Input
                id="responseTimeout"
                type="number"
                value={settings.responseTimeout}
                onChange={(e) => setSettings({...settings, responseTimeout: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => setSettings({...settings, maxFileSize: e.target.value})}
              />
            </div>
          </div>
        </Card>

        {/* Security & Privacy */}
        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Security & Privacy</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Analytics</Label>
                <p className="text-sm text-muted-foreground">Track user behavior and site usage</p>
              </div>
              <Switch
                checked={settings.enableAnalytics}
                onCheckedChange={(checked) => setSettings({...settings, enableAnalytics: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Temporarily disable public access</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Image Upload</Label>
                <p className="text-sm text-muted-foreground">Enable users to upload images</p>
              </div>
              <Switch
                checked={settings.allowImageUpload}
                onCheckedChange={(checked) => setSettings({...settings, allowImageUpload: checked})}
              />
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6 glass-card">
          <div className="flex items-center space-x-2 mb-4">
            <Bell className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive admin notifications</p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => setSettings({...settings, enableNotifications: checked})}
              />
            </div>
            <div className="space-y-2">
              <Label>Notification Email</Label>
              <Input
                type="email"
                placeholder="admin@askzen.com"
                disabled
                className="bg-muted/50"
              />
              <p className="text-xs text-muted-foreground">
                This will be configurable with Supabase authentication
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Database Status */}
      <Card className="p-6 glass-card">
        <div className="flex items-center space-x-2 mb-4">
          <Database className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Database Status</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border">
            <p className="text-2xl font-bold text-green-600">Connected</p>
            <p className="text-sm text-green-600">Supabase Database</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border">
            <p className="text-2xl font-bold text-blue-600">1,234</p>
            <p className="text-sm text-blue-600">Total Records</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border">
            <p className="text-2xl font-bold text-purple-600">45ms</p>
            <p className="text-sm text-purple-600">Avg Response</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminSettings;
