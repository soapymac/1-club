import React from 'react';
import { Question, Level, GameState } from '../types';
import { CircleTimer } from './CircleTimer';

interface GameScreenProps {
  level: Level;
  question: Question;
  timeLeft: number;
  gameState: GameState;
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
  onNextLevel: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  level,
  question,
  timeLeft,
  gameState,
  selectedOption,
  onSelectOption,
  onNextLevel
}) => {
  const isFeedback = gameState === GameState.FEEDBACK;
  const isCorrect = isFeedback && selectedOption === question.correctAnswerIndex;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 py-6 md:py-12 min-h-screen">
      
      {/* Header Level Indicator */}
      <div className="w-full flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">
            {level.percent}%
          </h2>
          <p className="text-club-accent text-sm md:text-base tracking-widest uppercase">Question</p>
        </div>
        <div className="text-right hidden md:block">
           <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Pass rate</p>
           <div className="flex gap-1 justify-end">
             {Array.from({length: 10}).map((_, i) => (
               <div 
                  key={i} 
                  className={`h-2 w-2 rounded-full ${i < (level.percent / 10) ? 'bg-club-accent' : 'bg-gray-800'}`}
               />
             ))}
           </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center relative">
        
        {/* Timer (Sticky or Fixed Position visual) */}
        <div className={`transition-all duration-500 mb-8 ${isFeedback ? 'opacity-0 scale-0 h-0' : 'opacity-100 scale-100'}`}>
          <CircleTimer timeLeft={timeLeft} maxTime={level.timeLimit} />
        </div>

        {/* Question Card */}
        <div className="bg-club-blue/40 border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 w-full mb-8 shadow-2xl relative overflow-hidden">
           {/* Decorative background element */}
           <div className="absolute -top-20 -right-20 w-64 h-64 bg-club-accent/5 rounded-full blur-3xl"></div>
           
           <h3 className="text-xl md:text-3xl font-medium text-white text-center leading-relaxed relative z-10">
             {question.text}
           </h3>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {question.options.map((option, index) => {
            let buttonStyle = "bg-white/5 hover:bg-white/10 border-white/20 text-gray-200"; // Default
            
            if (isFeedback) {
              if (index === question.correctAnswerIndex) {
                buttonStyle = "bg-club-success text-black border-club-success shadow-[0_0_30px_rgba(0,255,157,0.4)] scale-[1.02] font-bold";
              } else if (index === selectedOption && index !== question.correctAnswerIndex) {
                buttonStyle = "bg-club-danger text-white border-club-danger opacity-50";
              } else {
                buttonStyle = "bg-black/40 text-gray-600 border-transparent opacity-30";
              }
            } else if (selectedOption === index) {
              buttonStyle = "bg-club-accent text-black border-club-accent shadow-[0_0_15px_rgba(0,212,255,0.4)]";
            }

            return (
              <button
                key={index}
                disabled={isFeedback}
                onClick={() => onSelectOption(index)}
                className={`
                  relative p-6 rounded-xl border-2 text-lg md:text-xl font-medium transition-all duration-200 
                  flex items-center justify-center text-center min-h-[80px]
                  ${buttonStyle}
                `}
              >
                {/* Option Letter Bubble */}
                <span className={`
                  absolute left-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border
                  ${isFeedback && index === question.correctAnswerIndex ? 'border-black text-black' : 'border-current opacity-60'}
                `}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Explanation / Next Level Area */}
        {isFeedback && (
          <div className="mt-8 w-full animate-fade-in-up">
            <div className={`p-6 rounded-xl border ${isCorrect ? 'bg-club-success/10 border-club-success/30' : 'bg-club-danger/10 border-club-danger/30'}`}>
              <h4 className={`text-xl font-bold mb-2 flex items-center gap-2 ${isCorrect ? 'text-club-success' : 'text-club-danger'}`}>
                {isCorrect ? (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Correct! You stay in the club.
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Eliminated.
                  </>
                )}
              </h4>
              <p className="text-gray-200 leading-relaxed">
                <span className="font-bold text-white">Logic:</span> {question.explanation}
              </p>
            </div>
            
            {isCorrect && (
              <div className="mt-6 flex justify-center">
                 <button
                   onClick={onNextLevel}
                   className="px-10 py-4 bg-white text-black font-display font-bold text-xl rounded-full hover:bg-club-accent hover:scale-105 transition-all shadow-lg"
                 >
                   NEXT QUESTION
                 </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
