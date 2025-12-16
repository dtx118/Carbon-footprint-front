import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { TrendingUp, Target, Flame, Sprout, Plus, Leaf } from 'lucide-react';
import { Logo } from './Logo';
import type { User } from '../App';

interface TreeGrowthProps {
  user: User;
  setUser: (user: User) => void;
}

export function TreeGrowth({ user, setUser }: TreeGrowthProps) {
  const [showProgress, setShowProgress] = useState(false);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [showObjectivesDialog, setShowObjectivesDialog] = useState(false);
  const [actionDescription, setActionDescription] = useState('');
  const [actionCategory, setActionCategory] = useState<string>('');
  
  // Liste d'objectifs disponibles
  const [userObjectives, setUserObjectives] = useState([
    { id: '1', label: 'Utiliser les transports en commun 3x/semaine', done: true, category: 'Transport' },
    { id: '2', label: 'Réduire la viande à 2 repas/semaine', done: true, category: 'Alimentation' },
    { id: '3', label: 'Acheter local et de saison', done: false, category: 'Alimentation' },
    { id: '4', label: 'Réduire la consommation d\'énergie de 15%', done: false, category: 'Énergie' },
  ]);

  const availableObjectives = [
    { id: 'obj1', label: 'Utiliser une gourde réutilisable', category: 'Déchets' },
    { id: 'obj2', label: 'Composter ses déchets organiques', category: 'Déchets' },
    { id: 'obj3', label: 'Privilégier le vélo pour les trajets courts', category: 'Transport' },
    { id: 'obj4', label: 'Réduire le chauffage de 2°C', category: 'Énergie' },
    { id: 'obj5', label: 'Acheter en vrac', category: 'Alimentation' },
    { id: 'obj6', label: 'Installer des ampoules LED', category: 'Énergie' },
    { id: 'obj7', label: 'Éviter les produits avec emballage plastique', category: 'Déchets' },
    { id: 'obj8', label: 'Faire sécher le linge à l\'air libre', category: 'Énergie' },
    { id: 'obj9', label: 'Acheter d\'occasion', category: 'Consommation' },
    { id: 'obj10', label: 'Prendre des douches courtes (5 min)', category: 'Eau' },
  ];
  
  // Simuler la croissance de l'arbre (0-100%)
  const treeGrowth = user.currentTree.growth;
  const monthlyProgress = user.currentTree.monthlyProgress;

  // Objectifs basés sur la difficulté
  const reductionTarget = user.difficulty === 'facile' ? 10 : user.difficulty === 'moyen' ? 20 : 30;

  const actionImpacts = {
    'Transport': 8,
    'Alimentation': 6,
    'Énergie': 7,
    'Eau': 5,
    'Déchets': 4,
    'Autre': 3,
  };

  const handleAddAction = () => {
    if (!actionDescription.trim() || !actionCategory) return;

    const impact = actionImpacts[actionCategory as keyof typeof actionImpacts] || 3;
    const newProgress = Math.min(monthlyProgress + impact, 100);
    const newGrowth = Math.min(treeGrowth + impact, 100);
    
    setUser({
      ...user,
      currentTree: {
        growth: newGrowth,
        monthlyProgress: newProgress,
      },
      streak: user.streak + 1,
    });

    setActionDescription('');
    setActionCategory('');
    setShowActionDialog(false);
  };

  const handleAddObjective = (objective: typeof availableObjectives[0]) => {
    const newObjective = {
      id: objective.id,
      label: objective.label,
      done: false,
      category: objective.category,
    };
    setUserObjectives([...userObjectives, newObjective]);
  };

  const handleToggleObjective = (id: string) => {
    setUserObjectives(userObjectives.map(obj => 
      obj.id === id ? { ...obj, done: !obj.done } : obj
    ));
  };

  // Rendu de l'arbre selon sa croissance
  const renderTree = () => {
    if (treeGrowth === 0) {
      return (
        <div className="flex flex-col items-center">
          <div className="text-4xl">🌱</div>
          <div className="w-3 h-8 bg-[#8B6F47] rounded-sm" />
        </div>
      );
    } else if (treeGrowth < 30) {
      return (
        <div className="flex flex-col items-center">
          <div className="text-6xl">🌱</div>
          <div className="w-4 h-12 bg-[#8B6F47] rounded-sm" />
        </div>
      );
    } else if (treeGrowth < 60) {
      return (
        <div className="flex flex-col items-center">
          <div className="text-8xl">🌿</div>
          <div className="w-5 h-16 bg-[#8B6F47] rounded-sm" />
        </div>
      );
    } else if (treeGrowth < 100) {
      return (
        <div className="flex flex-col items-center">
          <div className="text-9xl">🌳</div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center relative">
          <div className="absolute -top-4 -right-4 text-2xl animate-bounce">✨</div>
          <div className="text-9xl">🌳</div>
          <div className="absolute -bottom-2 -left-4 text-2xl">🌺</div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#A8C686] opacity-20 rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D4E7B9] opacity-40 rounded-tr-full" />

      <div className="relative z-10 p-4 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <h1 className="text-[#2C3E2F]">Bonjour {user.name} 👋</h1>
              <p className="text-sm text-[#7A9B6C]">Décembre 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-full">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-[#2C3E2F]">{user.streak} jours</span>
          </div>
        </div>

        {/* Info Tip - Moved above tree */}
        <Card className="mb-4 p-4 bg-[#D4E7B9]/30 border-[#A8C686]/30">
          <p className="text-sm text-[#5C7A5F] text-center">
            💡 Continuez vos efforts ! Chaque action compte pour faire grandir votre arbre.
          </p>
        </Card>

        {/* Tree Display */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-[#A8C686]/30 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4E7B9]/20 rounded-bl-full" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#2C3E2F]">Mon arbre du mois</h2>
              <div className="flex items-center gap-1 text-[#5C7A5F]">
                <Sprout className="w-5 h-5" />
                <span>{treeGrowth}%</span>
              </div>
            </div>

            {/* Tree Visual */}
            <div className="flex justify-center items-end h-64 mb-6">
              {renderTree()}
            </div>

            {/* Growth Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#7A9B6C]">Croissance</span>
                <span className="text-[#5C7A5F]">{treeGrowth}%</span>
              </div>
              <Progress value={treeGrowth || 2} className="h-3" />
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-[#A8C686]/30">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-[#5C7A5F]" />
              <p className="text-sm text-[#7A9B6C]">Objectif</p>
            </div>
            <p className="text-[#2C3E2F]">-{reductionTarget}%</p>
            <p className="text-xs text-[#7A9B6C]">de CO₂</p>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border-[#A8C686]/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-[#5C7A5F]" />
              <p className="text-sm text-[#7A9B6C]">Progression</p>
            </div>
            <p className="text-[#2C3E2F]">{monthlyProgress}%</p>
            <Progress value={monthlyProgress || 2} className="h-1 mt-1" />
          </Card>
        </div>

        {/* Monthly Goals */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30 mb-6">
          <h3 className="text-[#2C3E2F] mb-4">Objectifs du mois</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {userObjectives.map((goal) => (
              <div key={goal.id} className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleObjective(goal.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    goal.done
                      ? 'bg-[#5C7A5F] border-[#5C7A5F]'
                      : 'border-[#A8C686]'
                  }`}
                >
                  {goal.done && <span className="text-white text-xs">✓</span>}
                </button>
                <div className="flex-1">
                  <p
                    className={`text-sm ${
                      goal.done ? 'text-[#7A9B6C] line-through' : 'text-[#2C3E2F]'
                    }`}
                  >
                    {goal.label}
                  </p>
                  <p className="text-xs text-[#A8C686]">{goal.category}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => setShowActionDialog(true)}
            className="w-full bg-[#5C7A5F] hover:bg-[#4A6350] text-white rounded-full py-6"
          >
            <Leaf className="w-5 h-5 mr-2" />
            Enregistrer une action éco-responsable
          </Button>

          <Button
            onClick={() => setShowObjectivesDialog(true)}
            variant="outline"
            className="w-full border-[#5C7A5F] text-[#5C7A5F] hover:bg-[#D4E7B9]/20 rounded-full py-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter des objectifs pour le mois
          </Button>
        </div>
      </div>

      {/* Action Dialog */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#2C3E2F]">Enregistrer une action éco-responsable</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="category" className="text-[#5C7A5F]">Catégorie</Label>
              <select
                id="category"
                value={actionCategory}
                onChange={(e) => setActionCategory(e.target.value)}
                className="w-full mt-2 p-3 border-2 border-[#A8C686]/30 rounded-lg focus:border-[#5C7A5F] focus:outline-none"
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="Transport">🚴 Transport</option>
                <option value="Alimentation">🥗 Alimentation</option>
                <option value="Énergie">⚡ Énergie</option>
                <option value="Eau">💧 Eau</option>
                <option value="Déchets">♻️ Déchets</option>
                <option value="Autre">🌱 Autre</option>
              </select>
            </div>

            <div>
              <Label htmlFor="description" className="text-[#5C7A5F]">Description de l'action</Label>
              <Textarea
                id="description"
                value={actionDescription}
                onChange={(e) => setActionDescription(e.target.value)}
                placeholder="Ex: J'ai pris le vélo pour aller au travail"
                className="mt-2 border-[#A8C686]/50 focus:border-[#5C7A5F] min-h-[100px]"
              />
            </div>

            {actionCategory && (
              <div className="bg-[#D4E7B9]/30 p-4 rounded-lg">
                <p className="text-sm text-[#5C7A5F]">
                  🌱 Cette action ajoutera <span className="font-semibold">+{actionImpacts[actionCategory as keyof typeof actionImpacts]}%</span> à la croissance de votre arbre !
                </p>
              </div>
            )}

            <Button
              onClick={handleAddAction}
              disabled={!actionDescription.trim() || !actionCategory}
              className="w-full bg-[#5C7A5F] hover:bg-[#4A6350] text-white rounded-full py-6 disabled:opacity-50"
            >
              Valider l'action
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Objectives Dialog */}
      <Dialog open={showObjectivesDialog} onOpenChange={setShowObjectivesDialog}>
        <DialogContent className="max-w-md bg-white max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-[#2C3E2F]">Ajouter des objectifs</DialogTitle>
          </DialogHeader>
          
          <div className="overflow-y-auto flex-1 pr-2">
            <div className="space-y-3">
              {availableObjectives.map((objective) => {
                const isAlreadyAdded = userObjectives.some(obj => obj.id === objective.id);
                return (
                  <div
                    key={objective.id}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      isAlreadyAdded
                        ? 'border-[#A8C686]/30 bg-gray-50 opacity-50'
                        : 'border-[#A8C686]/30 hover:border-[#5C7A5F] hover:bg-[#D4E7B9]/10'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm text-[#2C3E2F] mb-1">{objective.label}</p>
                        <p className="text-xs text-[#7A9B6C]">{objective.category}</p>
                      </div>
                      <Button
                        onClick={() => handleAddObjective(objective)}
                        disabled={isAlreadyAdded}
                        size="sm"
                        className="bg-[#5C7A5F] hover:bg-[#4A6350] text-white disabled:opacity-50"
                      >
                        {isAlreadyAdded ? 'Ajouté' : 'Ajouter'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-[#A8C686]/20">
            <Button
              onClick={() => setShowObjectivesDialog(false)}
              variant="outline"
              className="w-full border-[#5C7A5F] text-[#5C7A5F] hover:bg-[#D4E7B9]/20 rounded-full"
            >
              Terminé
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}