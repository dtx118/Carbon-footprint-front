import { Card } from './ui/card';
import { Button } from './ui/button';
import { UsersRound, Trophy, Target, Trees, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import type { User } from '../App';
import { useState } from 'react';

interface GroupModeProps {
  user: User;
}

export function GroupMode({ user }: GroupModeProps) {
  const [selectedGroup, setSelectedGroup] = useState('Éco-Warriors Paris');
  const [showGroupSelector, setShowGroupSelector] = useState(false);

  const userGroups = [
    { 
      name: 'Éco-Warriors Paris', 
      members: 12,
      totalTrees: 47,
      groupGoal: 'Réduire de 25% notre empreinte carbone collective',
      progress: 68,
    },
    { 
      name: 'Vélo-Taf Lyon', 
      members: 8,
      totalTrees: 28,
      groupGoal: 'Utiliser le vélo pour 100% de nos trajets',
      progress: 82,
    },
    { 
      name: 'Zéro Déchet France', 
      members: 156,
      totalTrees: 523,
      groupGoal: 'Réduire les déchets de 60% collectivement',
      progress: 51,
    },
  ];

  const currentGroup = userGroups.find(g => g.name === selectedGroup) || userGroups[0];

  const leaderboard = [
    { rank: 1, name: 'Sophie M.', avatar: '👩‍🦰', trees: 8, growth: 95 },
    { rank: 2, name: 'Thomas B.', avatar: '👨', trees: 7, growth: 92 },
    { rank: 3, name: user.name, avatar: '👤', trees: 6, growth: 85 },
    { rank: 4, name: 'Marie L.', avatar: '👩', trees: 6, growth: 80 },
    { rank: 5, name: 'Lucas D.', avatar: '👨‍🦱', trees: 5, growth: 75 },
  ];

  const communalForest = [
    { emoji: '🌳', owner: 'Sophie M.', growth: 95 },
    { emoji: '🌳', owner: 'Thomas B.', growth: 92 },
    { emoji: '🌳', owner: user.name, growth: 85 },
    { emoji: '🌿', owner: 'Marie L.', growth: 80 },
    { emoji: '🌿', owner: 'Lucas D.', growth: 75 },
    { emoji: '🌳', owner: 'Emma R.', growth: 88 },
    { emoji: '🌱', owner: 'Hugo P.', growth: 45 },
    { emoji: '🌿', owner: 'Léa M.', growth: 70 },
    { emoji: '🌳', owner: 'Paul S.', growth: 90 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#5C7A5F] opacity-10 rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#A8C686] opacity-20 rounded-tl-full" />

      <div className="relative z-10 p-4 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <h1 className="text-[#2C3E2F] flex items-center gap-2">
                Clairières
              </h1>
              <p className="text-sm text-[#7A9B6C]">Progression collective</p>
            </div>
          </div>
        </div>

        {/* Group Selector */}
        <Card className="p-3 bg-white/80 backdrop-blur-sm border-[#A8C686]/30 mb-6">
          <button
            onClick={() => setShowGroupSelector(!showGroupSelector)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <UsersRound className="w-5 h-5 text-[#5C7A5F]" />
              <div className="text-left">
                <p className="text-sm text-[#2C3E2F]">{selectedGroup}</p>
                <p className="text-xs text-[#7A9B6C]">{currentGroup.members} membres</p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-[#7A9B6C] transition-transform ${showGroupSelector ? 'rotate-180' : ''}`} />
          </button>

          {showGroupSelector && (
            <div className="mt-3 pt-3 border-t border-[#A8C686]/20 space-y-2">
              {userGroups.map((group) => (
                <button
                  key={group.name}
                  onClick={() => {
                    setSelectedGroup(group.name);
                    setShowGroupSelector(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedGroup === group.name
                      ? 'bg-[#D4E7B9]/50'
                      : 'hover:bg-[#D4E7B9]/20'
                  }`}
                >
                  <p className="text-sm text-[#2C3E2F]">{group.name}</p>
                  <p className="text-xs text-[#7A9B6C]">{group.members} membres · {group.totalTrees} arbres</p>
                </button>
              ))}
            </div>
          )}
        </Card>

        {/* Group Stats */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#2C3E2F]">Statistiques de la clairière</h2>
            <UsersRound className="w-6 h-6 text-[#5C7A5F]" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-[#D4E7B9]/20 rounded-xl">
              <p className="text-2xl text-[#2C3E2F]">{currentGroup.members}</p>
              <p className="text-sm text-[#7A9B6C]">Membres</p>
            </div>
            <div className="text-center p-3 bg-[#A8C686]/20 rounded-xl">
              <p className="text-2xl text-[#2C3E2F]">{currentGroup.totalTrees}</p>
              <p className="text-sm text-[#7A9B6C]">Arbres</p>
            </div>
          </div>

          <div className="bg-[#5C7A5F]/10 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-[#5C7A5F]" />
              <p className="text-sm text-[#2C3E2F]">Objectif du groupe</p>
            </div>
            <p className="text-sm text-[#7A9B6C] mb-3">{currentGroup.groupGoal}</p>
            <div className="w-full bg-white/50 rounded-full h-3">
              <div
                className="bg-[#5C7A5F] h-3 rounded-full flex items-center justify-end pr-2"
                style={{ width: `${currentGroup.progress}%` }}
              >
                <span className="text-xs text-white">{currentGroup.progress}%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Communal Forest */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#2C3E2F]">Forêt Commune</h2>
            <Trees className="w-6 h-6 text-[#5C7A5F]" />
          </div>
          <p className="text-sm text-[#7A9B6C] mb-4">
            Chaque arbre représente la progression actuelle d'un membre
          </p>

          {/* Forest Grid - Live view */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {communalForest.map((tree, index) => (
              <div
                key={index}
                className="aspect-square bg-gradient-to-b from-[#D4E7B9]/20 to-[#A8C686]/20 rounded-xl flex items-center justify-center border-2 border-[#A8C686]/30 relative"
                title={`${tree.owner}: ${tree.growth}%`}
              >
                <span className="text-3xl">{tree.emoji}</span>
                <div className="absolute bottom-1 right-1 bg-white/90 rounded-full w-5 h-5 flex items-center justify-center">
                  <span className="text-xs text-[#5C7A5F]">{tree.growth}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#D4E7B9]/20 p-3 rounded-lg">
            <p className="text-xs text-[#5C7A5F] text-center">
              🌲 Les arbres sont mis à jour en temps réel
            </p>
          </div>
        </Card>

        {/* Leaderboard */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#2C3E2F]">Top 5 Contributeurs</h2>
            <Trophy className="w-6 h-6 text-[#5C7A5F]" />
          </div>

          <div className="space-y-3">
            {leaderboard.map((entry) => {
              const isCurrentUser = entry.name === user.name;
              return (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    isCurrentUser
                      ? 'bg-[#5C7A5F]/10 border-2 border-[#5C7A5F]'
                      : 'bg-[#D4E7B9]/20'
                  }`}
                >
                  {/* Rank */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      entry.rank === 1
                        ? 'bg-yellow-400'
                        : entry.rank === 2
                        ? 'bg-gray-300'
                        : entry.rank === 3
                        ? 'bg-orange-400'
                        : 'bg-[#A8C686]'
                    }`}
                  >
                    <span className="text-white">{entry.rank}</span>
                  </div>

                  {/* Avatar */}
                  <div className="w-10 h-10 bg-[#A8C686] rounded-full flex items-center justify-center text-xl">
                    {entry.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <p className="text-[#2C3E2F]">{entry.name}</p>
                    <p className="text-xs text-[#7A9B6C]">
                      {entry.trees} arbres · {entry.growth}% croissance
                    </p>
                  </div>

                  {/* Trophy for top 3 */}
                  {entry.rank <= 3 && (
                    <Trophy
                      className={`w-5 h-5 ${
                        entry.rank === 1
                          ? 'text-yellow-500'
                          : entry.rank === 2
                          ? 'text-gray-400'
                          : 'text-orange-500'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-[#5C7A5F] hover:bg-[#4A6350] text-white rounded-full py-6">
            Inviter des amis
          </Button>
          <Button
            variant="outline"
            className="w-full border-[#5C7A5F] text-[#5C7A5F] hover:bg-[#D4E7B9]/20 rounded-full py-6"
          >
            Créer un nouveau groupe
          </Button>
        </div>

        {/* Info */}
        <Card className="mt-4 p-4 bg-[#D4E7B9]/30 border-[#A8C686]/30">
          <p className="text-sm text-[#5C7A5F] text-center">
            🤝 Ensemble, nous sommes plus forts pour protéger la planète !
          </p>
        </Card>
      </div>
    </div>
  );
}