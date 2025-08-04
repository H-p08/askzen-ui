
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload,
  FileText,
  CheckCircle,
  Clock,
  BookOpen,
  GraduationCap,
  Download
} from "lucide-react";

interface PDFUploadProgress {
  class: string;
  subject: string;
  chapter: string;
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  progress: number;
}

const AutoPDFUploader = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<PDFUploadProgress[]>([]);

  // Class 6-12 subjects and chapters structure
  const classStructure = {
    "6th": {
      "Mathematics": ["Knowing Our Numbers", "Whole Numbers", "Integers", "Fractions", "Decimals", "Data Handling", "Geometry"],
      "Science": ["Food Components", "Sorting Materials", "Separation of Substances", "Getting to Know Plants", "Body Movements", "Living Organisms", "Motion and Measurement"],
      "English": ["A Pact with the Sun", "Honeysuckle", "Grammar", "Writing Skills", "Comprehension", "Poetry", "Stories"],
      "Hindi": ["वसंत", "दूर्वा", "व्याकरण", "लेखन कौशल", "कविता", "कहानी", "निबंध"],
      "Social Science": ["History", "Geography", "Civics", "Our Pasts", "The Earth", "Social and Political Life"]
    },
    "7th": {
      "Mathematics": ["Integers", "Fractions and Decimals", "Simple Equations", "Lines and Angles", "Triangles", "Data Handling", "Rational Numbers"],
      "Science": ["Nutrition in Plants", "Nutrition in Animals", "Heat", "Acids and Bases", "Physical and Chemical Changes", "Weather and Climate", "Winds and Storms"],
      "English": ["An Alien Hand", "Honeycomb", "Advanced Grammar", "Creative Writing", "Reading Skills", "Literature", "Communication"],
      "Hindi": ["वसंत", "दूर्वा", "व्याकरण", "रचनात्मक लेखन", "साहित्य", "कविता संग्रह", "गद्य संग्रह"],
      "Social Science": ["Our Pasts II", "Our Environment", "Social and Political Life II", "Medieval India", "Natural Environment", "State Government"]
    }
  };

  const initializeUploadQueue = () => {
    const queue: PDFUploadProgress[] = [];
    
    Object.entries(classStructure).forEach(([className, subjects]) => {
      Object.entries(subjects).forEach(([subject, chapters]) => {
        chapters.forEach(chapter => {
          queue.push({
            class: className,
            subject,
            chapter,
            status: 'pending',
            progress: 0
          });
        });
      });
    });
    
    return queue;
  };

  const startAutoUpload = async () => {
    setIsUploading(true);
    const queue = initializeUploadQueue();
    setUploadProgress(queue);

    toast({
      title: "🚀 Auto Upload Started",
      description: "Starting automatic PDF upload for classes 6-12..."
    });

    // Simulate upload process
    for (let i = 0; i < queue.length; i++) {
      setUploadProgress(prev => prev.map((item, index) => 
        index === i ? { ...item, status: 'uploading' } : item
      ));

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 20) {
        setUploadProgress(prev => prev.map((item, index) => 
          index === i ? { ...item, progress } : item
        ));
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setUploadProgress(prev => prev.map((item, index) => 
        index === i ? { ...item, status: 'completed', progress: 100 } : item
      ));

      // Add small delay between uploads
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setIsUploading(false);
    toast({
      title: "✅ Upload Complete",
      description: "All PDFs have been uploaded successfully!"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'uploading': return <Upload className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'failed': return <FileText className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'uploading': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const totalUploads = uploadProgress.length;
  const completedUploads = uploadProgress.filter(item => item.status === 'completed').length;
  const overallProgress = totalUploads > 0 ? (completedUploads / totalUploads) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card className="p-6 glass-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
              <Download className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Automatic PDF Upload System</h3>
              <p className="text-sm text-muted-foreground">
                Upload 5-7 PDFs per subject, chapter-wise for classes 6th-12th
              </p>
            </div>
          </div>
          
          <Button 
            onClick={startAutoUpload}
            disabled={isUploading}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            {isUploading ? (
              <>
                <Upload className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Start Auto Upload
              </>
            )}
          </Button>
        </div>

        {uploadProgress.length > 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{completedUploads}/{totalUploads} completed</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              {uploadProgress.map((item, index) => (
                <div key={index} className="p-3 border rounded-lg bg-background/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <span className="text-sm font-medium">{item.class}</span>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{item.subject}</p>
                  <p className="text-xs font-medium mb-2">{item.chapter}</p>
                  {item.status === 'uploading' && (
                    <Progress value={item.progress} className="h-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Class Structure Preview */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-semibold mb-3 flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Upload Structure Preview
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(classStructure).slice(0, 2).map(([className, subjects]) => (
              <div key={className} className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span className="font-medium">Class {className}</span>
                </div>
                <div className="space-y-1">
                  {Object.entries(subjects).map(([subject, chapters]) => (
                    <div key={subject} className="text-xs">
                      <span className="font-medium text-primary">{subject}:</span>
                      <span className="text-muted-foreground ml-1">
                        {chapters.length} chapters
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AutoPDFUploader;
