import { Level, Question } from './types';

export const GAME_LEVELS: Level[] = [
  { percent: 90, description: "Easy start. Most people get this.", timeLimit: 30 },
  { percent: 80, description: "Still warming up.", timeLimit: 30 },
  { percent: 70, description: "Pay attention to the details.", timeLimit: 30 },
  { percent: 60, description: "Getting a bit trickier.", timeLimit: 30 },
  { percent: 50, description: "Half the population would fail this.", timeLimit: 35 },
  { percent: 40, description: "Requires lateral thinking.", timeLimit: 35 },
  { percent: 30, description: "Don't get distracted.", timeLimit: 40 },
  { percent: 20, description: "Top tier reasoning required.", timeLimit: 40 },
  { percent: 10, description: "Only the sharpest minds remain.", timeLimit: 45 },
  { percent: 5, description: "Elite level logic.", timeLimit: 50 },
  { percent: 1, description: "The 1% Club Question.", timeLimit: 60 },
];

export const STATIC_QUESTIONS: Record<number, Question> = {
  90: {
    text: "Which letter comes next in this sequence? A, C, E, G, ...",
    options: ["H", "I", "J", "K"],
    correctAnswerIndex: 1,
    explanation: "You skip one letter each time (B, D, F, H are skipped). The next letter is I."
  },
  80: {
    text: "If you pass the person in second place in a race, what place are you in?",
    options: ["First", "Second", "Third", "Last"],
    correctAnswerIndex: 1,
    explanation: "If you pass the person in second place, you take their spot. You are now in second place."
  },
  70: {
    text: "Mary's father has five daughters: Nana, Nene, Nini, Nono. What is the name of the fifth daughter?",
    options: ["Nunu", "Nina", "Mary", "Nano"],
    correctAnswerIndex: 2,
    explanation: "The question states it is 'Mary's father'. Therefore, Mary is one of the daughters."
  },
  60: {
    text: "What appears once in a minute, twice in a moment, but never in a thousand years?",
    options: ["The letter M", "The letter E", "Time", "Chance"],
    correctAnswerIndex: 0,
    explanation: "The letter 'M' appears once in the word 'Minute', twice in 'Moment', and not at all in 'Thousand years'."
  },
  50: {
    text: "Divide 30 by half and add 10. What is the answer?",
    options: ["25", "40", "50", "70"],
    correctAnswerIndex: 3,
    explanation: "Dividing by half (0.5) is the same as multiplying by 2. 30 / 0.5 = 60. Then 60 + 10 = 70."
  },
  40: {
    text: "Some months have 30 days, some have 31. How many have 28?",
    options: ["1", "12", "6", "2"],
    correctAnswerIndex: 1,
    explanation: "All 12 months have at least 28 days."
  },
  30: {
    text: "A farmer has 17 sheep and all but 9 die. How many are left?",
    options: ["17", "9", "8", "0"],
    correctAnswerIndex: 1,
    explanation: "'All but 9 die' means 9 did not die. So 9 sheep are left."
  },
  20: {
    text: "Which word is the odd one out?",
    options: ["Level", "Radar", "Kayak", "River"],
    correctAnswerIndex: 3,
    explanation: "Level, Radar, and Kayak are palindromes (read the same backwards). River is not."
  },
  10: {
    text: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
    options: ["$0.10", "$0.05", "$0.15", "$0.01"],
    correctAnswerIndex: 1,
    explanation: "Ball = $0.05. Bat = $1.05. Total = $1.10. If the ball was $0.10, the bat would be $1.10, and the total would be $1.20."
  },
  5: {
    text: "What is the missing number? 1=3, 2=3, 3=5, 4=4, 5=4, 6=3, 7=?",
    options: ["3", "4", "5", "6"],
    correctAnswerIndex: 2,
    explanation: "The number represents the count of letters in the word. 'Seven' has 5 letters."
  },
  1: {
    text: "What is the next number in this sequence? 1, 11, 21, 1211, 111221, ...",
    options: ["312211", "122111", "111111", "222222"],
    correctAnswerIndex: 0,
    explanation: "This is the 'Look-and-Say' sequence. You read the previous term: 'One 1' (11), 'Two 1s' (21), 'One 2, One 1' (1211). The last term is '312211' (Three 1s, Two 2s, One 1)."
  }
};