import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Exercise, WorkoutRequest, WorkoutResponse } from './types';
import { exercises as frontendExercises } from './exercises';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.DYNAMODB_TABLE!;

// Convert frontend exercises to Lambda format
const exercises: Exercise[] = frontendExercises.map((ex, index) => ({
  id: index + 1,
  name: ex.name,
  goal: ex.goal,
  equipment: ex.equipment,
  difficulty: ex.difficulty,
  tikTokCaption: ex.caption
}));

function generateWorkoutId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getFilteredExercises(goal: string, equipment: string): Exercise[] {
  const bodyweightEquipment = ['Bodyweight', 'Wall', 'Chair'];
  
  return exercises.filter(exercise => {
    const goalMatch = goal === 'All' || exercise.goal === goal || 
                     (goal === 'Quick Workout' && ['Cardio', 'Full Body'].includes(exercise.goal));
    
    let equipmentMatch: boolean;
    if (equipment === 'Bodyweight') {
      equipmentMatch = bodyweightEquipment.includes(exercise.equipment);
    } else if (equipment === 'Full Gym') {
      equipmentMatch = true;
    } else {
      equipmentMatch = exercise.equipment === equipment || 
                      bodyweightEquipment.includes(exercise.equipment);
    }
    
    return goalMatch && equipmentMatch;
  });
}

function selectExercisesForTime(exercises: Exercise[], targetMinutes: number): Exercise[] {
  const shuffled = exercises.sort(() => 0.5 - Math.random());
  
  let numExercises: number;
  if (targetMinutes <= 10) {
    numExercises = Math.max(4, Math.floor(targetMinutes / 2));
  } else if (targetMinutes <= 20) {
    numExercises = Math.max(6, Math.floor(targetMinutes / 2.5));
  } else {
    numExercises = Math.max(8, Math.floor(targetMinutes / 3));
  }
  numExercises = Math.min(numExercises, 12);
  
  return shuffled.slice(0, numExercises);
}

function formatWorkoutForShare(workout: Exercise[], goal: string, time: number, equipment: string): string {
  const finishers = [
    "50 Jumping Jacks 🎉",
    "30 sec Victory Dance 🕺", 
    "1 min Celebration Plank 🧱",
    "20 Victory Squats 🏆",
    "Flex in the Mirror 💪"
  ];
  
  const randomFinisher = finishers[Math.floor(Math.random() * finishers.length)];
  
  // Create title
  const title = `🔥 Your WALKR Workout (${time} min, ${equipment})`;
  
  // Add workout structure based on time
  let workoutStructure = "";
  if (time >= 25) {
    const rounds = Math.ceil(time / 12);
    workoutStructure = `\nComplete ${rounds} rounds with 30 sec rest between rounds`;
  } else if (time >= 15) {
    workoutStructure = `\n45 sec work, 30 sec rest between exercises`;
  } else {
    workoutStructure = `\n45 sec work, 15 sec rest between exercises`;
  }
  
  const exerciseList = workout.map(ex => `• ${ex.tikTokCaption}`).join('\n');
  const finisher = `Finish strong: ${randomFinisher}`;
  const footer = "Copy this workout & challenge your friends! 🚀\n\n#WALKR #WorkoutChallenge #FitnessMotivation";
  
  return `${title}${workoutStructure}\n${exerciseList}\n${finisher}\n\n${footer}`;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { goal, time, equipment }: WorkoutRequest = JSON.parse(event.body || '{}');
    
    // Rule-based workout generation
    const filteredExercises = getFilteredExercises(goal, equipment);
    const selectedExercises = selectExercisesForTime(filteredExercises, time);
    const workoutText = formatWorkoutForShare(selectedExercises, goal, time, equipment);
    
    const workoutId = generateWorkoutId();
    
    // Store in DynamoDB
    await docClient.send(new PutCommand({
      TableName: tableName,
      Item: {
        pk: `workout#${workoutId}`,
        sk: `workout#${workoutId}`,
        goal,
        time,
        equipment,
        shareText: workoutText,
        createdAt: new Date().toISOString()
      }
    }));
    
    const response: WorkoutResponse = {
      workoutId,
      shareText: workoutText,
      shareUrl: `https://${process.env.DOMAIN_NAME}/workout/${workoutId}`
    };
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to generate workout' })
    };
  }
};