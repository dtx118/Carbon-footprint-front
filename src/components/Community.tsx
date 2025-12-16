import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Users, MessageCircle, Heart, Share2, TrendingUp, Flame, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { useState } from 'react';

export function Community() {
  const [newPost, setNewPost] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Éco-Warriors Paris');
  const [showGroupSelector, setShowGroupSelector] = useState(false);

  const userGroups = [
    { name: 'Éco-Warriors Paris', members: 12 },
    { name: 'Vélo-Taf Lyon', members: 8 },
    { name: 'Zéro Déchet France', members: 156 },
  ];

  const posts = [
    {
      id: 1,
      author: 'Marie L.',
      avatar: '👩',
      time: 'Il y a 2h',
      content: "J'ai réussi à réduire ma consommation d'eau de 30% ce mois-ci en installant des mousseurs sur mes robinets ! 💧",
      likes: 24,
      comments: 5,
      category: 'Eau',
    },
    {
      id: 2,
      author: 'Thomas B.',
      avatar: '👨',
      time: 'Il y a 5h',
      content: "Mon premier mois à vélo pour aller au travail, 120km parcourus sans émissions ! 🚴‍♂️",
      likes: 42,
      comments: 12,
      category: 'Transport',
    },
    {
      id: 3,
      author: 'Sophie M.',
      avatar: '👩‍🦰',
      time: 'Il y a 1 jour',
      content: "Recette du jour : un délicieux curry de légumes de saison 🥘 Moins de viande = moins de CO₂ !",
      likes: 38,
      comments: 8,
      category: 'Alimentation',
    },
  ];

  const challenges = [
    {
      title: 'Novembre Vert',
      participants: 1247,
      description: 'Un mois sans viande',
      progress: 65,
      daysLeft: 8,
    },
    {
      title: 'Zéro Déchet',
      participants: 892,
      description: 'Réduire ses déchets de 50%',
      progress: 45,
      daysLeft: 15,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#A8C686] opacity-20 rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4E7B9] opacity-30 rounded-tr-full" />

      <div className="relative z-10 p-4 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <h1 className="text-[#2C3E2F] flex items-center gap-2">
                Communauté
              </h1>
              <p className="text-sm text-[#7A9B6C]">Partagez et inspirez</p>
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
              <Users className="w-5 h-5 text-[#5C7A5F]" />
              <div className="text-left">
                <p className="text-sm text-[#2C3E2F]">{selectedGroup}</p>
                <p className="text-xs text-[#7A9B6C]">
                  {userGroups.find(g => g.name === selectedGroup)?.members} membres
                </p>
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
                  <p className="text-xs text-[#7A9B6C]">{group.members} membres</p>
                </button>
              ))}
            </div>
          )}
        </Card>

        {/* Active Challenges - Enhanced Visual */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[#2C3E2F]">Défis en cours</h2>
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-3">
            {challenges.map((challenge, index) => (
              <Card key={index} className="p-5 bg-gradient-to-br from-[#5C7A5F] to-[#4A6350] text-white border-none shadow-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-5 h-5" />
                      <h3 className="font-semibold">{challenge.title}</h3>
                    </div>
                    <p className="text-sm text-white/90">{challenge.description}</p>
                  </div>
                  <div className="bg-white/20 rounded-full px-3 py-1">
                    <p className="text-xs whitespace-nowrap">{challenge.daysLeft} jours</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{challenge.participants} participants</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div
                    className="bg-white h-3 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${challenge.progress}%` }}
                  >
                    <span className="text-xs text-[#5C7A5F] font-semibold">{challenge.progress}%</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Impact Stats - Reordered by Importance */}
        <Card className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl">10.2t</p>
              <p className="text-xs text-[#5C7A5F]">CO₂ réduit</p>
            </div>
            <div>
              <p className="text-2xl">1.2k</p>
              <p className="text-xs text-[#5C7A5F]">Membres actifs</p>
            </div>
            <div>
              <p className="text-2xl">847</p>
              <p className="text-xs text-[#5C7A5F]">Actions</p>
            </div>
          </div>
        </Card>

        {/* New Post */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-[#A8C686]/30 mb-6">
          <h3 className="text-[#2C3E2F] mb-3">Partagez votre expérience</h3>
          <Textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Qu'avez-vous accompli aujourd'hui ?"
            className="mb-3 border-[#A8C686]/50 focus:border-[#5C7A5F] min-h-[80px]"
          />
          <Button className="w-full bg-[#5C7A5F] hover:bg-[#4A6350] text-white rounded-full">
            Publier
          </Button>
        </Card>

        {/* Community Feed */}
        <div className="space-y-4">
          <h2 className="text-[#2C3E2F]">Fil d'actualité</h2>
          {posts.map((post) => (
            <Card key={post.id} className="p-4 bg-white/80 backdrop-blur-sm border-[#A8C686]/30">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#A8C686] rounded-full flex items-center justify-center text-xl">
                    {post.avatar}
                  </div>
                  <div>
                    <p className="text-[#2C3E2F]">{post.author}</p>
                    <p className="text-xs text-[#7A9B6C]">{post.time}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-[#D4E7B9]/50 text-[#5C7A5F] rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <p className="text-[#2C3E2F] mb-4">{post.content}</p>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-3 border-t border-[#A8C686]/20">
                <button className="flex items-center gap-2 text-[#7A9B6C] hover:text-[#5C7A5F] transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-[#7A9B6C] hover:text-[#5C7A5F] transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-[#7A9B6C] hover:text-[#5C7A5F] transition-colors ml-auto">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}