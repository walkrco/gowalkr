import { exercises, Exercise } from "@/data/exercises";

export interface WorkoutInputs {
  goal: string;
  time: number;
  equipment: string;
}

export interface GeneratedWorkout {
  id: string;
  title: string;
  exercises: Exercise[];
  finisher: string;
  shareText: string;
  duration: number;
}

export function generateWorkout(inputs: WorkoutInputs): GeneratedWorkout {
  const { goal, time, equipment } = inputs;
  
  // Filter exercises based on inputs
  const bodyweightEquipment = ['Bodyweight', 'Wall', 'Chair'];
  
  let filteredExercises = exercises.filter(exercise => {
    const matchesGoal = exercise.goal === goal || exercise.goal === "Full Body";
    
    let matchesEquipment: boolean;
    if (equipment === 'Bodyweight') {
      matchesEquipment = bodyweightEquipment.includes(exercise.equipment);
    } else if (equipment === 'Full Gym') {
      matchesEquipment = true;
    } else {
      matchesEquipment = exercise.equipment === equipment || bodyweightEquipment.includes(exercise.equipment);
    }
    
    // For HIIT workouts, only include Medium and High intensity exercises
    const matchesIntensity = goal === 'HIIT' ? 
      (exercise.intensity === 'Medium' || exercise.intensity === 'High') : true;
    
    return matchesGoal && matchesEquipment && matchesIntensity;
  });

  // If not enough exercises, include bodyweight exercises
  if (filteredExercises.length < 4) {
    filteredExercises = exercises.filter(exercise => 
      exercise.equipment === "Bodyweight"
    );
  }

  // Determine number of exercises based on time (more realistic for workout duration)
  let numExercises;
  if (time <= 10) {
    numExercises = Math.max(4, Math.floor(time / 2)); // 4-5 exercises for short workouts
  } else if (time <= 20) {
    numExercises = Math.max(6, Math.floor(time / 2.5)); // 6-8 exercises for medium workouts
  } else {
    numExercises = Math.max(8, Math.floor(time / 3)); // 8-10 exercises for longer workouts
  }
  numExercises = Math.min(numExercises, 12); // Cap at 12 exercises max
  
  // Shuffle and pick exercises
  const shuffled = [...filteredExercises].sort(() => Math.random() - 0.5);
  const selectedExercises = shuffled.slice(0, numExercises);
  
  // Add finisher exercise
  const finisherOptions = [
    "50 Jumping Jacks",
    "30 sec Victory Dance", 
    "1 min Celebration Plank",
    "20 Victory Squats",
    "Flex in the Mirror"
  ];
  const finisher = finisherOptions[Math.floor(Math.random() * finisherOptions.length)];

  // Generate workout ID
  const workoutId = Math.random().toString(36).substr(2, 9);

  // Create title
  const title = `Your WALKR Workout (${time} min, ${equipment})`;

  // Add workout structure based on time
  let workoutStructure = "";
  if (time >= 25) {
    const rounds = Math.ceil(time / 12); // 1 round per 12 minutes
    workoutStructure = `\nComplete ${rounds} rounds with 30 sec rest between rounds`;
  } else if (time >= 15) {
    workoutStructure = `\n45 sec work, 30 sec rest between exercises`;
  } else {
    workoutStructure = `\n45 sec work, 15 sec rest between exercises`;
  }

  // Generate share text
  const exerciseList = selectedExercises.map(ex => `• ${ex.caption}`).join('\n');
  const shareText = `${title}${workoutStructure}\n${exerciseList}\nFinish strong: ${finisher}\n\nCopy this workout & challenge your friends!\n\n#Walkr #WorkoutChallenge #FitnessMotivation`;

  return {
    id: workoutId,
    title: title + workoutStructure,
    exercises: selectedExercises,
    finisher,
    shareText,
    duration: time
  };
}