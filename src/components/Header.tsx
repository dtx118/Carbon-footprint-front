import { Leaf } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'track' | 'stats' | 'tips';
  setActiveTab: (tab: 'dashboard' | 'track' | 'stats' | 'tips') => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="relative z-20 pt-8 pb-6">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="w-16 h-16 bg-[#A8C686] rounded-full flex items-center justify-center border-4 border-[#5C7A5F]">
              <Leaf className="w-8 h-8 text-[#5C7A5F]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#D4E7B9] rounded-full border-2 border-[#5C7A5F]" />
          </div>
          <div className="ml-4">
            <h1 className="text-[#2C3E2F]">
              <span className="italic">碳</span>
              <span className="text-[#5C7A5F]">足迹</span>
              <span className="italic">追踪</span>
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-white/60 backdrop-blur-sm rounded-full px-2 py-2 max-w-2xl mx-auto border border-[#A8C686]/30">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 px-6 py-3 rounded-full transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#5C7A5F] text-white'
                  : 'text-[#5C7A5F] hover:bg-[#D4E7B9]/50'
              }`}
            >
              仪表盘
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`flex-1 px-6 py-3 rounded-full transition-all ${
                activeTab === 'track'
                  ? 'bg-[#5C7A5F] text-white'
                  : 'text-[#5C7A5F] hover:bg-[#D4E7B9]/50'
              }`}
            >
              记录活动
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 px-6 py-3 rounded-full transition-all ${
                activeTab === 'stats'
                  ? 'bg-[#5C7A5F] text-white'
                  : 'text-[#5C7A5F] hover:bg-[#D4E7B9]/50'
              }`}
            >
              统计数据
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`flex-1 px-6 py-3 rounded-full transition-all ${
                activeTab === 'tips'
                  ? 'bg-[#5C7A5F] text-white'
                  : 'text-[#5C7A5F] hover:bg-[#D4E7B9]/50'
              }`}
            >
              环保建议
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
