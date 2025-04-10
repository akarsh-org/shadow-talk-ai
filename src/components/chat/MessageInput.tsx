
import { useState } from "react";
import { Send } from "lucide-react";
import { useChat } from "../../context/ChatContext";
import { Button } from "@/components/ui/button";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass p-3 mx-auto max-w-4xl">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground text-foreground"
          autoFocus
        />
        <Button
          type="submit"
          size="icon"
          disabled={message.trim() === ""}
          className="rounded-full bg-primary hover:bg-primary/90"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
