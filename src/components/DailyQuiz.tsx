import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Brain, Check, X, Lightbulb } from 'lucide-react';
import { Logo } from './Logo';
import type { User } from '../App';

interface DailyQuizProps {
  user: User;
  setUser: (user: User) => void;
}

const quizQuestions = [
  {
    id: 1,
    question: "Quelle est l'empreinte carbone moyenne d'un français par an ?",
    options: ['5 tonnes de CO₂', '10 tonnes de CO₂', '15 tonnes de CO₂', '20 tonnes de CO₂'],
    correct: 1,
    explanation: "Un Français émet en moyenne environ 10 tonnes de CO₂ par an, incluant transport, alimentation, logement et consommation.",
  },
  {
    id: 2,
    question: "Quel mode de transport émet le moins de CO₂ par km ?",
    options: ['Voiture électrique', 'Train', 'Bus', 'Vélo'],
    correct: 3,
    explanation: "Le vélo n'émet aucun CO₂ direct et très peu en production. C'est le mode de transport le plus écologique !",
  },
  {
    id: 3,
    question: "Combien de CO₂ absorbe un arbre adulte par an ?",
    options: ['5 kg', '22 kg', '50 kg', '100 kg'],
    correct: 1,
    explanation: "Un arbre adulte absorbe environ 22 kg de CO₂ par an, tout en produisant de l'oxygène.",
  },
];

export function DailyQuiz({ user, setUser }: DailyQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [dailyQuizTaken, setDailyQuizTaken] = useState(false);

  const question = quizQuestions[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === question.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      setDailyQuizTaken(true);
      // Ajouter des points de progression à l'utilisateur
      const newProgress = Math.min(user.currentTree.monthlyProgress + 10, 100);
      const newGrowth = Math.min(user.currentTree.growth + 5, 100);
      setUser({
        ...user,
        currentTree: {
          growth: newGrowth,
          monthlyProgress: newProgress,
        },
      });
    }
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#A8C686] opacity-20 rounded-bl-full" />
        
        <div className="relative z-10 p-4 max-w-md mx-auto flex items-center justify-center min-h-screen">
          <Card className="p-8 bg-white/90 backdrop-blur-sm border-[#A8C686]/30 w-full">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#5C7A5F] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">
                  {score === quizQuestions.length ? '🏆' : score >= quizQuestions.length / 2 ? '⭐' : '💪'}
                </span>
              </div>
              
              <h2 className="text-[#2C3E2F] mb-2">Quiz terminé !</h2>
              <p className="text-[#7A9B6C] mb-6">
                Vous avez obtenu {score} sur {quizQuestions.length} bonnes réponses
              </p>

              <div className="bg-[#D4E7B9]/30 rounded-xl p-4 mb-6">
                <p className="text-[#5C7A5F]">
                  🌱 Votre arbre a grandi de 5% !
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-orange-800">
                  ⏰ Quiz quotidien complété ! Revenez demain pour un nouveau quiz.
                </p>
              </div>

              <Button
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswer(null);
                  setShowResult(false);
                  setScore(0);
                  setQuizCompleted(false);
                }}
                className="w-full bg-[#5C7A5F] hover:bg-[#4A6350] text-white rounded-full py-6"
              >
                Revoir les questions
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#D4E7B9] opacity-40 rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#A8C686] opacity-20 rounded-tl-full" />

      <div className="relative z-10 p-4 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <h1 className="text-[#2C3E2F] flex items-center gap-2">
                Quiz Quotidien
              </h1>
              <p className="text-sm text-[#7A9B6C]">Apprenez chaque jour !</p>
            </div>
          </div>
          <div className="bg-white/60 px-3 py-2 rounded-full">
            <span className="text-[#2C3E2F]">
              {currentQuestion + 1}/{quizQuestions.length}
            </span>
          </div>
        </div>

        {/* Quiz Rules Info */}
        <Card className="mb-4 p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-800 text-center">
            ℹ️ Un nouveau quiz par jour. Complétez-le pour faire grandir votre arbre !
          </p>
        </Card>

        {/* Question Card */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-[#A8C686]/30 mb-6">
          <div className="mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#5C7A5F] rounded-full flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-[#2C3E2F] flex-1 pt-2">{question.question}</h2>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isCorrect = index === question.correct;
              const isSelected = index === selectedAnswer;
              
              let buttonClass = 'w-full p-4 rounded-xl border-2 transition-all text-left ';
              
              if (!showResult) {
                buttonClass += 'border-[#A8C686]/30 hover:border-[#5C7A5F] hover:bg-[#D4E7B9]/20';
              } else if (isSelected && isCorrect) {
                buttonClass += 'border-green-500 bg-green-50';
              } else if (isSelected && !isCorrect) {
                buttonClass += 'border-red-500 bg-red-50';
              } else if (isCorrect) {
                buttonClass += 'border-green-500 bg-green-50';
              } else {
                buttonClass += 'border-[#A8C686]/30 opacity-50';
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#2C3E2F]">{option}</span>
                    {showResult && isCorrect && <Check className="w-5 h-5 text-green-600" />}
                    {showResult && isSelected && !isCorrect && <X className="w-5 h-5 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Explanation */}
        {showResult && (
          <Card className={`p-6 mb-6 ${
            selectedAnswer === question.correct
              ? 'bg-green-50 border-green-200'
              : 'bg-orange-50 border-orange-200'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                selectedAnswer === question.correct
                  ? 'bg-green-500'
                  : 'bg-orange-500'
              }`}>
                {selectedAnswer === question.correct ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <Lightbulb className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-[#2C3E2F] mb-2">
                  {selectedAnswer === question.correct ? 'Bravo !' : 'Bonne tentative !'}
                </h3>
                <p className="text-sm text-[#5C7A5F]">{question.explanation}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Next Button */}
        {showResult && (
          <Button
            onClick={handleNext}
            className="w-full bg-[#5C7A5F] hover:bg-[#4A6350] text-white rounded-full py-6"
          >
            {currentQuestion < quizQuestions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
          </Button>
        )}
      </div>
    </div>
  );
}