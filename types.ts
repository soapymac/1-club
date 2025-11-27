export interface Question {
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Level {
  percent: number;
  description: string;
  timeLimit: number;
}

export enum GameState {
  START = 'START',
  LOADING_QUESTION = 'LOADING_QUESTION',
  PLAYING = 'PLAYING',
  FEEDBACK = 'FEEDBACK', // Showing answer for current question
  GAME_OVER = 'GAME_OVER',
  VICTORY = 'VICTORY'
}

export interface GameContextType {
  currentLevelIndex: number;
  gameState: GameState;
  score: number;
  currentQuestion: Question | null;
  selectedOptionIndex: number | null;
  timeLeft: number;
  hasUsedPass: boolean; // Maybe a lifeline feature
  startGame: () => void;
  submitAnswer: (index: number) => void;
  nextLevel: () => void;
  restartGame: () => void;
}
