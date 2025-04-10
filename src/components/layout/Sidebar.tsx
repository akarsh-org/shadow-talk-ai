
import { useState } from "react";
import { ChevronLeft, ChevronRight, PlusCircle, Search, Trash2, MoreVertical } from "lucide-react";
import { useChat, type Chat } from "../../context/ChatContext";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Sidebar = () => {
  const { chats, currentChat, setCurrentChat, createNewChat, deleteChat } = useChat();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div 
      className={cn(
        "sidebar-glass flex flex-col transition-all duration-300 h-full",
        isCollapsed ? "w-16" : "w-72"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h2 className="text-lg font-semibold">Chats</h2>}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "rounded-full p-2", 
            isCollapsed && "mx-auto"
          )}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      {!isCollapsed && (
        <div className="px-4 mb-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div 
            key={chat.id}
            className={cn(
              "cursor-pointer px-4 py-3 hover:bg-sidebar-accent transition-colors group",
              currentChat?.id === chat.id && "bg-sidebar-accent/60",
              isCollapsed && "px-2 py-3 text-center"
            )}
          >
            <div 
              className="flex items-center"
              onClick={() => setCurrentChat(chat)}
            >
              {isCollapsed ? (
                <div className="flex justify-center w-full">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-xs font-bold">{chat.title.charAt(0)}</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-sm font-bold">{chat.title.charAt(0)}</span>
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between">
                      <p className="font-medium truncate">{chat.title}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(chat.lastUpdated)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {chat.messages[chat.messages.length - 1]?.text || "No messages yet"}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete chat</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
            {isCollapsed && (
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 rounded-full bg-destructive/10 hover:bg-destructive/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                  <span className="sr-only">Delete chat</span>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <Button 
          onClick={createNewChat}
          className={cn(
            "w-full bg-primary hover:bg-primary/90",
            isCollapsed && "p-2 flex justify-center"
          )}
        >
          <PlusCircle className="h-5 w-5" />
          {!isCollapsed && <span className="ml-2">New Chat</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
