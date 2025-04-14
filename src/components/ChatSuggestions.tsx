
import { Button } from "@/components/ui/button";

interface ChatSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const ChatSuggestions = ({ suggestions, onSuggestionClick }: ChatSuggestionsProps) => {
  if (!suggestions.length) return null;
  
  return (
    <div className="p-4 border-t">
      <p className="text-sm text-muted-foreground mb-2">Suggested questions:</p>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChatSuggestions;
