import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, SkipForward, X, RotateCcw, Twitter, Instagram, Youtube } from "lucide-react";
import { generateWorkout, WorkoutInputs } from "@/utils/workout-generator";

interface WorkoutState {
  currentExerciseIndex: number;
  isActive: boolean;
  isPaused: boolean;
  timeRemaining: number;
  isResting: boolean;
  totalElapsed: number;
}

const WorkoutTimer = () => {
  const { workoutData } = useParams();
  const navigate = useNavigate();
  
  // Parse workout data from URL params (you'd normally get this from state/API)
  const [workout, setWorkout] = useState(null);
  const [workoutState, setWorkoutState] = useState<WorkoutState>({
    currentExerciseIndex: 0,
    isActive: false,
    isPaused: false,
    timeRemaining: 45, // Start with work time
    isResting: false,
    totalElapsed: 0
  });

  // Mock workout data - in real app this would come from props/state
  useEffect(() => {
    // Generate a sample workout for demo
    const sampleInputs: WorkoutInputs = {
      goal: "Strength",
      time: 15,
      equipment: "Bodyweight"
    };
    const generatedWorkout = generateWorkout(sampleInputs);
    setWorkout(generatedWorkout);
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (workoutState.isActive && !workoutState.isPaused && workoutState.timeRemaining > 0) {
      interval = setInterval(() => {
        setWorkoutState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
          totalElapsed: prev.totalElapsed + 1
        }));
      }, 1000);
    }

    // Handle exercise/rest transitions
    if (workoutState.timeRemaining === 0 && workoutState.isActive) {
      if (workoutState.isResting) {
        // Rest finished, move to next exercise
        const nextIndex = workoutState.currentExerciseIndex + 1;
        if (nextIndex < (workout?.exercises.length || 0)) {
          setWorkoutState(prev => ({
            ...prev,
            currentExerciseIndex: nextIndex,
            isResting: false,
            timeRemaining: 45 // Work time
          }));
        } else {
          // Workout finished
          setWorkoutState(prev => ({ ...prev, isActive: false }));
        }
      } else {
        // Exercise finished, start rest
        const restTime = workout?.duration <= 15 ? 15 : 30;
        setWorkoutState(prev => ({
          ...prev,
          isResting: true,
          timeRemaining: restTime
        }));
      }
    }

    return () => clearInterval(interval);
  }, [workoutState.isActive, workoutState.isPaused, workoutState.timeRemaining, workoutState.isResting, workoutState.currentExerciseIndex, workout]);

  const startWorkout = () => {
    setWorkoutState(prev => ({ ...prev, isActive: true, isPaused: false }));
  };

  const pauseWorkout = () => {
    setWorkoutState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const skipExercise = () => {
    if (workoutState.isResting) {
      // Skip rest, go to next exercise
      const nextIndex = workoutState.currentExerciseIndex + 1;
      if (nextIndex < (workout?.exercises.length || 0)) {
        setWorkoutState(prev => ({
          ...prev,
          currentExerciseIndex: nextIndex,
          isResting: false,
          timeRemaining: 45
        }));
      }
    } else {
      // Skip to rest period
      const restTime = workout?.duration <= 15 ? 15 : 30;
      setWorkoutState(prev => ({
        ...prev,
        isResting: true,
        timeRemaining: restTime
      }));
    }
  };

  const resetWorkout = () => {
    setWorkoutState({
      currentExerciseIndex: 0,
      isActive: false,
      isPaused: false,
      timeRemaining: 45,
      isResting: false,
      totalElapsed: 0
    });
  };

  const exitWorkout = () => {
    navigate(-1);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTotalTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!workout) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading workout...</div>;
  }

  const currentExercise = workout.exercises[workoutState.currentExerciseIndex];
  const progress = ((workoutState.currentExerciseIndex + (workoutState.isResting ? 0.5 : 0)) / workout.exercises.length) * 100;
  const isWorkoutComplete = workoutState.currentExerciseIndex >= workout.exercises.length && !workoutState.isActive;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-6">
        <div className="flex-1"></div>
        <div className="flex items-end">
          <span className="text-xl font-tungsten text-white">WALKR</span>
          <div className="w-3 h-3 rounded-full mb-1 ml-1" style={{backgroundColor: '#ccff00'}}></div>
        </div>
        <div className="flex-1 flex justify-end">
          <Button
            onClick={exitWorkout}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-4">
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{backgroundColor: '#ccff00', width: `${progress}%`}}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-white mt-2">
          <span>Exercise {workoutState.currentExerciseIndex + 1} of {workout.exercises.length}</span>
          <span>Total: {formatTotalTime(workoutState.totalElapsed)}</span>
        </div>
      </div>

      {/* Main Timer Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6">
        {isWorkoutComplete ? (
          <Card className="bg-gray-800 border-gray-600 text-center p-8">
            <CardContent className="space-y-6">
              <div className="text-6xl">🎉</div>
              <h2 className="text-3xl font-tungsten text-white">WORKOUT COMPLETE!</h2>
              <p className="text-white font-light" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>Total time: {formatTotalTime(workoutState.totalElapsed)}</p>
              <div className="space-y-3">
                <Button onClick={resetWorkout} className="w-full text-black hover:opacity-90" style={{backgroundColor: '#ccff00'}}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Do It Again
                </Button>
                <Button onClick={exitWorkout} variant="outline" className="w-full">
                  Back to Generator
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Timer Display */}
            <div className="text-center mb-8">
              <div className="text-8xl md:text-9xl font-tungsten text-white mb-4">
                {formatTime(workoutState.timeRemaining)}
              </div>
              <div className="text-xl text-white mb-2">
                {workoutState.isResting ? "REST" : "WORK"}
              </div>
            </div>

            {/* Current Exercise */}
            <Card className="bg-gray-800 border-gray-600 w-full max-w-md mb-8">
              <CardContent className="text-center p-6">
                <div className="text-xl mb-2 text-white font-light" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
                  {workoutState.isResting ? "🛌 Get Ready!" : currentExercise}
                </div>
                {!workoutState.isResting && (
                  <p className="text-white font-light" style={{fontFamily: '"Helvetica Neue", "Arial", sans-serif'}}>
                    Next: {workoutState.currentExerciseIndex + 1 < workout.exercises.length 
                      ? workout.exercises[workoutState.currentExerciseIndex + 1] 
                      : workout.finisher}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-4">
                {!workoutState.isActive ? (
                  <Button
                    onClick={startWorkout}
                    size="lg"
                    className="text-black hover:opacity-90 px-8"
                    style={{backgroundColor: '#ccff00'}}
                  >
                    <Play className="w-6 h-6 mr-2" />
                    Start Workout
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={pauseWorkout}
                      size="lg"
                      className="bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
                    >
                      {workoutState.isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                    </Button>
                    <Button
                      onClick={skipExercise}
                      size="lg"
                      className="bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
                    >
                      <SkipForward className="w-6 h-6" />
                    </Button>
                  </>
                )}
              </div>
              
              {workoutState.isActive && (
                <Button
                  onClick={() => navigate(-1)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  ← New Workout
                </Button>
              )}
            </div>
          </>
        )}
      </div>
      
      {/* Footer - Minimal */}
      <footer className="py-3 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>
            
            {/* Social Media Icons - Center */}
            <div className="flex items-center space-x-6">
              <a 
                href="https://twitter.com/your-handle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com/your-handle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com/@your-channel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            
            {/* Copyright - Right */}
            <div className="flex-1 flex justify-end">
              <p className="text-gray-500 text-xs">
                © 2025 WALKR
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WorkoutTimer;