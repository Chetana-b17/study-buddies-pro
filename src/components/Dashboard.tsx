import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StudySessionCard } from "./StudySessionCard";
import { CreateSessionDialog } from "./CreateSessionDialog";
import { Calendar, TrendingUp, Users, Clock, BookOpen, Target } from "lucide-react";

// Mock data for study sessions
const initialSessions = [
  {
    id: "1",
    subject: "Mathematics",
    topic: "Calculus Integration",
    date: "2024-01-15",
    time: "14:00",
    duration: 2,
    location: "Library Study Room A",
    participants: [
      { id: "1", name: "John Smith", avatar: "" },
      { id: "2", name: "Sarah Wilson", avatar: "" },
      { id: "3", name: "Mike Johnson", avatar: "" }
    ],
    maxParticipants: 4,
    isCreator: false,
    status: 'upcoming' as const
  },
  {
    id: "2",
    subject: "Physics",
    topic: "Quantum Mechanics Review",
    date: "2024-01-16",
    time: "10:00",
    duration: 3,
    location: "Physics Lab 201",
    participants: [
      { id: "1", name: "You", avatar: "" },
      { id: "4", name: "Emma Davis", avatar: "" }
    ],
    maxParticipants: 6,
    isCreator: true,
    status: 'upcoming' as const
  },
  {
    id: "3",
    subject: "Computer Science",
    topic: "Algorithm Design Patterns",
    date: "2024-01-14",
    time: "16:00",
    duration: 2,
    location: "Online - Zoom",
    participants: [
      { id: "1", name: "You", avatar: "" },
      { id: "5", name: "Alex Chen", avatar: "" },
      { id: "6", name: "Lisa Park", avatar: "" },
      { id: "7", name: "David Kim", avatar: "" }
    ],
    maxParticipants: 4,
    isCreator: true,
    status: 'active' as const
  }
];

const statsData = [
  {
    title: "Study Hours This Week",
    value: "12.5",
    change: "+2.1",
    icon: Clock,
    color: "text-primary"
  },
  {
    title: "Sessions Attended",
    value: "8",
    change: "+3",
    icon: Target,
    color: "text-accent"
  },
  {
    title: "Study Partners",
    value: "15",
    change: "+2",
    icon: Users,
    color: "text-secondary"
  },
  {
    title: "Subjects Covered",
    value: "5",
    change: "+1",
    icon: BookOpen,
    color: "text-focus"
  }
];

export function Dashboard() {
  const [sessions, setSessions] = useState(initialSessions);

  const handleCreateSession = (newSession: any) => {
    setSessions(prev => [newSession, ...prev]);
  };

  const handleJoinSession = (sessionId: string) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          participants: [
            ...session.participants,
            { id: "current-user", name: "You", avatar: "" }
          ]
        };
      }
      return session;
    }));
  };

  const upcomingSessions = sessions.filter(s => s.status === 'upcoming');
  const activeSessions = sessions.filter(s => s.status === 'active');

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-primary text-white rounded-2xl p-8 shadow-glow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, John! 👋</h2>
            <p className="text-blue-100 text-lg">
              You have {upcomingSessions.length} upcoming study sessions and {activeSessions.length} active session.
            </p>
          </div>
          <div className="hidden lg:block">
            <CreateSessionDialog onCreateSession={handleCreateSession} />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <Card key={stat.title} className="bg-gradient-card shadow-soft border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">{stat.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <span className="text-accent text-sm font-medium flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-muted/50 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions - Mobile */}
      <div className="lg:hidden">
        <CreateSessionDialog onCreateSession={handleCreateSession} />
      </div>

      {/* Active Sessions */}
      {activeSessions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-focus" />
            <h3 className="text-xl font-semibold">Active Sessions</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeSessions.map((session) => (
              <StudySessionCard
                key={session.id}
                session={session}
                onJoin={handleJoinSession}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Upcoming Sessions</h3>
        </div>
        {upcomingSessions.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingSessions.map((session) => (
              <StudySessionCard
                key={session.id}
                session={session}
                onJoin={handleJoinSession}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-gradient-card border border-border/50 p-8 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">No upcoming sessions</h4>
            <p className="text-muted-foreground mb-4">
              Create your first study session to start collaborating with others!
            </p>
            <CreateSessionDialog onCreateSession={handleCreateSession} />
          </Card>
        )}
      </div>
    </div>
  );
}