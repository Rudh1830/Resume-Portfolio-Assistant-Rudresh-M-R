
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Briefcase } from "lucide-react";

interface WelcomeMessageProps {
  onTopicSelect: (topic: string) => void;
}

const WelcomeMessage = ({ onTopicSelect }: WelcomeMessageProps) => {
  return (
    <Card className="mx-auto max-w-md animate-fade-in">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Welcome to Career Buddy!
        </h2>
        <p className="text-muted-foreground mb-6">
          I'm here to help you build your professional profile. What would you like to work on today?
        </p>
        
        <div className="grid gap-3">
          <Button
            variant="outline"
            className="justify-start h-auto py-3"
            onClick={() => onTopicSelect("I need help creating my resume")}
          >
            <FileText className="mr-2 h-4 w-4 text-brand-blue" />
            <div className="text-left">
              <div className="font-medium">Resume Builder</div>
              <div className="text-xs text-muted-foreground">Get help creating a professional resume</div>
            </div>
          </Button>
          
          <Button
            variant="outline" 
            className="justify-start h-auto py-3"
            onClick={() => onTopicSelect("What skills should I learn for my career?")}
          >
            <BookOpen className="mr-2 h-4 w-4 text-brand-teal" />
            <div className="text-left">
              <div className="font-medium">Skill Development</div>
              <div className="text-xs text-muted-foreground">Discover skills to boost your career</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="justify-start h-auto py-3"
            onClick={() => onTopicSelect("Suggest projects I can work on")}
          >
            <Briefcase className="mr-2 h-4 w-4 text-brand-orange" />
            <div className="text-left">
              <div className="font-medium">Project Ideas</div>
              <div className="text-xs text-muted-foreground">Find portfolio projects for your domain</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeMessage;
