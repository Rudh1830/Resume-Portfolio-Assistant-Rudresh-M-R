
import { cn } from "@/lib/utils";

export type MessageType = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "chat-bubble",
        isUser ? "chat-bubble-user" : "chat-bubble-assistant"
      )}
    >
      {message.content}
    </div>
  );
};

export default ChatMessage;
