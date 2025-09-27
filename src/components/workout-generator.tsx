import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { WorkoutCard } from "./workout-card";
import { fitnessGoals, equipmentOptions } from "@/data/exercises";
import { generateWorkout, WorkoutInputs } from "@/utils/workout-generator";
import { useToast } from "@/hooks/use-toast";
import { Dumbbell, Clock, Target } from "lucide-react";

export function WorkoutGenerator() {
  const [goal, setGoal] = useState<string>("");
  const [duration, setDuration] = useState<number[]>([20]);
  const [equipment, setEquipment] = useState<string>("");
  const [generatedWorkout, setGeneratedWorkout] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!goal || !equipment) {
      toast({
        title: "Missing info",
        description: "Please select your fitness goal and equipment first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const inputs: WorkoutInputs = {
        goal,
        time: duration[0],
        equipment
      };
      const workout = generateWorkout(inputs);
      setGeneratedWorkout(workout);
      setIsGenerating(false);
      toast({
        title: "Workout ready!",
        description: "Your instant workout is generated!",
      });
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card className="bg-gray-800 shadow-card border-2 border-orange-500/20">
        <CardHeader>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Goal Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-500" />
                <label className="font-medium text-white tracking-widest" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>Fitness Goal</label>
              </div>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger className="h-12 border-2 border-border">
                  <SelectValue placeholder="Workout choice" />
                </SelectTrigger>
                <SelectContent>
                  {fitnessGoals.map((goalOption) => (
                    <SelectItem key={goalOption} value={goalOption}>
                      {goalOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Duration Slider */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <label className="font-medium text-white tracking-widest" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>Time Available</label>
              </div>
              <div className="px-3">
                <Slider
                  value={duration}
                  onValueChange={setDuration}
                  max={30}
                  min={5}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>5 min</span>
                  <span className="font-bold text-orange-500">{duration[0]} min</span>
                  <span>30 min</span>
                </div>
              </div>
            </div>

            {/* Equipment Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-orange-500" />
                <label className="font-medium text-white tracking-widest" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>Equipment</label>
              </div>
              <Select value={equipment} onValueChange={setEquipment}>
                <SelectTrigger className="h-12 border-2 border-border">
                  <SelectValue placeholder="Any equipment?" />
                </SelectTrigger>
                <SelectContent>
                  {equipmentOptions.map((equipmentOption) => (
                    <SelectItem key={equipmentOption} value={equipmentOption}>
                      {equipmentOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleGenerate}
            disabled={!goal || !equipment || isGenerating}
            size="lg"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 font-bold text-lg py-6"
          >
            {isGenerating ? (
              <>Creating your workout...</>
            ) : (
              <>Generate Workout</>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Workout Display */}
      {generatedWorkout && (
        <div className="animate-in fade-in duration-500">
          <WorkoutCard workout={generatedWorkout} />
        </div>
      )}
    </div>
  );
}