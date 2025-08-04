
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AdminStats from "./AdminStats";
import AdminUsers from "./AdminUsers";
import AdminQuestions from "./AdminQuestions";
import AdminSettings from "./AdminSettings";
import PremiumAdmin from "./premium/PremiumAdmin";
import { Shield, LogOut, BarChart, Crown, Bot } from "lucide-react";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">AskZen PDF Hub Management Panel</p>
              </div>
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                Enhanced
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-green-700 border-green-300">
                🟢 System Online
              </Badge>
              <Button 
                onClick={onLogout}
                variant="outline"
                className="hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center space-x-2">
              <BarChart className="h-4 w-4" />
              <span>Questions</span>
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center space-x-2">
              <Crown className="h-4 w-4" />
              <span>Premium & PDFs</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminStats />
          </TabsContent>

          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>

          <TabsContent value="questions">
            <AdminQuestions />
          </TabsContent>

          <TabsContent value="premium">
            <PremiumAdmin />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="text-center py-12">
              <BarChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                Advanced Analytics Dashboard
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Detailed analytics with PDF downloads, Telegram bot stats, and user engagement metrics
              </p>
              <Badge variant="outline" className="text-blue-600 border-blue-300">
                <Bot className="h-4 w-4 mr-2" />
                Coming soon with Supabase integration
              </Badge>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
