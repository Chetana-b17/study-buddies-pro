import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Users, MapPin, Calendar } from "lucide-react";

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  participants: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  maxParticipants: number;
  isCreator: boolean;
  status: 'upcoming' | 'active' | 'completed';
}

interface StudySessionCardProps {
  session: StudySession;
  onJoin?: (sessionId: string) => void;
  onEdit?: (sessionId: string) => void;
}

export function StudySessionCard({ session, onJoin, onEdit }: StudySessionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-focus text-focus-foreground';
      case 'completed':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const canJoin = !session.isCreator && session.participants.length < session.maxParticipants;

  return (
    <Card className="bg-gradient-card shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg text-foreground">{session.subject}</h3>
              <Badge className={getStatusColor(session.status)}>
                {session.status}
              </Badge>
            </div>
            <p className="text-muted-foreground font-medium">{session.topic}</p>
          </div>
          {session.isCreator && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit?.(session.id)}
              className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{session.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{session.time} ({session.duration}h)</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
            <MapPin className="h-4 w-4" />
            <span>{session.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="flex -space-x-2">
              {session.participants.slice(0, 3).map((participant) => (
                <Avatar key={participant.id} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={participant.avatar} />
                  <AvatarFallback className="text-xs">
                    {participant.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
              {session.participants.length > 3 && (
                <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                  +{session.participants.length - 3}
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              {session.participants.length}/{session.maxParticipants}
            </span>
          </div>

          {canJoin && (
            <Button 
              size="sm"
              onClick={() => onJoin?.(session.id)}
              className="bg-gradient-primary hover:scale-105 transition-smooth shadow-glow/50"
            >
              Join Session
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}