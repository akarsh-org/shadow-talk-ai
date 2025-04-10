
import { useChat } from "../../context/ChatContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MessageSquare, PlusCircle } from "lucide-react";

const ChatList = () => {
  const { chats, currentChat, setCurrentChat, createNewChat } = useChat();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <Button
          onClick={createNewChat}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setCurrentChat(chat)}
            className={cn(
              "flex items-center p-4 cursor-pointer hover:bg-secondary/50 transition-colors",
              currentChat?.id === chat.id ? "bg-secondary/50" : ""
            )}
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div className="ml-3 flex-1">
              <p className="font-medium">{chat.title}</p>
              <p className="text-sm text-muted-foreground truncate">
                {chat.messages[chat.messages.length - 1]?.text || "No messages"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
