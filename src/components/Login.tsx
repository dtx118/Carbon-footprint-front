import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User as UserIcon, Lock, Loader2 } from 'lucide-react'; // J'ai changé Mail par UserIcon
import { Logo } from './Logo';
import type { User } from '../App';
import api from '../services/api'; // ✅ 1. Import de ton service API

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  // On utilise "username" car c'est ce que le Backend attend (ex: PaulEcolo)
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // Utile seulement pour l'inscription
  
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ État de chargement
  const [error, setError] = useState('');        // ✅ État d'erreur

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isSignup) {
        // --- INSCRIPTION ---
        // On envoie : username, email, password
        await api.post('/register', { 
          username, 
          email, 
          password 
        });
        
        // Si ça marche, on bascule vers le login et on affiche un succès
        setIsSignup(false);
        setError("Compte créé avec succès ! Connectez-vous."); // On utilise le champ erreur pour le succès temporairement
        // Reset password pour sécurité
        setPassword('');

      } else {
        // --- CONNEXION ---
        console.log("Connexion en cours vers le back...");
        
        // 1. Appel au Backend
        const response = await api.post('/login', {
          username: username,
          password: password
        });

        // Le token est géré automatiquement par api.ts si tu as bien fait le "setAuthToken" 
        // ou l'intercepteur, sinon response.data.token contient le token.
        
        console.log("Token reçu:", response.data.token);

        // 2. Création de l'utilisateur (Simulation des données manquantes pour la démo)
        const userFromBack: User = {
          id: '1',
          name: username,
          email: email || 'user@test.com', // Le back ne renvoie pas encore l'email au login
          carbonFootprint: 0,
          difficulty: 'moyen',
          currentTree: {
            growth: 0,
            monthlyProgress: 0,
          },
          forest: [],
          streak: 1,
        };
        
        // 3. Validation
        onLogin(userFromBack);
      }

    } catch (err: any) {
      console.error(err);
      // Gestion basique de l'erreur
      if (err.response && err.response.status === 403) {
        setError("Identifiant ou mot de passe incorrect.");
      } else if (err.response && err.response.data) {
        setError(typeof err.response.data === 'string' ? err.response.data : "Erreur lors de la connexion.");
      } else {
        setError("Impossible de contacter le serveur.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFDE8] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#5C7A5F] opacity-80 rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#A8C686] opacity-30 rounded-tl-full" />
      <div className="absolute top-1/2 right-10 w-24 h-24 bg-[#D4E7B9] rounded-full opacity-60" />

      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm border-[#A8C686]/30 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <Logo size="lg" showText={true} />
          <p className="text-[#7A9B6C] text-center text-sm mt-4">
            Cultivez votre impact environnemental
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Champ Username (Toujours visible) */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-[#5C7A5F]">Nom d'utilisateur</Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7A9B6C]" />
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: PaulEcolo"
                className="pl-10 border-[#A8C686]/50 focus:border-[#5C7A5F]"
                required
              />
            </div>
          </div>

          {/* Champ Email (Visible seulement si Inscription) */}
          {isSignup && (
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#5C7A5F]">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="border-[#A8C686]/50 focus:border-[#5C7A5F]"
                required
              />
            </div>
          )}

          {/* Champ Mot de passe */}
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

          {/* Message d'erreur ou de succès */}
          {error && (
            <div className={`text-sm text-center p-2 rounded ${error.includes('succès') ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'}`}>
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading} // Désactive le bouton pendant le chargement
            className="w-full bg-[#5C7A5F] hover:bg-[#4A6350] text-white rounded-full py-6 mt-6 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              isSignup ? "Créer mon compte" : "Se connecter"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button" // Important pour ne pas soumettre le formulaire
            onClick={() => {
              setIsSignup(!isSignup);
              setError(''); // On efface les erreurs quand on change de mode
            }}
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