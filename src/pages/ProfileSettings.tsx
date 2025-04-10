import { useState } from "react";
import { useChat } from "../context/ChatContext";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Camera, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PreferencesForm from "../components/preferences/PreferencesForm";

const ProfileSettings = () => {
  const { user, updateUserProfile } = useChat();
  const { toast } = useToast();
  
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      updateUserProfile({ name, avatar });
      setIsSubmitting(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    }, 800);
  };

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Profile Settings</h1>
      </div>
      
      <Card className="glass">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              Manage how your profile appears to others
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <Avatar className="h-24 w-24 border-2 border-primary cursor-pointer relative group">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="text-2xl font-bold">
                  {name.charAt(0)}
                </AvatarFallback>
                <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </Avatar>
              <p className="text-xs text-muted-foreground">
                Click to change your avatar
              </p>
            </div>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Display Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Your name" 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value="john.doe@example.com" 
                  disabled 
                  className="opacity-70"
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" asChild>
              <Link to="/">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <PreferencesForm />
    </div>
  );
};

export default ProfileSettings;
