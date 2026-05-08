import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { History, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('1000');
  const [dailyRate, setDailyRate] = useState('1');
  const [days, setDays] = useState('30');
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const p = parseFloat(principal);
    const r = parseFloat(dailyRate) / 100;
    const d = parseInt(days);

    if (!isNaN(p) && !isNaN(r) && !isNaN(d)) {
      const chartData = [];
      let current = p;
      for (let i = 0; i <= d; i++) {
        chartData.push({ day: i, balance: current });
        current = current * (1 + r);
      }
      setData(chartData);
    }
  }, [principal, dailyRate, days]);

  const finalBalance = data.length > 0 ? data[data.length - 1].balance : 0;
  const totalProfit = finalBalance - parseFloat(principal);

  return (
    <Card className="border-primary/20 shadow-xl overflow-hidden h-full">
      <div className="h-1 bg-primary w-full" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <History className="w-5 h-5" />
          Compound Growth
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Initial Balance ($)</Label>
            <Input value={principal} onChange={(e) => setPrincipal(e.target.value)} type="number" className="bg-muted/30" />
          </div>
          <div className="space-y-2">
            <Label>Daily Interest (%)</Label>
            <Input value={dailyRate} onChange={(e) => setDailyRate(e.target.value)} type="number" className="bg-muted/30" />
          </div>
          <div className="space-y-2">
            <Label>Duration (Days)</Label>
            <Input value={days} onChange={(e) => setDays(e.target.value)} type="number" className="bg-muted/30" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
            <p className="text-[10px] text-muted-foreground uppercase">Ending Balance</p>
            <p className="text-xl font-bold text-primary">${finalBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          </div>
          <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
            <p className="text-[10px] text-muted-foreground uppercase">Total Profit</p>
            <p className="text-xl font-bold text-emerald-500">+${totalProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="h-[200px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                formatter={(value: any) => [`$${parseFloat(value).toFixed(2)}`, 'Balance']}
              />
              <Area type="monotone" dataKey="balance" stroke="var(--primary)" fillOpacity={1} fill="url(#colorBalance)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}