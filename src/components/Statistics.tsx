import { Card } from './ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function Statistics() {
  const weeklyData = [
    { day: '周一', carbon: 15.2 },
    { day: '周二', carbon: 12.8 },
    { day: '周三', carbon: 18.5 },
    { day: '周四', carbon: 11.3 },
    { day: '周五', carbon: 14.7 },
    { day: '周六', carbon: 9.2 },
    { day: '周日', carbon: 8.5 },
  ];

  const monthlyData = [
    { month: '1月', carbon: 320 },
    { month: '2月', carbon: 295 },
    { month: '3月', carbon: 310 },
    { month: '4月', carbon: 285 },
    { month: '5月', carbon: 270 },
    { month: '6月', carbon: 265 },
  ];

  const categoryData = [
    { name: '交通', value: 35, color: '#5C7A5F' },
    { name: '能源', value: 28, color: '#7A9B6C' },
    { name: '饮食', value: 22, color: '#A8C686' },
    { name: '购物', value: 15, color: '#C5D9A8' },
  ];

  return (
    <div className="space-y-6">
      {/* Weekly Trend */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30">
        <h2 className="text-[#2C3E2F] mb-6">本周碳排放趋势</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#A8C686" opacity={0.3} />
            <XAxis dataKey="day" stroke="#5C7A5F" />
            <YAxis stroke="#5C7A5F" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FEFDE8', 
                border: '1px solid #A8C686',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="carbon" 
              stroke="#5C7A5F" 
              strokeWidth={3}
              dot={{ fill: '#5C7A5F', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-center text-sm text-[#7A9B6C] mt-4">单位: kg CO₂</p>
      </Card>

      {/* Monthly Comparison */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30">
        <h2 className="text-[#2C3E2F] mb-6">月度对比</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#A8C686" opacity={0.3} />
            <XAxis dataKey="month" stroke="#5C7A5F" />
            <YAxis stroke="#5C7A5F" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FEFDE8', 
                border: '1px solid #A8C686',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="carbon" fill="#5C7A5F" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-center text-sm text-[#7A9B6C] mt-4">单位: kg CO₂</p>
      </Card>

      {/* Category Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30">
          <h2 className="text-[#2C3E2F] mb-6">排放分类占比</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FEFDE8', 
                  border: '1px solid #A8C686',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Summary Stats */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#A8C686]/30">
          <h2 className="text-[#2C3E2F] mb-6">统计摘要</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[#D4E7B9]/20">
              <p className="text-sm text-[#7A9B6C]">平均每日排放</p>
              <p className="text-[#2C3E2F]">12.9 kg CO₂</p>
            </div>
            <div className="p-4 rounded-lg bg-[#A8C686]/20">
              <p className="text-sm text-[#7A9B6C]">最低单日排放</p>
              <p className="text-[#2C3E2F]">8.5 kg CO₂ (周日)</p>
            </div>
            <div className="p-4 rounded-lg bg-[#5C7A5F]/20">
              <p className="text-sm text-[#2C3E2F]">最高单日排放</p>
              <p className="text-[#2C3E2F]">18.5 kg CO₂ (周三)</p>
            </div>
            <div className="p-4 rounded-lg bg-[#5C7A5F] text-white">
              <p className="text-sm opacity-90">本月减排进度</p>
              <p>比上月减少 6.7%</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
