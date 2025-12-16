import { Card } from './ui/card';
import { Button } from './ui/button';
import { Trees, Trophy, Calendar } from 'lucide-react';
import { Logo } from './Logo';
import type { User } from '../App';
import { useState } from 'react';

interface VirtualForestProps {
  user: User;
}

export function VirtualForest({ user }: VirtualForestProps) {
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [showAllTrees, setShowAllTrees] = useState(false);
  
  // Forêt de démonstration - Extended list
  const forestTrees = [
    { id: '1', month: 'Novembre 2024', growth: 100, emoji: '🌳' },
    { id: '2', month: 'Octobre 2024', growth: 85, emoji: '🌳' },
    { id: '3', month: 'Septembre 2024', growth: 95, emoji: '🌳' },
    { id: '4', month: 'Août 2024', growth: 70, emoji: '🌿' },
    { id: '5', month: 'Juillet 2024', growth: 60, emoji: '🌿' },
    { id: '6', month: 'Juin 2024', growth: 45, emoji: '🌱' },
    { id: '7', month: 'Mai 2024', growth: 78, emoji: '🌿' },
    { id: '8', month: 'Avril 2024', growth: 92, emoji: '🌳' },
    { id: '9', month: 'Mars 2024', growth: 65, emoji: '🌿' },
    { id: '10', month: 'Février 2024', growth: 88, emoji: '🌳' },
    { id: '11', month: 'Janvier 2024', growth: 55, emoji: '🌱' },
    { id: '12', month: 'Décembre 2023', growth: 73, emoji: '🌿' },
  ];

  const totalTrees = forestTrees.length;
  const averageGrowth = Math.round(
    forestTrees.reduce((sum, tree) => sum + tree.growth, 0) / totalTrees
  );

  const allAchievements = [
    { emoji: '🌱', label: 'Première pousse', unlocked: true },
    { emoji: '🌿', label: 'Jardinier', unlocked: true },
    { emoji: '🌳', label: 'Forestier', unlocked: true },
    { emoji: '🏆', label: 'Champion', unlocked: false },
    { emoji: '⭐', label: 'Perfectionniste', unlocked: false },
    { emoji: '💎', label: 'Diamant', unlocked: false },
    { emoji: '🔥', label: 'Série de 30', unlocked: true },
    { emoji: '🎯', label: 'Expert', unlocked: false },
    { emoji: '🌍', label: 'Sauveur planète', unlocked: false },
    { emoji: '♻️', label: 'Recycleur pro', unlocked: false },
    { emoji: '🚴', label: 'Cycliste urbain', unlocked: true },
    { emoji: '💧', label: 'Économiseur eau', unlocked: false },
  ];

  const displayedAchievements = showAllAchievements ? allAchievements : allAchievements.slice(0, 8);
  const displayedTrees = showAllTrees ? forestTrees : forestTrees.slice(0, 6);
  const displayedHistoryTrees = showAllTrees ? forestTrees : forestTrees.slice(0, 3);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#5C7A5F] opacity-10 rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#A8C686] opacity-20 rounded-tl-full" />

      <div className="relative z-10 p-4 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <h1 className="text-[#2C3E2F] flex items-center gap-2">
                Ma Forêt Virtuelle
              </h1>
              <p className="text-sm text-[#7A9B6C]">Votre collection d'arbres</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-[#A8C686]/30">
            <div className="flex items-center gap-2 mb-1">
              <Trees className="w-5 h-5 text-[#5C7A5F]" />
              <p className="text-sm text-[#7A9B6C]">Total</p>
            </div>
            <p className="text-2xl text-[#2C3E2F]">{totalTrees}</p>
            <p className="text-xs text-[#7A9B6C]">arbres plantés</p>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border-[#A8C686]/30">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-[#5C7A5F]" />
              <p className="text-sm text-[#7A9B6C]">Moyenne</p>
            </div>
            <p className="text-2xl text-[#2C3E2F]">{averageGrowth}%</p>
            <p className="text-xs text-[#7A9B6C]">de croissance</p>
          </Card>
        </div>

        {/* Trophy Case / Forest Display */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#2C3E2F]">Armoire à Trophées</h2>
            <Trophy className="w-6 h-6 text-[#5C7A5F]" />
          </div>

          {/* Forest Grid */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {displayedTrees.map((tree) => (
              <div
                key={tree.id}
                className="aspect-square bg-gradient-to-b from-[#D4E7B9]/20 to-[#A8C686]/20 rounded-2xl flex flex-col items-center justify-center border-2 border-[#A8C686]/30 relative overflow-hidden"
              >
                {/* Ground */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#8B6F47]/30 rounded-b-2xl" />
                
                {/* Tree */}
                <div className="text-5xl mb-2">{tree.emoji}</div>
                
                {/* Growth indicator */}
                <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1">
                  <span className="text-xs text-[#5C7A5F]">{tree.growth}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button for Trees Grid */}
          {forestTrees.length > 6 && (
            <Button
              onClick={() => setShowAllTrees(!showAllTrees)}
              variant="outline"
              className="w-full mb-6 border-[#A8C686] text-[#5C7A5F] hover:bg-[#D4E7B9]/20"
            >
              {showAllTrees ? 'Voir moins d\'arbres' : `Voir plus d'arbres (${forestTrees.length - 6} restants)`}
            </Button>
          )}

          {/* Timeline */}
          <div className="space-y-2">
            <h3 className="text-sm text-[#7A9B6C] mb-3">Historique</h3>
            {displayedHistoryTrees.map((tree) => (
              <div
                key={tree.id}
                className="flex items-center justify-between p-3 bg-[#D4E7B9]/20 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#7A9B6C]" />
                  <div>
                    <p className="text-sm text-[#2C3E2F]">{tree.month}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{tree.emoji}</span>
                  <span className="text-sm text-[#5C7A5F]">{tree.growth}%</span>
                </div>
              </div>
            ))}
            
            {/* Show More/Less Button for History */}
            {forestTrees.length > 3 && (
              <Button
                onClick={() => setShowAllTrees(!showAllTrees)}
                variant="ghost"
                className="w-full text-[#5C7A5F] hover:bg-[#D4E7B9]/20"
              >
                {showAllTrees ? 'Voir moins' : `Voir tout l'historique (${forestTrees.length} arbres)`}
              </Button>
            )}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 bg-[#5C7A5F] text-white">
          <h3 className="mb-4">Récompenses débloquées</h3>
          <div className="grid grid-cols-4 gap-3">
            {displayedAchievements.map((achievement, index) => (
              <div
                key={index}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center ${
                  achievement.unlocked
                    ? 'bg-white/20'
                    : 'bg-white/5 opacity-50'
                }`}
                title={achievement.label}
              >
                <span className="text-2xl mb-1">{achievement.emoji}</span>
              </div>
            ))}
          </div>
          
          {/* Show More/Less Button */}
          {allAchievements.length > 8 && (
            <Button
              onClick={() => setShowAllAchievements(!showAllAchievements)}
              variant="ghost"
              className="w-full mt-4 text-white hover:bg-white/10"
            >
              {showAllAchievements ? 'Voir moins' : `Voir plus (${allAchievements.length - 8} restantes)`}
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}