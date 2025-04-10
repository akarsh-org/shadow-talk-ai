import { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

export type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  lastMessage?: string;
  lastUpdated: Date;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
};

interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  user: User;
  setCurrentChat: (chat: Chat) => void;
  createNewChat: () => void;
  sendMessage: (text: string) => void;
  deleteChat: (chatId: string) => void;
  updateUserProfile: (updates: Partial<User>) => void;
}

const defaultUser: User = {
  id: "1",
  name: "John Doe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User>(defaultUser);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Getting Started",
      lastUpdated: new Date(),
      messages: [
        {
          id: "msg1",
          text: "Hi there! I'm your AI assistant. How can I help you today?",
          sender: "ai",
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "2",
      title: "Project Ideas",
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      messages: [
        {
          id: "msg2",
          text: "Let's brainstorm some project ideas for your portfolio.",
          sender: "ai",
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
        },
      ],
    },
  ]);
  
  const [currentChat, setCurrentChat] = useState<Chat | null>(chats[0]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title: "New Conversation",
      lastUpdated: new Date(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          text: "How can I assist you today?",
          sender: "ai",
          timestamp: new Date(),
        },
      ],
    };
    
    setChats([newChat, ...chats]);
    setCurrentChat(newChat);
  };

  const sendMessage = (text: string) => {
    if (!currentChat) return;
    
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      sender: "user",
      timestamp: new Date(),
    };
    
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
      lastUpdated: new Date(),
      lastMessage: text,
    };
    
    const updatedChats = chats.map((chat) => 
      chat.id === currentChat.id ? updatedChat : chat
    );
    
    setChats(updatedChats);
    setCurrentChat(updatedChat);
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: `msg-${Date.now() + 1}`,
        text: `I received your message: "${text}". How can I further assist you?`,
        sender: "ai",
        timestamp: new Date(),
      };
      
      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiResponse],
        lastUpdated: new Date(),
      };
      
      const finalChats = updatedChats.map((chat) => 
        chat.id === currentChat.id ? finalChat : chat
      );
      
      setChats(finalChats);
      setCurrentChat(finalChat);
    }, 1000);
  };

  const updateUserProfile = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const deleteChat = (chatId: string) => {
    const chatToDelete = chats.find(chat => chat.id === chatId);
    if (!chatToDelete) return;

    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    
    if (currentChat && currentChat.id === chatId) {
      setCurrentChat(updatedChats.length > 0 ? updatedChats[0] : null);
    }

    toast({
      title: "Chat deleted",
      description: `"${chatToDelete.title}" has been removed`,
    });
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        user,
        setCurrentChat,
        createNewChat,
        sendMessage,
        deleteChat,
        updateUserProfile,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
