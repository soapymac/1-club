import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Question, Level } from './types';
import { GAME_LEVELS } from './constants';
import { generateQuestionForLevel } from './services/geminiService';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { EndScreen } from './components/EndScreen';
import { LoadingScreen } from './components/LoadingScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  
  // Audio refs (Future enhancement: Add sound effects here)
  
  // Timer Ref
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentLevel: Level = GAME_LEVELS[currentLevelIndex];

  // Initialize Game
  const startGame = () => {
    setCurrentLevelIndex(0);
    loadLevel(0);
  };

  const loadLevel = async (index: number) => {
    setGameState(GameState.LOADING_QUESTION);
    setCurrentQuestion(null);
    setSelectedOption(null);
    
    // Fetch question
    const level = GAME_LEVELS[index];
    const question = await generateQuestionForLevel(level.percent);
    
    setCurrentQuestion(question);
    setTimeLeft(level.timeLimit);
    setGameState(GameState.PLAYING);
  };

  // Timer Logic
  useEffect(() => {
    if (gameState === GameState.PLAYING && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (gameState === GameState.PLAYING && timeLeft === 0) {
      // Time's up!
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, gameState]);

  const handleTimeUp = () => {
    // If time is up and no selection, it's a loss. 
    // Show correct answer then game over.
    setGameState(GameState.FEEDBACK);
    
    // Delay before game over screen
    setTimeout(() => {
       // If they didn't select anything, they are out.
       if (selectedOption === null) {
         setGameState(GameState.GAME_OVER);
       }
    }, 3000);
  };

  const handleSelectOption = (index: number) => {
    if (gameState !== GameState.PLAYING) return;
    
    setSelectedOption(index);
    setGameState(GameState.FEEDBACK);
    
    // Stop timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Check answer logic happens in render for immediate feedback, 
    // but state transition happens here if wrong
    const isCorrect = currentQuestion && index === currentQuestion.correctAnswerIndex;
    
    if (!isCorrect) {
      setTimeout(() => {
        setGameState(GameState.GAME_OVER);
      }, 4000); // Give time to read explanation
    }
  };

  const handleNextLevel = () => {
    const nextIndex = currentLevelIndex + 1;
    if (nextIndex >= GAME_LEVELS.length) {
      setGameState(GameState.VICTORY);
    } else {
      setCurrentLevelIndex(nextIndex);
      loadLevel(nextIndex);
    }
  };

  const handleRestart = () => {
    setGameState(GameState.START);
    setCurrentLevelIndex(0);
    setSelectedOption(null);
    setCurrentQuestion(null);
  };

  // Render Logic
  return (
    <div className="min-h-screen bg-club-dark text-white font-sans selection:bg-club-accent selection:text-black overflow-x-hidden">
      
      {gameState === GameState.START && (
        <StartScreen onStart={startGame} />
      )}

      {gameState === GameState.LOADING_QUESTION && (
        <LoadingScreen percent={currentLevel.percent} />
      )}

      {(gameState === GameState.PLAYING || gameState === GameState.FEEDBACK) && currentQuestion && (
        <GameScreen 
          level={currentLevel}
          question={currentQuestion}
          timeLeft={timeLeft}
          gameState={gameState}
          selectedOption={selectedOption}
          onSelectOption={handleSelectOption}
          onNextLevel={handleNextLevel}
        />
      )}

      {(gameState === GameState.GAME_OVER || gameState === GameState.VICTORY) && (
        <EndScreen 
          gameState={gameState} 
          score={currentLevel.percent} 
          onRestart={handleRestart} 
        />
      )}
      
      {/* Background ambient elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-club-blue rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-club-accent rounded-full blur-[120px] opacity-10"></div>
      </div>
    </div>
  );
};

export default App;