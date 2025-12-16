import { useState } from 'react';
import { TreeGrowth } from './TreeGrowth';
import { VirtualForest } from './VirtualForest';
import { DailyQuiz } from './DailyQuiz';
import { Community } from './Community';
import { GroupMode } from './GroupMode';
import { Settings } from './Settings';
import { Home, Trees, Brain, Users, Flower2, Settings as SettingsIcon } from 'lucide-react';
import type { User } from '../App';

interface MainAppProps {
  user: User;
  setUser: (user: User) => void;
  onLogout: () => void;
}

export function MainApp({ user, setUser, onLogout }: MainAppProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'forest' | 'quiz' | 'community' | 'group' | 'settings'>('home');

  const handleTabChange = (tab: 'home' | 'forest' | 'quiz' | 'community' | 'group' | 'settings') => {
    setActiveTab(tab);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#FEFDE8] pb-24">
      {/* Content */}
      <div className="relative z-10">
        {activeTab === 'home' && <TreeGrowth user={user} setUser={setUser} />}
        {activeTab === 'forest' && <VirtualForest user={user} />}
        {activeTab === 'quiz' && <DailyQuiz user={user} setUser={setUser} />}
        {activeTab === 'community' && <Community />}
        {activeTab === 'group' && <GroupMode user={user} />}
        {activeTab === 'settings' && <Settings user={user} onLogout={onLogout} />}
      </div>

      {/* Bottom Navigation - Redesigned with centered Home button */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-[#A8C686]/30 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="grid grid-cols-5 gap-2 items-end">
            {/* Left Section - Progression */}
            <button
              onClick={() => handleTabChange('forest')}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeTab === 'forest'
                  ? 'text-[#5C7A5F] bg-[#D4E7B9]/30'
                  : 'text-[#A8C686]'
              }`}
            >
              <Trees className="w-5 h-5" />
              <span className="text-xs">Forêt</span>
            </button>

            <button
              onClick={() => handleTabChange('quiz')}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeTab === 'quiz'
                  ? 'text-[#5C7A5F] bg-[#D4E7B9]/30'
                  : 'text-[#A8C686]'
              }`}
            >
              <Brain className="w-5 h-5" />
              <span className="text-xs">Quiz</span>
            </button>

            {/* Center - Home Button (Larger) */}
            <button
              onClick={() => handleTabChange('home')}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all shadow-lg -mt-4 ${
                activeTab === 'home'
                  ? 'text-white bg-gradient-to-br from-[#5C7A5F] to-[#4A6350] scale-105'
                  : 'text-[#5C7A5F] bg-white border-2 border-[#A8C686]'
              }`}
            >
              <Home className="w-7 h-7" />
              <span className="text-xs font-medium">Arbre</span>
            </button>

            {/* Right Section - Social */}
            <button
              onClick={() => handleTabChange('community')}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeTab === 'community'
                  ? 'text-[#5C7A5F] bg-[#D4E7B9]/30'
                  : 'text-[#A8C686]'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="text-xs">Social</span>
            </button>

            <button
              onClick={() => handleTabChange('group')}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeTab === 'group'
                  ? 'text-[#5C7A5F] bg-[#D4E7B9]/30'
                  : 'text-[#A8C686]'
              }`}
            >
              <Flower2 className="w-5 h-5" />
              <span className="text-xs">Clairières</span>
            </button>
          </div>
          
          {/* Settings button - separate row below */}
          <div className="flex justify-center mt-2 pt-2 border-t border-[#A8C686]/10">
            <button
              onClick={() => handleTabChange('settings')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-colors text-xs ${
                activeTab === 'settings'
                  ? 'text-[#5C7A5F] bg-[#D4E7B9]/50'
                  : 'text-[#A8C686] hover:text-[#7A9B6C]'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Réglages</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}