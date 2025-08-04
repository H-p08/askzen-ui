import { useState } from "react";
import { Search, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface SearchAreaProps {
  selectedSubject: string;
  onSearch: (query: string) => void;
  onImageUpload: (files: FileList) => void;
}

const SearchArea = ({ selectedSubject, onSearch, onImageUpload }: SearchAreaProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setUploadedFiles(files);
      onImageUpload(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      setUploadedFiles(files);
      onImageUpload(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
  };

  const subjectNames: { [key: string]: string } = {
    math: "Math",
    science: "Science", 
    english: "English",
    reasoning: "Reasoning",
    geography: "Geography",
    knowledge: "General Knowledge",
    diagrams: "Diagrams"
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="flex items-center bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Type your ${subjectNames[selectedSubject] || ''} question here...`}
            className="flex-1 border-0 bg-transparent px-6 py-4 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button 
            onClick={handleSearch}
            className="mr-2 rounded-xl px-6 py-2"
            disabled={!searchQuery.trim()}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Ad Banner Placeholder */}
      <div className="w-full h-24 bg-muted/50 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
        <span className="text-muted-foreground font-medium">Your Ad Here (728x90)</span>
      </div>

      {/* Image Upload Area */}
      <Card className="p-8 border-2 border-dashed border-border/50 bg-card/50 hover:bg-card/70 transition-colors">
        <div
          className={`text-center ${dragActive ? 'bg-primary/10 rounded-lg p-4' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Upload Image of your Question</h3>
          <p className="text-muted-foreground mb-4">
            Drag & drop your image here, or click to browse
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Supported formats: JPG, PNG, PDF (Max 10MB)
          </p>
          
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf"
            multiple
            onChange={handleFileChange}
          />
          <Button 
            variant="outline" 
            className="rounded-xl"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            Browse Files
          </Button>
        </div>

        {/* Uploaded Files Display */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6 space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Uploaded Files:</h4>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                <span className="text-sm font-medium">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default SearchArea;