import { Card } from './ui/card';
import { Button } from './ui/button';
import { Settings as SettingsIcon, User, Bell, Shield, Trash2, LogOut, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';
import type { User as UserType } from '../App';

interface SettingsProps {
  user: UserType;
  onLogout: () => void;
}

export function Settings({ user, onLogout }: SettingsProps) {
  const handleLogout = () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      onLogout();
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.')) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#5C7A5F] opacity-10 rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#A8C686] opacity-20 rounded-tl-full" />

      <div className="relative z-10 p-4 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <div>
            <h1 className="text-[#2C3E2F] flex items-center gap-2">
              <SettingsIcon className="w-7 h-7" />
              Paramètres
            </h1>
            <p className="text-sm text-[#7A9B6C]">Gérez votre compte</p>
          </div>
        </div>

        {/* User Profile Card */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30 mb-6">
          <div className="flex items-center gap-4">
            <Logo size="sm" showText={false} />
            <div className="flex-1">
              <h2 className="text-[#2C3E2F]">{user.name}</h2>
              <p className="text-sm text-[#7A9B6C]">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-1 bg-[#D4E7B9] text-[#5C7A5F] rounded-full">
                  Niveau {user.difficulty}
                </span>
                <span className="text-xs text-[#7A9B6C]">
                  {user.streak} jours de série
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <div className="mb-6">
          <h3 className="text-[#2C3E2F] mb-3 px-2">Compte</h3>
          <Card className="bg-white/80 backdrop-blur-sm border-[#A8C686]/30 overflow-hidden">
            <button className="w-full p-4 flex items-center justify-between hover:bg-[#D4E7B9]/20 transition-colors border-b border-[#A8C686]/20">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-[#5C7A5F]" />
                <span className="text-[#2C3E2F]">Modifier le profil</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#7A9B6C]" />
            </button>

            <button className="w-full p-4 flex items-center justify-between hover:bg-[#D4E7B9]/20 transition-colors border-b border-[#A8C686]/20">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#5C7A5F]" />
                <span className="text-[#2C3E2F]">Confidentialité</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#7A9B6C]" />
            </button>

            <button className="w-full p-4 flex items-center justify-between hover:bg-[#D4E7B9]/20 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#5C7A5F]" />
                <span className="text-[#2C3E2F]">Notifications</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#7A9B6C]" />
            </button>
          </Card>
        </div>

        {/* Statistics Summary */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30 mb-6">
          <h3 className="text-[#2C3E2F] mb-4">Statistiques</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-[#D4E7B9]/20 rounded-xl">
              <p className="text-2xl text-[#2C3E2F]">{user.forest.length}</p>
              <p className="text-sm text-[#7A9B6C]">Arbres plantés</p>
            </div>
            <div className="text-center p-3 bg-[#A8C686]/20 rounded-xl">
              <p className="text-2xl text-[#2C3E2F]">{user.carbonFootprint}kg</p>
              <p className="text-sm text-[#7A9B6C]">CO₂ réduit</p>
            </div>
          </div>
        </Card>

        {/* About */}
        <div className="mb-6">
          <h3 className="text-[#2C3E2F] mb-3 px-2">À propos</h3>
          <Card className="bg-white/80 backdrop-blur-sm border-[#A8C686]/30 overflow-hidden">
            <button className="w-full p-4 flex items-center justify-between hover:bg-[#D4E7B9]/20 transition-colors border-b border-[#A8C686]/20">
              <span className="text-[#2C3E2F]">Conditions d'utilisation</span>
              <ChevronRight className="w-5 h-5 text-[#7A9B6C]" />
            </button>

            <button className="w-full p-4 flex items-center justify-between hover:bg-[#D4E7B9]/20 transition-colors border-b border-[#A8C686]/20">
              <span className="text-[#2C3E2F]">Politique de confidentialité</span>
              <ChevronRight className="w-5 h-5 text-[#7A9B6C]" />
            </button>

            <button className="w-full p-4 flex items-center justify-between hover:bg-[#D4E7B9]/20 transition-colors">
              <span className="text-[#2C3E2F]">Version 1.0.0</span>
            </button>
          </Card>
        </div>

        {/* Danger Zone */}
        <div className="space-y-3">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-[#5C7A5F] text-[#5C7A5F] hover:bg-[#D4E7B9]/20 rounded-full py-6 flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Se déconnecter
          </Button>

          <Button
            onClick={handleDeleteAccount}
            variant="outline"
            className="w-full border-red-500 text-red-500 hover:bg-red-50 rounded-full py-6 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Supprimer le compte
          </Button>
        </div>

        {/* Info */}
        <Card className="mt-6 p-4 bg-[#D4E7B9]/30 border-[#A8C686]/30">
          <p className="text-sm text-[#5C7A5F] text-center">
            🌱 Merci de contribuer à un avenir plus vert !
          </p>
        </Card>
      </div>
    </div>
  );
}