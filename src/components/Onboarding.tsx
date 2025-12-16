import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Car, Home, UtensilsCrossed, ShoppingBag, Plane, Zap } from 'lucide-react';
import type { User } from '../App';

interface OnboardingProps {
  user: User;
  onComplete: (user: User) => void;
}

const questions = [
  {
    id: 'transport',
    question: "Comment vous déplacez-vous principalement ?",
    icon: Car,
    options: [
      { label: 'Voiture personnelle', value: 50 },
      { label: 'Transports en commun', value: 20 },
      { label: 'Vélo / Marche', value: 5 },
      { label: 'Covoiturage', value: 25 },
    ],
  },
  {
    id: 'home',
    question: "Quelle est la taille de votre logement ?",
    icon: Home,
    options: [
      { label: 'Studio / T1', value: 15 },
      { label: 'T2 / T3', value: 25 },
      { label: 'T4+', value: 40 },
      { label: 'Maison', value: 50 },
    ],
  },
  {
    id: 'diet',
    question: "Quel est votre régime alimentaire ?",
    icon: UtensilsCrossed,
    options: [
      { label: 'Omnivore (viande quotidienne)', value: 40 },
      { label: 'Flexitarien', value: 25 },
      { label: 'Végétarien', value: 15 },
      { label: 'Végétalien', value: 10 },
    ],
  },
  {
    id: 'shopping',
    question: "À quelle fréquence achetez-vous du neuf ?",
    icon: ShoppingBag,
    options: [
      { label: 'Très souvent', value: 30 },
      { label: 'Régulièrement', value: 20 },
      { label: 'Occasionnellement', value: 10 },
      { label: 'Rarement / Seconde main', value: 5 },
    ],
  },
  {
    id: 'travel',
    question: "Combien de fois voyagez-vous en avion par an ?",
    icon: Plane,
    options: [
      { label: 'Jamais', value: 0 },
      { label: '1-2 fois', value: 30 },
      { label: '3-5 fois', value: 60 },
      { label: 'Plus de 5 fois', value: 100 },
    ],
  },
  {
    id: 'energy',
    question: "Utilisez-vous des énergies renouvelables ?",
    icon: Zap,
    options: [
      { label: 'Oui, entièrement', value: 10 },
      { label: 'Partiellement', value: 20 },
      { label: 'Non, mais intéressé(e)', value: 30 },
      { label: 'Non', value: 40 },
    ],
  },
];

export function Onboarding({ user, onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [carbonFootprint, setCarbonFootprint] = useState(0);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculer l'empreinte carbone totale
      const total = newAnswers.reduce((sum, val) => sum + val, 0);
      setCarbonFootprint(total);
      setShowDifficulty(true);
    }
  };

  const handleDifficultyChoice = (difficulty: 'facile' | 'moyen' | 'difficile') => {
    const updatedUser: User = {
      ...user,
      carbonFootprint,
      difficulty,
    };
    onComplete(updatedUser);
  };

  if (showDifficulty) {
    return (
      <div className="min-h-screen bg-[#FEFDE8] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#A8C686] opacity-30 rounded-bl-full" />
        
        <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm border-[#A8C686]/30 relative z-10">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-[#5C7A5F] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">{carbonFootprint}</span>
            </div>
            <h2 className="text-[#2C3E2F] mb-2">Votre empreinte carbone</h2>
            <p className="text-[#7A9B6C]">~{carbonFootprint} kg CO₂ / semaine</p>
          </div>

          <div className="mb-6">
            <h3 className="text-[#2C3E2F] mb-4 text-center">
              Choisissez votre niveau de difficulté
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => handleDifficultyChoice('facile')}
                className="w-full p-4 rounded-xl border-2 border-[#D4E7B9] hover:border-[#A8C686] hover:bg-[#D4E7B9]/20 transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#2C3E2F]">🌱 Facile</p>
                    <p className="text-sm text-[#7A9B6C]">Réduction de 10% par mois</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleDifficultyChoice('moyen')}
                className="w-full p-4 rounded-xl border-2 border-[#A8C686] hover:border-[#7A9B6C] hover:bg-[#A8C686]/20 transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#2C3E2F]">🌿 Moyen</p>
                    <p className="text-sm text-[#7A9B6C]">Réduction de 20% par mois</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleDifficultyChoice('difficile')}
                className="w-full p-4 rounded-xl border-2 border-[#5C7A5F] hover:bg-[#5C7A5F]/10 transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#2C3E2F]">🌳 Difficile</p>
                    <p className="text-sm text-[#7A9B6C]">Réduction de 30% par mois</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEFDE8] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#5C7A5F] opacity-20 rounded-br-full" />
      
      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm border-[#A8C686]/30 relative z-10">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#7A9B6C]">
              Question {currentStep + 1} sur {questions.length}
            </p>
            <p className="text-sm text-[#5C7A5F]">{Math.round(progress)}%</p>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#A8C686] rounded-full flex items-center justify-center">
              <currentQuestion.icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-[#2C3E2F] flex-1">{currentQuestion.question}</h2>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className="w-full p-4 rounded-xl border-2 border-[#A8C686]/30 hover:border-[#5C7A5F] hover:bg-[#D4E7B9]/20 transition-all text-left"
            >
              <p className="text-[#2C3E2F]">{option.label}</p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
