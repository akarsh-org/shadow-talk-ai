
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Facebook, Github, Loader2, Mail } from "lucide-react";
import { useAuth } from "../App"; // Import the auth context correctly

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Use the auth context to get the login function

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Invalid credentials",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      // Call the login function from auth context
      login();
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      // Navigate to the home page after successful login
      navigate("/");
    }, 1500);
  };
  
  const handleProviderLogin = (provider: string) => {
    setLoading(true);
    
    // Simulate OAuth login process
    setTimeout(() => {
      setLoading(false);
      // Call the login function from auth context
      login();
      toast({
        title: "Login successful",
        description: `Logged in with ${provider}`,
      });
      // Navigate to the home page after successful login
      navigate("/");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <div className="absolute top-0 left-0 w-full h-64 bg-primary/20 blur-3xl -z-10"></div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Shadow Talk AI</CardTitle>
          <CardDescription>Login to start your conversation</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="p-0 h-auto text-xs" type="button">
                  Forgot password?
                </Button>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login with Email"
              )}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              type="button" 
              disabled={loading}
              onClick={() => handleProviderLogin("Google")}
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button 
              variant="outline" 
              type="button" 
              disabled={loading}
              onClick={() => handleProviderLogin("Microsoft")}
            >
              <Github className="mr-2 h-4 w-4" />
              Microsoft
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Button variant="link" className="p-0 h-auto" onClick={() => toast({ title: "Sign up feature", description: "This feature is not yet implemented." })}>
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
