import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import {Car, Home, UtensilsCrossed, ShoppingBag, Plane, Zap, Recycle} from 'lucide-react';
import type { User } from '../App';

interface OnboardingProps {
  user: User;
  onComplete: (user: User) => void;
}

const questions = [
  {
    id: 'kmVoiture',
    question: "Combien de kilomètres parcourez-vous par an en voiture ?",
    icon: Car,
    options: [
      { label: 'Moins de 5 000 km', value: 3000 },
      { label: '5 000 à 15 000 km', value: 10000 },
      { label: 'Plus de 15 000 km', value: 20000 },
      { label: 'Je n\'utilise pas de voiture', value: 0 },
    ],
  },
  {
    id: 'volsParAn',
    question: "Combien de vols (aller-retour) faites-vous par an ?",
    icon: Plane,
    options: [
      { label: 'Jamais', value: 0 },
      { label: '1 à 2 fois', value: 1.5 },
      { label: '3 à 5 fois', value: 4 },
      { label: 'Plus de 5 fois', value: 6 },
    ],
  },
  {
    id: 'typeRegime',
    question: "Quel est votre régime alimentaire général ?",
    icon: UtensilsCrossed,
    options: [
      { label: 'Végétarien ou Végétalien', value: 'vegetarien' },
      { label: 'Mixte (Viande/Poisson occasionnel)', value: 'mixte' },
      { label: 'Viandard (Viande presque quotidienne)', value: 'viandard' },
    ],
  },
  {
    id: 'repasBoeufSemaine',
    question: "Combien de repas à base de viande de bœuf consommez-vous par semaine ?",
    icon: UtensilsCrossed,
    options: [
      { label: '0 fois', value: 0 },
      { label: '1 à 2 fois', value: 1.5 },
      { label: '3 à 4 fois', value: 3.5 },
      { label: '5 fois et plus', value: 6 },
    ],
  },
  {
    id: 'triSelectif',
    question: "Pratiquez-vous le tri sélectif systématiquement (verre, plastique, carton) ?",
    icon: Recycle,
    options: [
      { label: 'Oui', value: true },
      { label: 'Non ou rarement', value: false },
    ],
  },
  {
    id: 'compostage',
    question: "Compostez-vous vos biodéchets (légumes, restes, etc.) ?",
    icon: Recycle,
    options: [
      { label: 'Oui, j\'ai un compost', value: true },
      { label: 'Non', value: false },
    ],
  },
  {
    id: 'budgetVetementsMensuel',
    question: "Quel est votre budget mensuel moyen pour les vêtements/chaussures neufs ?",
    icon: ShoppingBag,
    options: [
      { label: 'Moins de 30 €', value: 20 },
      { label: '30 € à 80 €', value: 50 },
      { label: 'Plus de 80 €', value: 100 },
      { label: 'J\'achète uniquement de seconde main', value: 5 },
    ],
  },
  {
    id: 'nbTechNeufAn',
    question: "Combien de gros produits high-tech neufs (tél, PC, TV) achetez-vous par an ?",
    icon: Zap,
    options: [
      { label: '0 (Je répare/garde)', value: 0 },
      { label: '1 produit par an', value: 1 },
      { label: '2 produits ou plus par an', value: 2.5 },
    ],
  },
  {
    id: 'minutesDouche',
    question: "Quel est votre temps moyen sous la douche (en minutes) ?",
    icon: Zap,
    options: [
      { label: 'Moins de 5 minutes', value: 4 },
      { label: '5 à 10 minutes', value: 7 },
      { label: 'Plus de 10 minutes', value: 12 },
    ],
  },
  {
    id: 'typeChauffage',
    question: "Quel est le principal mode de chauffage de votre logement ?",
    icon: Home,
    options: [
      { label: 'Électricité (pompe à chaleur, convecteur)', value: 'electrique' },
      { label: 'Gaz naturel', value: 'gaz' },
      { label: 'Fioul, Charbon ou Bois (ancien)', value: 'fioul' },
    ],
  },
];

export function Onboarding({ user, onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [carbonFootprint, setCarbonFootprint] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = async (key: string, value: string | number | boolean) => {
    const newAnswers = { ...answers, [key]: value };
    // @ts-ignore
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsLoading(true);
      setError(null);

      const surveyDataToSend = {
        kmVoiture: newAnswers.kmVoiture as number,
        volsParAn: Math.round(newAnswers.volsParAn as number),
        typeRegime: newAnswers.typeRegime as string,
        repasBoeufSemaine: Math.round(newAnswers.repasBoeufSemaine as number),
        triSelectif: newAnswers.triSelectif as boolean,
        compostage: newAnswers.compostage as boolean,
        budgetVetementsMensuel: newAnswers.budgetVetementsMensuel as number,
        nbTechNeufAn: Math.round(newAnswers.nbTechNeufAn as number),
        minutesDouche: Math.round(newAnswers.minutesDouche as number),
        typeChauffage: newAnswers.typeChauffage as string,
      };

      try {
        const response = await fetch('http://localhost:8081/api/carbon/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify(surveyDataToSend),
        });

        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(`Erreur lors du calcul: ${errorDetail}`);
        }

        const result = await response.json();

        const annualCO2 = result.totalKgCo2e;
        setCarbonFootprint(Math.round(annualCO2 / 52));

        setIsLoading(false);
        setShowDifficulty(true);
      } catch (err) {
        console.error('Erreur API:', err);
        setError("Une erreur est survenue lors de l'envoi des données au serveur.");
        setIsLoading(false);
      }
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
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    disabled={isLoading}
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
