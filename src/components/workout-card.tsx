import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
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
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-white" style={{backgroundColor: '#141414'}}>
      <CardContent className="p-4 space-y-4">
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

        <div className="space-y-1">
          {workout.exercises.map((exercise, index) => (
            <div key={index} className="flex items-center gap-2 p-2 rounded-lg" style={{backgroundColor: '#1a1a1a'}}>
              <img 
                src="/favicon.ico" 
                alt="" 
                className="w-4 h-4 flex-shrink-0"
              />
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

        <Button 
          onClick={() => navigate('/workout-timer')}
          size="lg"
          className="w-full text-black hover:opacity-90 font-tungsten"
          style={{backgroundColor: '#ccff00'}}
        >
          <Play className="w-4 h-4 mr-2" />
          START WORKOUT
        </Button>
      </CardContent>
    </Card>
  );
}