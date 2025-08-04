
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, User } from "lucide-react";

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // For now, we'll use a simple hardcoded check
  // This will be replaced with Supabase authentication
  const ADMIN_EMAIL = "admin@askzen.com";
  const ADMIN_PASSWORD = "admin123";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin panel!",
        });
        onLogin(true);
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
        onLogin(false);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md p-8 glass-card">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">Sign in to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Demo credentials:</p>
          <p>Email: admin@askzen.com</p>
          <p>Password: admin123</p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
