export interface Exercise {
  id: number;
  name: string;
  goal: string;
  equipment: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tikTokCaption: string;
}

export interface WorkoutRequest {
  goal: string;
  time: number;
  equipment: string;
}

export interface WorkoutResponse {
  workoutId: string;
  shareText: string;
  shareUrl: string;
}

export interface BedrockResponse {
  content: Array<{
    text: string;
  }>;
}