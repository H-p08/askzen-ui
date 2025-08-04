
import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  Eye,
  ThumbsUp,
  Globe,
  Smartphone
} from "lucide-react";

// Mock data - this will be replaced with real data from Supabase
const dailyStats = [
  { date: "Mon", questions: 45, users: 23 },
  { date: "Tue", questions: 52, users: 31 },
  { date: "Wed", questions: 38, users: 18 },
  { date: "Thu", questions: 61, users: 42 },
  { date: "Fri", questions: 73, users: 55 },
  { date: "Sat", questions: 29, users: 16 },
  { date: "Sun", questions: 34, users: 21 }
];

const subjectData = [
  { name: "Math", value: 35, color: "#8B5CF6" },
  { name: "Science", value: 28, color: "#06B6D4" },
  { name: "English", value: 20, color: "#10B981" },
  { name: "Other", value: 17, color: "#F59E0B" }
];

const AdminStats = () => {
  const stats = [
    {
      title: "Total Questions",
      value: "1,234",
      change: "+12%",
      icon: MessageSquare,
      color: "text-blue-600"
    },
    {
      title: "Active Users",
      value: "567",
      change: "+8%", 
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Avg Response Time",
      value: "2.3s",
      change: "-5%",
      icon: Clock,
      color: "text-purple-600"
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+2%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 glass-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${
                  stat.change.startsWith('+') ? 'text-green-600' : 
                  stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change} from last week
                </p>
              </div>
              <div className={`p-3 rounded-full bg-background/50 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Activity */}
        <Card className="p-6 glass-card">
          <h3 className="text-lg font-semibold mb-4">Daily Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="questions" fill="#8B5CF6" name="Questions" />
              <Bar dataKey="users" fill="#06B6D4" name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Subject Distribution */}
        <Card className="p-6 glass-card">
          <h3 className="text-lg font-semibold mb-4">Subject Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={subjectData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 glass-card">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { time: "2 min ago", action: "New question asked", subject: "Math", user: "Anonymous" },
            { time: "5 min ago", action: "Answer generated", subject: "Science", user: "Anonymous" },
            { time: "12 min ago", action: "Image uploaded", subject: "Diagrams", user: "Anonymous" },
            { time: "18 min ago", action: "Question regenerated", subject: "English", user: "Anonymous" },
            { time: "25 min ago", action: "Feedback submitted", subject: "Math", user: "Anonymous" }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-border/50 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.subject} • {activity.user}
                  </p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminStats;
