import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Calendar, Users, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-xl shadow-glow/30">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                StudySync
              </h1>
              <p className="text-sm text-muted-foreground">Collaborative Study Planner</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </Button>
            <Button variant="ghost" className="gap-2">
              <Users className="h-4 w-4" />
              Study Groups
            </Button>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-focus">
                3
              </Badge>
            </Button>
            
            <Avatar className="h-8 w-8 border-2 border-primary/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-primary text-white text-sm font-medium">
                JS
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}