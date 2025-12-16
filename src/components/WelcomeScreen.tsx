import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Sparkles, TreePine, Target, BarChart3 } from 'lucide-react';
import { Logo } from './Logo';

interface WelcomeScreenProps {
  userName: string;
  onContinue: () => void;
}

export function WelcomeScreen({ userName, onContinue }: WelcomeScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Sparkles,
      title: `Bienvenue ${userName} ! 🎉`,
      description: "Nous sommes ravis de vous accompagner dans votre parcours éco-responsable.",
      detail: "ConTreeBution vous aide à réduire votre empreinte carbone tout en faisant grandir une forêt virtuelle.",
    },
    {
      icon: TreePine,
      title: "Faites grandir votre arbre 🌱",
      description: "Chaque action écologique fait grandir votre arbre du mois.",
      detail: "Plus vous adoptez des habitudes durables, plus votre arbre devient majestueux. À la fin du mois, il rejoint votre forêt virtuelle !",
    },
    {
      icon: Target,
      title: "Atteignez vos objectifs 🎯",
      description: "Définissez des objectifs personnalisés adaptés à votre mode de vie.",
      detail: "Nous vous proposerons des défis adaptés à vos habitudes pour progresser à votre rythme.",
    },
    {
      icon: BarChart3,
      title: "Prêt à commencer ? 🚀",
      description: "Nous allons vous poser quelques questions pour mieux comprendre vos habitudes.",
      detail: "Cela nous permettra de personnaliser vos objectifs et de vous proposer les meilleurs conseils.",
    },
  ];

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onContinue();
    }
  };

  const handleSkip = () => {
    onContinue();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEFDE8] to-[#D4E7B9]/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A8C686] opacity-20 rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5C7A5F] opacity-10 rounded-tr-full" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <Logo size="lg" showText={true} />
        </div>

        {/* Main Card */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm border-[#A8C686]/30 w-full">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#5C7A5F] to-[#4A6350] rounded-full flex items-center justify-center shadow-lg">
              <Icon className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center text-[#2C3E2F] mb-3">
            {currentStepData.title}
          </h1>

          {/* Description */}
          <p className="text-center text-[#5C7A5F] mb-4">
            {currentStepData.description}
          </p>

          {/* Detail */}
          <p className="text-center text-sm text-[#7A9B6C] mb-6">
            {currentStepData.detail}
          </p>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-[#5C7A5F]'
                    : index < currentStep
                    ? 'w-2 bg-[#A8C686]'
                    : 'w-2 bg-[#D4E7B9]'
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleNext}
              className="w-full bg-[#5C7A5F] hover:bg-[#4A6350] text-white rounded-full py-6"
            >
              {currentStep < steps.length - 1 ? 'Suivant' : 'Commencer'}
            </Button>

            {currentStep < steps.length - 1 && (
              <Button
                onClick={handleSkip}
                variant="ghost"
                className="w-full text-[#7A9B6C] hover:text-[#5C7A5F] hover:bg-[#D4E7B9]/20"
              >
                Passer l'introduction
              </Button>
            )}
          </div>
        </Card>

        {/* Footer text */}
        <p className="text-xs text-[#7A9B6C] text-center mt-6">
          Ensemble, cultivons un avenir plus vert 🌍
        </p>
      </div>
    </div>
  );
}
