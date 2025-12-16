import { Card } from './ui/card';
import { Lightbulb, Bike, Leaf, Droplet, Recycle, Sun } from 'lucide-react';

export function Tips() {
  const tips = [
    {
      icon: Bike,
      title: '绿色出行',
      description: '选择公共交通、骑行或步行代替开车，每天可减少约5kg CO₂排放。',
      impact: '高影响',
      color: 'bg-[#5C7A5F]',
    },
    {
      icon: Leaf,
      title: '植物性饮食',
      description: '每周尝试1-2天的素食，可以减少约30%的饮食相关碳排放。',
      impact: '中影响',
      color: 'bg-[#7A9B6C]',
    },
    {
      icon: Lightbulb,
      title: '节能照明',
      description: '使用LED灯泡，比传统灯泡节能75%，寿命更长。',
      impact: '中影响',
      color: 'bg-[#A8C686]',
    },
    {
      icon: Droplet,
      title: '节约用水',
      description: '缩短淋浴时间，修复漏水，每月可节省大量水资源和能源。',
      impact: '低影响',
      color: 'bg-[#C5D9A8]',
    },
    {
      icon: Recycle,
      title: '垃圾分类',
      description: '正确分类回收垃圾，减少填埋场甲烷排放。',
      impact: '中影响',
      color: 'bg-[#7A9B6C]',
    },
    {
      icon: Sun,
      title: '自然采光',
      description: '白天尽量使用自然光，减少人工照明的使用。',
      impact: '低影响',
      color: 'bg-[#A8C686]',
    },
  ];

  const challenges = [
    {
      title: '本周挑战：零碳通勤',
      description: '尝试一周内使用公共交通或骑行上下班',
      reward: '可减少约 25 kg CO₂',
      progress: 60,
    },
    {
      title: '本月挑战：减少肉食',
      description: '每周至少3天选择素食餐',
      reward: '可减少约 40 kg CO₂',
      progress: 35,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-[#5C7A5F] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-bl-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb className="w-8 h-8" />
            <h2>环保小贴士</h2>
          </div>
          <p className="opacity-90">每个小改变都能为地球做出贡献</p>
        </div>
      </Card>

      {/* Active Challenges */}
      <div className="space-y-4">
        <h3 className="text-[#2C3E2F]">正在进行的挑战</h3>
        {challenges.map((challenge, index) => (
          <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-[#2C3E2F] mb-2">{challenge.title}</h4>
                <p className="text-sm text-[#7A9B6C]">{challenge.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#5C7A5F]">{challenge.progress}%</p>
              </div>
            </div>
            <div className="w-full bg-[#D4E7B9]/30 rounded-full h-2 mb-2">
              <div 
                className="bg-[#5C7A5F] h-2 rounded-full transition-all"
                style={{ width: `${challenge.progress}%` }}
              />
            </div>
            <p className="text-sm text-[#5C7A5F]">🌱 {challenge.reward}</p>
          </Card>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className={`${tip.color} p-3 rounded-xl`}>
                <tip.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[#2C3E2F]">{tip.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    tip.impact === '高影响' ? 'bg-[#5C7A5F] text-white' :
                    tip.impact === '中影响' ? 'bg-[#A8C686] text-[#2C3E2F]' :
                    'bg-[#D4E7B9] text-[#5C7A5F]'
                  }`}>
                    {tip.impact}
                  </span>
                </div>
                <p className="text-sm text-[#7A9B6C]">{tip.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Educational Section */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30">
        <h3 className="text-[#2C3E2F] mb-4">你知道吗？</h3>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-[#D4E7B9]/20 border-l-4 border-[#5C7A5F]">
            <p className="text-[#2C3E2F]">一棵成年树每年可以吸收约 22 kg 的 CO₂</p>
          </div>
          <div className="p-4 rounded-lg bg-[#A8C686]/20 border-l-4 border-[#7A9B6C]">
            <p className="text-[#2C3E2F]">生产1kg牛肉会产生约 27 kg 的温室气体排放</p>
          </div>
          <div className="p-4 rounded-lg bg-[#C5D9A8]/30 border-l-4 border-[#A8C686]">
            <p className="text-[#2C3E2F]">回收1吨纸张可以节省约 17 棵树</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
