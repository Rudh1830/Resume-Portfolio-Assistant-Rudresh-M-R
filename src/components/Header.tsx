
import { GraduationCap, FileText } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <GraduationCap className="h-6 w-6 text-brand-blue" />
        <h1 className="text-xl font-bold">Career Buddy</h1>
      </div>
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Resume Assistant</span>
      </div>
    </header>
  );
};

export default Header;
