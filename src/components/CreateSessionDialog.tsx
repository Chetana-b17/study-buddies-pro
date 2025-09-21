import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, Clock, Users, MapPin, BookOpen } from "lucide-react";

interface CreateSessionDialogProps {
  onCreateSession: (session: any) => void;
}

export function CreateSessionDialog({ onCreateSession }: CreateSessionDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    date: "",
    time: "",
    duration: "2",
    location: "",
    maxParticipants: "4",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSession = {
      id: Date.now().toString(),
      subject: formData.subject,
      topic: formData.topic,
      date: formData.date,
      time: formData.time,
      duration: parseInt(formData.duration),
      location: formData.location,
      participants: [
        {
          id: "current-user",
          name: "You",
          avatar: ""
        }
      ],
      maxParticipants: parseInt(formData.maxParticipants),
      isCreator: true,
      status: 'upcoming' as const,
      description: formData.description
    };

    onCreateSession(newSession);
    setOpen(false);
    setFormData({
      subject: "",
      topic: "",
      date: "",
      time: "",
      duration: "2",
      location: "",
      maxParticipants: "4",
      description: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:scale-105 transition-smooth shadow-glow/50">
          <Plus className="h-4 w-4 mr-2" />
          Create Study Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gradient-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Create New Study Session
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Subject
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="Mathematics"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                value={formData.topic}
                onChange={(e) => setFormData({...formData, topic: e.target.value})}
                placeholder="Calculus Review"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (hours)</Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="3">3 hours</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxParticipants" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Max Participants
              </Label>
              <Select value={formData.maxParticipants} onValueChange={(value) => setFormData({...formData, maxParticipants: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 people</SelectItem>
                  <SelectItem value="4">4 people</SelectItem>
                  <SelectItem value="6">6 people</SelectItem>
                  <SelectItem value="8">8 people</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Library Study Room B"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="What topics will you cover? Any materials to bring?"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-primary">
              Create Session
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}