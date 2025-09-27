import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeneratedWorkout } from "@/utils/workoutGenerator";
import { useToast } from "@/hooks/use-toast";
import { Copy, Share2, RotateCcw, Twitter, Instagram } from "lucide-react";

interface WorkoutDisplayProps {
  workout: GeneratedWorkout;
  onReset: () => void;
}

export function WorkoutDisplay({ workout, onReset }: WorkoutDisplayProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(workout.shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied to clipboard! 📋",
        description: "Your workout is ready to share!",
      });
    } catch (error) {
      toast({
        title: "Copy failed 😅",
        description: "Please try again or copy manually.",
        variant: "destructive",
      });
    }
  };

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(workout.shareText);
    const url = encodeURIComponent(window.location.href);
    
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}`;
        break;
      case "instagram":
        // Instagram doesn't have direct text sharing, so we'll copy to clipboard
        handleCopy();
        toast({
          title: "Ready for insta! 📸",
          description: "Text copied! Paste it in your story or post.",
        });
        return;
      case "tiktok":
        // TikTok doesn't have direct web sharing, copy to clipboard
        handleCopy();
        toast({
          title: "Ready for tiktok! 🎵",
          description: "Text copied! Create your workout video!",
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            GOWALKR
          </h1>
          <p className="text-sm text-muted-foreground">
            Your AI-powered fitness buddy
          </p>
        </div>

        <Card className="shadow-glow border-neon-blue/20">
          <CardHeader className="text-center">
            <CardTitle className="text-lg leading-tight">
              {workout.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {workout.exercises.map((exercise, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-2 rounded-lg bg-gradient-to-r from-secondary/50 to-accent/50"
                >
                  <span className="text-sm font-medium">{exercise}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-gradient-cta/10 border border-neon-pink/30">
              <div className="text-center">
                <span className="text-sm font-semibold text-neon-pink">
                  Finish strong: {workout.finisher}
                </span>
              </div>
            </div>

            <div className="text-center text-xs text-muted-foreground italic">
              Copy this workout & challenge your friends! 🚀
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button 
            variant="workout" 
            size="lg" 
            className="w-full"
            onClick={handleCopy}
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? "Copied! ✅" : "Copy Workout"}
          </Button>

          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleShare("twitter")}
              className="text-neon-blue border-neon-blue/30 hover:bg-neon-blue/10"
            >
              <Twitter className="w-4 h-4 mr-1" />
              twitter
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleShare("instagram")}
              className="text-neon-pink border-neon-pink/30 hover:bg-neon-pink/10"
            >
              <Instagram className="w-4 h-4 mr-1" />
              insta
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleShare("tiktok")}
              className="text-neon-purple border-neon-purple/30 hover:bg-neon-purple/10"
            >
              <Share2 className="w-4 h-4 mr-1" />
              tiktok
            </Button>
          </div>

          <Button 
            variant="ghost" 
            size="lg" 
            className="w-full text-muted-foreground"
            onClick={onReset}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Generate Another Workout
          </Button>
        </div>
      </div>
    </div>
  );
}