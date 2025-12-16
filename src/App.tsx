import { useState } from 'react';
import { Login } from './components/Login';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Onboarding } from './components/Onboarding';
import { MainApp } from './components/MainApp';

export type User = {
  id: string;
  name: string;
  email: string;
  carbonFootprint: number;
  difficulty: 'facile' | 'moyen' | 'difficile';
  currentTree: {
    growth: number;
    monthlyProgress: number;
  };
  forest: Array<{
    id: string;
    month: string;
    growth: number;
  }>;
  streak: number;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setHasSeenWelcome(false);
    setHasCompletedOnboarding(false);
  };

  // Si pas connecté, afficher login
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  // Si connecté mais pas vu l'écran d'accueil, afficher welcome
  if (!hasSeenWelcome) {
    return (
      <WelcomeScreen
        userName={user.name}
        onContinue={() => setHasSeenWelcome(true)}
      />
    );
  }

  // Si connecté mais pas d'onboarding, afficher onboarding
  if (!hasCompletedOnboarding) {
    return (
      <Onboarding
        user={user}
        onComplete={(updatedUser) => {
          setUser(updatedUser);
          setHasCompletedOnboarding(true);
        }}
      />
    );
  }

  // Afficher l'app principale
  return <MainApp user={user} setUser={setUser} onLogout={handleLogout} />;
}