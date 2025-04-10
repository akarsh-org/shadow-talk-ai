
import { useState } from "react";
import { useChat, Preferences } from "../../context/ChatContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MoonIcon, SunIcon, Bell, Type, ZapIcon } from "lucide-react";

const PreferencesForm = () => {
  const { preferences, updatePreferences } = useChat();
  const [localPreferences, setLocalPreferences] = useState<Preferences>({ ...preferences });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences(localPreferences);
  };

  const handleChange = (key: keyof Preferences, value: any) => {
    setLocalPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Customize your chat experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <SunIcon className="h-4 w-4" />
              <Label htmlFor="dark-mode">Theme Mode</Label>
              <MoonIcon className="h-4 w-4" />
            </div>
            <Switch 
              id="dark-mode" 
              checked={localPreferences.darkMode}
              onCheckedChange={(checked) => handleChange("darkMode", checked)}
            />
          </div>
          
          {/* Font Size Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Font Size</Label>
              <Type className="h-4 w-4" />
            </div>
            <ToggleGroup 
              type="single" 
              value={localPreferences.fontSize}
              onValueChange={(value) => {
                if (value) handleChange("fontSize", value);
              }}
              className="justify-start"
            >
              <ToggleGroupItem value="small">Small</ToggleGroupItem>
              <ToggleGroupItem value="medium">Medium</ToggleGroupItem>
              <ToggleGroupItem value="large">Large</ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          {/* Notifications Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <Label htmlFor="notifications">Notifications</Label>
            </div>
            <Switch 
              id="notifications" 
              checked={localPreferences.notificationsEnabled}
              onCheckedChange={(checked) => handleChange("notificationsEnabled", checked)}
            />
          </div>
          
          {/* Autocomplete Suggestions Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ZapIcon className="h-4 w-4" />
              <Label htmlFor="autocomplete">Autocomplete Suggestions</Label>
            </div>
            <Switch 
              id="autocomplete" 
              checked={localPreferences.autocompleteSuggestions}
              onCheckedChange={(checked) => handleChange("autocompleteSuggestions", checked)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto">Save Preferences</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PreferencesForm;
