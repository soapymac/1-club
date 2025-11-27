import { Question } from "../types";
import { STATIC_QUESTIONS } from "../constants";

export const generateQuestionForLevel = async (percent: number): Promise<Question> => {
  // Simulate a brief "thinking" network delay to build tension
  await new Promise(resolve => setTimeout(resolve, 1500));

  const question = STATIC_QUESTIONS[percent];

  if (question) {
    return question;
  }

  // Fallback if a level is missing from the static list
  return {
    text: "We encountered an error retrieving the question. Which of these is the odd one out?",
    options: ["Apple", "Banana", "Carrot", "Date"],
    correctAnswerIndex: 2,
    explanation: "Carrot is a vegetable; the others are fruits. (Fallback question)",
  };
};