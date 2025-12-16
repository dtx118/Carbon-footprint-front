import { Leaf, Car, Zap, UtensilsCrossed, ShoppingBag, TrendingDown } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

export function Dashboard() {
  const todayCarbon = 12.5;
  const monthlyCarbon = 285;
  const target = 300;
  const saved = 45;

  const categories = [
    { name: '交通', value: 35, icon: Car, color: 'bg-[#5C7A5F]' },
    { name: '能源', value: 28, icon: Zap, color: 'bg-[#7A9B6C]' },
    { name: '饮食', value: 22, icon: UtensilsCrossed, color: 'bg-[#A8C686]' },
    { name: '购物', value: 15, icon: ShoppingBag, color: 'bg-[#C5D9A8]' },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4E7B9]/20 rounded-bl-full" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#5C7A5F]">今日排放</p>
              <Leaf className="w-5 h-5 text-[#5C7A5F]" />
            </div>
            <p className="text-[#2C3E2F] mb-1">{todayCarbon} kg CO₂</p>
            <p className="text-sm text-[#7A9B6C]">比昨天少 2.3 kg</p>
          </div>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#A8C686]/20 rounded-bl-full" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#5C7A5F]">本月排放</p>
              <TrendingDown className="w-5 h-5 text-[#5C7A5F]" />
            </div>
            <p className="text-[#2C3E2F] mb-1">{monthlyCarbon} kg CO₂</p>
            <Progress value={(monthlyCarbon / target) * 100} className="h-2 mt-2" />
            <p className="text-sm text-[#7A9B6C] mt-1">目标: {target} kg</p>
          </div>
        </Card>

        <Card className="p-6 bg-[#5C7A5F] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p>已减少排放</p>
              <Leaf className="w-5 h-5" />
            </div>
            <p className="mb-1">{saved} kg CO₂</p>
            <p className="text-sm opacity-90">相当于种植 2 棵树</p>
          </div>
        </Card>
      </div>

      {/* Categories Breakdown */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30">
        <h2 className="text-[#2C3E2F] mb-6">本周排放分类</h2>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[#2C3E2F]">{category.name}</span>
                </div>
                <span className="text-[#5C7A5F]">{category.value}%</span>
              </div>
              <Progress value={category.value} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activities */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30">
        <h2 className="text-[#2C3E2F] mb-4">最近活动</h2>
        <div className="space-y-3">
          {[
            { activity: '驾车 15 公里', carbon: 3.2, time: '2小时前' },
            { activity: '用电 8 度', carbon: 2.4, time: '5小时前' },
            { activity: '肉类餐饮', carbon: 1.8, time: '昨天' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[#D4E7B9]/20">
              <div>
                <p className="text-[#2C3E2F]">{item.activity}</p>
                <p className="text-sm text-[#7A9B6C]">{item.time}</p>
              </div>
              <div className="text-right">
                <p className="text-[#5C7A5F]">{item.carbon} kg</p>
                <p className="text-sm text-[#7A9B6C]">CO₂</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
