
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";
import ChatSuggestions from "@/components/ChatSuggestions";
import WelcomeMessage from "@/components/WelcomeMessage";
import { MessageType } from "@/components/ChatMessage";

// Resume-related suggestions based on context
const getContextualSuggestions = (messages: MessageType[]): string[] => {
  // Get the last message to provide context-based suggestions
  const lastMessage = messages[messages.length - 1];
  
  if (messages.length <= 2) {
    return [
      "What sections should my resume have?",
      "How can I highlight my skills effectively?",
      "What projects should I include?",
    ];
  }
  
  // Resume building flow
  if (lastMessage.content.toLowerCase().includes("resume")) {
    return [
      "How do I format my education section?",
      "How long should my resume be?",
      "How do I explain employment gaps?",
    ];
  }
  
  // Skills development flow
  if (lastMessage.content.toLowerCase().includes("skill")) {
    return [
      "What technical skills are in-demand?",
      "How do I showcase soft skills?",
      "What certifications are valuable?",
    ];
  }
  
  // Project ideas flow
  if (lastMessage.content.toLowerCase().includes("project")) {
    return [
      "What projects show frontend skills?",
      "What data science projects impress employers?",
      "How detailed should project descriptions be?",
    ];
  }
  
  // Default suggestions
  return [
    "How do I tailor my resume for different jobs?",
    "What should I avoid on my resume?",
    "How can I make my resume stand out?",
  ];
};

// Sample assistant responses based on user queries
const getAssistantResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("resume") && (lowerMessage.includes("create") || lowerMessage.includes("build") || lowerMessage.includes("help"))) {
    return "Great! I'd be happy to help you create a strong resume. A good resume typically includes these key sections:\n\n• Contact Information\n• Professional Summary\n• Work Experience\n• Education\n• Skills\n• Projects (if applicable)\n\nWhich section would you like to work on first?";
  }
  
  if (lowerMessage.includes("section")) {
    return "The most important resume sections include:\n\n1. **Contact Information**: Name, phone, email, LinkedIn\n2. **Professional Summary**: 2-3 sentences highlighting your experience and strengths\n3. **Work Experience**: Most recent roles with accomplishments (use action verbs and metrics)\n4. **Education**: Degrees, institutions, graduation dates\n5. **Skills**: Technical and soft skills relevant to the position\n6. **Optional sections**: Projects, certifications, volunteer work\n\nRemember to prioritize the sections most relevant to your target role!";
  }
  
  if (lowerMessage.includes("skill") && (lowerMessage.includes("learn") || lowerMessage.includes("develop"))) {
    return "To determine which skills to learn, first identify your target career path. For tech roles, consider:\n\n**Software Development**:\n• Programming languages (JavaScript, Python, Java)\n• Frameworks (React, Angular, Vue)\n• Version control (Git)\n• CI/CD pipelines\n\n**Data Science**:\n• Python, R\n• SQL\n• Machine Learning libraries\n• Data visualization\n\n**UX/UI Design**:\n• Design tools (Figma, Adobe XD)\n• User research methods\n• Prototyping\n\nWhich domain interests you most?";
  }
  
  if (lowerMessage.includes("project") && lowerMessage.includes("suggest")) {
    return "Project ideas that impress employers demonstrate both technical ability and problem-solving skills. Here are some suggestions:\n\n**For Web Development**:\n• Personal portfolio website\n• E-commerce platform with payment integration\n• Social media dashboard with analytics\n\n**For Data Science**:\n• Predictive analysis of real-world datasets\n• Interactive data visualization dashboard\n• Natural language processing application\n\n**For Design**:\n• UI kit for a mobile app\n• Website redesign with clear case study\n• Brand identity system\n\nWould you like specific details about any of these project types?";
  }
  
  if (lowerMessage.includes("format") && lowerMessage.includes("education")) {
    return "For your education section, follow this format:\n\n**Degree Name**\nUniversity Name, Location\nGraduation Date (or expected)\n\nOptional details to include:\n• GPA (if above 3.5)\n• Relevant coursework\n• Academic honors\n• Study abroad experiences\n\nList your education in reverse chronological order, with your most recent degree first. Only include college-level education unless your high school achievements are particularly relevant.";
  }
  
  // Default response
  return "I'm your Resume & Career Assistant. I can help with resume building, suggest skills to develop, or recommend projects for your portfolio. What specific aspect of your professional development would you like to focus on today?";
};

const ResumeAssistant = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([
    "What sections should my resume have?",
    "How can I highlight my skills effectively?",
    "What projects should I include?",
  ]);

  const handleSendMessage = (content: string) => {
    const newUserMessage: MessageType = {
      id: uuidv4(),
      role: "user",
      content,
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    
    // Simulate API response delay
    setTimeout(() => {
      const assistantResponse = getAssistantResponse(content);
      const newAssistantMessage: MessageType = {
        id: uuidv4(),
        role: "assistant",
        content: assistantResponse,
      };
      
      setMessages((prev) => [...prev, newAssistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleTopicSelect = (topic: string) => {
    setShowWelcome(false);
    handleSendMessage(topic);
  };

  // Update suggestions based on conversation context
  useEffect(() => {
    if (messages.length > 0) {
      setSuggestions(getContextualSuggestions(messages));
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {showWelcome ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <WelcomeMessage onTopicSelect={handleTopicSelect} />
          </div>
        ) : (
          <>
            <ChatWindow messages={messages} />
            <ChatSuggestions 
              suggestions={suggestions} 
              onSuggestionClick={handleSendMessage} 
            />
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeAssistant;
