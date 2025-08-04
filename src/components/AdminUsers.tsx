
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  MapPin,
  Activity
} from "lucide-react";

// Mock user session data
const mockSessions = [
  {
    id: 1,
    sessionId: "sess_001",
    startTime: "2024-01-10 14:30:00",
    duration: "5m 23s",
    questions: 3,
    subject: "Math",
    device: "Desktop",
    location: "Mumbai, India",
    status: "active"
  },
  {
    id: 2,
    sessionId: "sess_002", 
    startTime: "2024-01-10 14:25:00",
    duration: "12m 45s",
    questions: 7,
    subject: "Science",
    device: "Mobile",
    location: "Delhi, India",
    status: "completed"
  },
  {
    id: 3,
    sessionId: "sess_003",
    startTime: "2024-01-10 14:20:00", 
    duration: "3m 12s",
    questions: 2,
    subject: "English",
    device: "Tablet",
    location: "Bangalore, India",
    status: "completed"
  },
  {
    id: 4,
    sessionId: "sess_004",
    startTime: "2024-01-10 14:15:00",
    duration: "8m 56s", 
    questions: 4,
    subject: "Geography",
    device: "Desktop",
    location: "Kolkata, India",
    status: "completed"
  },
  {
    id: 5,
    sessionId: "sess_005",
    startTime: "2024-01-10 14:10:00",
    duration: "2m 18s",
    questions: 1,
    subject: "Math",
    device: "Mobile",
    location: "Chennai, India", 
    status: "completed"
  }
];

const AdminUsers = () => {
  const [sessions, setSessions] = useState(mockSessions);

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "Desktop": return <Monitor className="h-4 w-4" />;
      case "Mobile": return <Smartphone className="h-4 w-4" />;
      case "Tablet": return <Monitor className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      "Math": "bg-blue-100 text-blue-800",
      "Science": "bg-green-100 text-green-800",
      "English": "bg-purple-100 text-purple-800", 
      "Geography": "bg-orange-100 text-orange-800",
      "Reasoning": "bg-pink-100 text-pink-800"
    };
    return colors[subject] || "bg-gray-100 text-gray-800";
  };

  // Calculate stats
  const totalSessions = sessions.length;
  const activeSessions = sessions.filter(s => s.status === "active").length;
  const avgQuestions = Math.round(sessions.reduce((acc, s) => acc + s.questions, 0) / sessions.length);
  const deviceBreakdown = sessions.reduce((acc, s) => {
    acc[s.device] = (acc[s.device] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">User Analytics</h2>
        <p className="text-muted-foreground">Monitor user sessions and behavior</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
              <p className="text-2xl font-bold">{totalSessions}</p>
              <p className="text-sm text-green-600">Today</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6 glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Now</p>
              <p className="text-2xl font-bold">{activeSessions}</p>
              <p className="text-sm text-green-600">Live users</p>
            </div>
            <Activity className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6 glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Questions</p>
              <p className="text-2xl font-bold">{avgQuestions}</p>
              <p className="text-sm text-purple-600">Per session</p>
            </div>
            <Globe className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6 glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Mobile Users</p>
              <p className="text-2xl font-bold">{deviceBreakdown.Mobile || 0}</p>
              <p className="text-sm text-orange-600">vs {deviceBreakdown.Desktop || 0} desktop</p>
            </div>
            <Smartphone className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Sessions Table */}
      <Card className="glass-card">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Recent Sessions</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Session ID</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Subject Focus</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-mono text-sm">
                    {session.sessionId}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      {new Date(session.startTime).toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {session.duration}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{session.questions}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSubjectColor(session.subject)}>
                      {session.subject}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getDeviceIcon(session.device)}
                      <span className="ml-2 text-sm">{session.device}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {session.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(session.status)}>
                      {session.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default AdminUsers;
