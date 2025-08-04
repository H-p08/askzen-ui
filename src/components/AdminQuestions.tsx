
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
  Filter,
  Eye,
  Download,
  Calendar,
  Clock,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

// Mock data - will be replaced with real Supabase data
const mockQuestions = [
  {
    id: 1,
    question: "What is the quadratic formula?",
    subject: "Math",
    timestamp: "2024-01-10 14:30:00",
    responseTime: "1.2s",
    feedback: "helpful",
    status: "completed"
  },
  {
    id: 2,
    question: "Explain photosynthesis process",
    subject: "Science",
    timestamp: "2024-01-10 14:25:00",
    responseTime: "2.1s",
    feedback: "not-helpful",
    status: "completed"
  },
  {
    id: 3,
    question: "What is the meaning of this Shakespeare quote?",
    subject: "English",
    timestamp: "2024-01-10 14:20:00",
    responseTime: "3.4s",
    feedback: null,
    status: "completed"
  },
  {
    id: 4,
    question: "How to solve this calculus problem?",
    subject: "Math",
    timestamp: "2024-01-10 14:15:00",
    responseTime: "1.8s",
    feedback: "helpful",
    status: "completed"
  },
  {
    id: 5,
    question: "Explain the water cycle",
    subject: "Geography", 
    timestamp: "2024-01-10 14:10:00",
    responseTime: "2.5s",
    feedback: "helpful",
    status: "completed"
  }
];

const AdminQuestions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [questions, setQuestions] = useState(mockQuestions);

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || q.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = ["all", "Math", "Science", "English", "Geography", "Reasoning"];

  const getFeedbackIcon = (feedback: string | null) => {
    if (feedback === "helpful") return <ThumbsUp className="h-4 w-4 text-green-600" />;
    if (feedback === "not-helpful") return <ThumbsDown className="h-4 w-4 text-red-600" />;
    return <span className="text-muted-foreground">-</span>;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Questions Analytics</h2>
          <p className="text-muted-foreground">Monitor and analyze user questions</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6 glass-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {subjects.map((subject) => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSubject(subject)}
              >
                {subject === "all" ? "All Subjects" : subject}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Questions Table */}
      <Card className="glass-card">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Recent Questions ({filteredQuestions.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuestions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell className="max-w-xs">
                    <div className="truncate font-medium">
                      {question.question}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSubjectColor(question.subject)}>
                      {question.subject}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(question.timestamp).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(question.timestamp).toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {question.responseTime}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getFeedbackIcon(question.feedback)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
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

export default AdminQuestions;
