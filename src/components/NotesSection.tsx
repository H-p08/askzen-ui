
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Save, 
  X,
  BookOpen,
  Calendar,
  Tag
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NotesSectionProps {
  selectedSubject: string;
}

const NotesSection = ({ selectedSubject }: NotesSectionProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const { toast } = useToast();

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('askzen_notes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt)
        }));
        setNotes(parsedNotes);
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('askzen_notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast({
        title: "❌ Incomplete Note",
        description: "कृपया title और content दोनों fill करें।",
        variant: "destructive"
      });
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title.trim(),
      content: newNote.content.trim(),
      subject: selectedSubject,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setNotes(prev => [note, ...prev]);
    setNewNote({ title: '', content: '' });
    setIsAddingNote(false);
    
    toast({
      title: "✅ Note Added!",
      description: "आपका note successfully save हो गया।"
    });
  };

  const editNote = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      setNewNote({ title: note.title, content: note.content });
      setEditingNote(id);
    }
  };

  const saveEdit = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast({
        title: "❌ Incomplete Note",
        description: "कृपया title और content दोनों fill करें।",
        variant: "destructive"
      });
      return;
    }

    setNotes(prev => prev.map(note => 
      note.id === editingNote 
        ? { ...note, title: newNote.title.trim(), content: newNote.content.trim(), updatedAt: new Date() }
        : note
    ));
    
    setEditingNote(null);
    setNewNote({ title: '', content: '' });
    
    toast({
      title: "✅ Note Updated!",
      description: "आपका note successfully update हो गया।"
    });
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    toast({
      title: "🗑️ Note Deleted",
      description: "Note successfully delete हो गया।"
    });
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setIsAddingNote(false);
    setNewNote({ title: '', content: '' });
  };

  const getSubjectNotes = () => {
    return notes.filter(note => note.subject === selectedSubject);
  };

  const subjectNotes = getSubjectNotes();

  return (
    <Card className="bg-card border border-border/50 shadow-lg">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">My Notes</h3>
              <p className="text-sm text-muted-foreground">
                {selectedSubject} subject • {subjectNotes.length} notes
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsAddingNote(true)}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            disabled={isAddingNote || editingNote !== null}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>

        {/* Add/Edit Note Form */}
        {(isAddingNote || editingNote) && (
          <Card className="p-4 mb-6 bg-muted/20 border-dashed">
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Note title..."
                  value={newNote.title}
                  onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                  className="font-medium"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Write your note content here..."
                  value={newNote.content}
                  onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  className="resize-none"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={cancelEdit}>
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button onClick={editingNote ? saveEdit : addNote}>
                  <Save className="h-4 w-4 mr-1" />
                  {editingNote ? 'Update' : 'Save'} Note
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Notes List */}
        {subjectNotes.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-muted-foreground mb-2">
              No notes yet for {selectedSubject}
            </h4>
            <p className="text-sm text-muted-foreground">
              Start adding notes to keep track of your learning progress!
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {subjectNotes.map((note) => (
              <Card key={note.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{note.title}</h4>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {note.createdAt.toLocaleDateString('hi-IN')}
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        <Badge variant="outline" className="text-xs">
                          {note.subject}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1 ml-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => editNote(note.id)}
                      disabled={isAddingNote || editingNote !== null}
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteNote(note.id)}
                      disabled={isAddingNote || editingNote !== null}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default NotesSection;
