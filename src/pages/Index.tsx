
import { ChatProvider } from "../context/ChatContext";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import ChatInterface from "../components/chat/ChatInterface";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <ChatProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-hidden">
            <ChatInterface />
          </main>
        </div>
        <Toaster />
      </div>
    </ChatProvider>
  );
};

export default Index;
