import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, Lock } from 'lucide-react';
import { Logo } from './Logo';
import type { User } from '../App';

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - créer un utilisateur
    const newUser: User = {
      id: '1',
      name: name || email.split('@')[0],
      email,
      carbonFootprint: 0,
      difficulty: 'moyen',
      currentTree: {
        growth: 0,
        monthlyProgress: 0,
      },
      forest: [],
      streak: 0,
    };
    
    onLogin(newUser);
  };

  return (
    <div className="min-h-screen bg-[#FEFDE8] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#5C7A5F] opacity-80 rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#A8C686] opacity-30 rounded-tl-full" />
      <div className="absolute top-1/2 right-10 w-24 h-24 bg-[#D4E7B9] rounded-full opacity-60" />

      {/* Login Card */}
      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm border-[#A8C686]/30 relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Logo size="lg" showText={true} />
          <p className="text-[#7A9B6C] text-center text-sm mt-4">
            Cultivez votre impact environnemental
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#5C7A5F]">Prénom</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre prénom"
                className="border-[#A8C686]/50 focus:border-[#5C7A5F]"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#5C7A5F]">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7A9B6C]" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="pl-10 border-[#A8C686]/50 focus:border-[#5C7A5F]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#5C7A5F]">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7A9B6C]" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 border-[#A8C686]/50 focus:border-[#5C7A5F]"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#5C7A5F] hover:bg-[#4A6350] text-white rounded-full py-6 mt-6"
          >
            {isSignup ? "Créer mon compte" : "Se connecter"}
          </Button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-[#5C7A5F] text-sm hover:underline"
          >
            {isSignup
              ? "Déjà un compte ? Se connecter"
              : "Nouveau ? Créer un compte"}
          </button>
        </div>
      </Card>
    </div>
  );
}