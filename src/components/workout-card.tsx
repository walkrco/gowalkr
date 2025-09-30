import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RefreshCw, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Exercise {
  name: string;
  goal: string;
  equipment: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  caption: string;
  description?: string;
}

interface WorkoutCardProps {
  workout: {
    title: string;
    exercises: Exercise[];
    finisher: string;
    shareText: string;
  };
  onSwapExercise?: (exercise: Exercise) => void;
}

export function WorkoutCard({ workout, onSwapExercise }: WorkoutCardProps) {
  const navigate = useNavigate();
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

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
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-lg" style={{backgroundColor: '#1a1a1a'}}>
                <img 
                  src="/favicon.ico" 
                  alt="" 
                  className="w-4 h-4 flex-shrink-0"
                />
                <span className="font-medium text-white flex-1">
                  {exercise.caption}
                </span>
                <div className="flex gap-1">
                  {exercise.description && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                      onClick={() => setExpandedExercise(
                        expandedExercise === exercise.name ? null : exercise.name
                      )}
                    >
                      <Info className="w-3 h-3" />
                    </Button>
                  )}
                  {onSwapExercise && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 text-gray-400 hover:text-yellow-400"
                      onClick={() => onSwapExercise(exercise)}
                    >
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
              {expandedExercise === exercise.name && exercise.description && (
                <div className="px-2 py-1 text-xs text-gray-300 bg-gray-800 rounded">
                  {exercise.description}
                </div>
              )}
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
          onClick={() => navigate('/workout-timer', { state: { workout } })}
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