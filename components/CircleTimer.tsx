import React from 'react';

interface CircleTimerProps {
  timeLeft: number;
  maxTime: number;
}

export const CircleTimer: React.FC<CircleTimerProps> = ({ timeLeft, maxTime }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / maxTime) * circumference;
  
  // Color transition based on time left
  const getColor = () => {
    const ratio = timeLeft / maxTime;
    if (ratio > 0.6) return '#00d4ff'; // Blue
    if (ratio > 0.3) return '#ffd700'; // Gold
    return '#ff4b4b'; // Red
  };

  return (
    <div className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40">
      <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 120 120">
        {/* Background Circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#1a1a40"
          strokeWidth="8"
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={getColor()}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-3xl md:text-4xl font-bold font-display ${timeLeft <= 5 ? 'animate-pulse text-club-danger' : 'text-white'}`}>
          {timeLeft}
        </span>
        <span className="text-xs text-gray-400 uppercase tracking-widest">Sec</span>
      </div>
    </div>
  );
};
