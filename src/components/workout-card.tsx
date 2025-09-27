import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Twitter, Instagram, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface WorkoutCardProps {
  workout: {
    title: string;
    exercises: string[];
    finisher: string;
    shareText: string;
  };
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const copyWorkout = async () => {
    try {
      await navigator.clipboard.writeText(workout.shareText);
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

  const shareToTwitter = () => {
    const text = encodeURIComponent(`${workout.shareText}\n\n#Walkr #Workout #Fitness`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareToTikTok = () => {
    copyWorkout();
    toast({
      title: "Ready for tiktok! 🎵",
      description: "Text copied! Create your workout video!",
    });
  };

  const shareToInstagram = () => {
    copyWorkout();
    toast({
      title: "Ready for insta! 📸",
      description: "Text copied! Paste it in your story or post.",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-800 shadow-lg border border-gray-700">
      <CardContent className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-tungsten text-white">
            {workout.title.split('\n')[0].split('(')[0]}
          </h2>
          <p className="text-lg font-tungsten" style={{color: '#ccff00'}}>
            ({workout.title.split('\n')[0].split('(')[1]}
          </p>
          {workout.title.split('\n')[1] && (
            <p className="text-sm text-gray-300 font-normal">
              {workout.title.split('\n')[1]}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {workout.exercises.map((exercise, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-700 border border-gray-600">
              <span className="font-medium text-white">
                {exercise}
              </span>
            </div>
          ))}
          
          <div className="mt-4 p-4 rounded-xl text-black" style={{backgroundColor: '#ccff00'}}>
            <div className="text-center">
              <p className="text-xs font-tungsten mb-1">FINISH STRONG!</p>
              <span className="text-lg font-bold">
                {workout.finisher}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/workout-timer')}
            size="lg"
            className="w-full text-black hover:opacity-90 font-tungsten"
            style={{backgroundColor: '#ccff00'}}
          >
            <Play className="w-4 h-4 mr-2" />
            START WORKOUT
          </Button>
          
          <Button 
            onClick={copyWorkout}
            size="lg"
            variant="outline"
            className="w-full hover:bg-gray-700 font-tungsten"
            style={{borderColor: '#ccff00', color: '#ccff00'}}
          >
            <Copy className="w-4 h-4 mr-2" />
            COPY WORKOUT
          </Button>

          <div className="grid grid-cols-3 gap-2">
            <Button 
              onClick={shareToTwitter}
              variant="outline" 
              size="sm"
              className="text-blue-600 border-blue-600 hover:bg-blue-50 font-medium"
            >
              <Twitter className="w-4 h-4 mr-1" />
              twitter
            </Button>
            <Button 
              onClick={shareToInstagram}
              variant="outline" 
              size="sm"
              className="text-pink-600 border-pink-600 hover:bg-pink-50 font-medium"
            >
              <Instagram className="w-4 h-4 mr-1" />
              insta
            </Button>
            <Button 
              onClick={shareToTikTok}
              variant="outline" 
              size="sm"
              className="text-purple-600 border-purple-600 hover:bg-purple-50 font-medium"
            >
              <Share2 className="w-4 h-4 mr-1" />
              tiktok
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}