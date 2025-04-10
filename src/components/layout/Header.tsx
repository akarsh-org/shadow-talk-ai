
import { UserCircle } from "lucide-react";
import { useChat } from "../../context/ChatContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user } = useChat();

  return (
    <header className="flex items-center justify-between p-4 border-b border-border bg-secondary/30 backdrop-blur-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Shadow Talk AI</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="rounded-full" 
              />
            ) : (
              <UserCircle className="h-6 w-6" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="rounded-full h-9 w-9" 
                />
              ) : (
                <UserCircle className="h-6 w-6" />
              )}
            </div>
            <div className="flex flex-col space-y-0.5">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">User</p>
            </div>
          </div>
          <DropdownMenuItem className="cursor-pointer">
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Preferences
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive cursor-pointer">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
