import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Car, Zap, UtensilsCrossed, ShoppingBag, Plane, Home } from 'lucide-react';

export function ActivityTracker() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');

  const categories = [
    { value: 'transport', label: '交通出行', icon: Car, units: ['公里', '小时'] },
    { value: 'energy', label: '能源使用', icon: Zap, units: ['度', '立方米'] },
    { value: 'food', label: '饮食消费', icon: UtensilsCrossed, units: ['份', '克'] },
    { value: 'shopping', label: '购物消费', icon: ShoppingBag, units: ['件', '元'] },
    { value: 'flight', label: '航空旅行', icon: Plane, units: ['公里', '小时'] },
    { value: 'home', label: '家居生活', icon: Home, units: ['天', '次'] },
  ];

  const selectedCategory = categories.find(c => c.value === category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ category, amount, unit });
    // Reset form
    setCategory('');
    setAmount('');
    setUnit('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 bg-white/80 backdrop-blur-sm border-[#A8C686]/30">
        <h2 className="text-[#2C3E2F] mb-6">记录新活动</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-[#5C7A5F]">活动类型</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    category === cat.value
                      ? 'border-[#5C7A5F] bg-[#D4E7B9]/30'
                      : 'border-[#A8C686]/30 hover:border-[#A8C686]'
                  }`}
                >
                  <cat.icon className={`w-6 h-6 mx-auto mb-2 ${
                    category === cat.value ? 'text-[#5C7A5F]' : 'text-[#7A9B6C]'
                  }`} />
                  <p className="text-sm text-[#2C3E2F]">{cat.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-[#5C7A5F]">数量</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="输入数量"
              className="border-[#A8C686]/50 focus:border-[#5C7A5F]"
            />
          </div>

          {/* Unit Selection */}
          {selectedCategory && (
            <div className="space-y-2">
              <Label htmlFor="unit" className="text-[#5C7A5F]">单位</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="border-[#A8C686]/50 focus:border-[#5C7A5F]">
                  <SelectValue placeholder="选择单位" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCategory.units.map((u) => (
                    <SelectItem key={u} value={u}>{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Estimated Carbon */}
          {category && amount && (
            <Card className="p-4 bg-[#D4E7B9]/20 border-[#A8C686]/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#7A9B6C]">预计碳排放</p>
                  <p className="text-[#2C3E2F]">约 {(parseFloat(amount) * 0.5).toFixed(1)} kg CO₂</p>
                </div>
                <div className="w-12 h-12 bg-[#5C7A5F] rounded-full flex items-center justify-center">
                  <span className="text-white">CO₂</span>
                </div>
              </div>
            </Card>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!category || !amount || !unit}
            className="w-full bg-[#5C7A5F] hover:bg-[#4A6350] text-white rounded-full py-6"
          >
            添加记录
          </Button>
        </form>
      </Card>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Card className="p-4 bg-white/60 backdrop-blur-sm border-[#A8C686]/30 text-center">
          <p className="text-sm text-[#7A9B6C] mb-1">今日已记录</p>
          <p className="text-[#2C3E2F]">5 项活动</p>
        </Card>
        <Card className="p-4 bg-white/60 backdrop-blur-sm border-[#A8C686]/30 text-center">
          <p className="text-sm text-[#7A9B6C] mb-1">本周已记录</p>
          <p className="text-[#2C3E2F]">23 项活动</p>
        </Card>
      </div>
    </div>
  );
}
