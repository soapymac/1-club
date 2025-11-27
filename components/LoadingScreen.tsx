import React from 'react';

export const LoadingScreen: React.FC<{ percent: number }> = ({ percent }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/90 z-50 fixed inset-0">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-club-blue/30 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-club-accent border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      <h2 className="text-3xl font-display font-bold text-white mb-2">Calculating {percent}% Question</h2>
      <p className="text-club-accent animate-pulse">Consulting the AI Game Master...</p>
    </div>
  );
};
