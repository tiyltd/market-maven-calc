import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { ShieldAlert, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export function RiskRewardCalculator() {
  const [entry, setEntry] = useState('1.0850');
  const [sl, setSl] = useState('1.0830');
  const [tp, setTp] = useState('1.0910');
  const [ratio, setRatio] = useState<number | null>(null);

  useEffect(() => {
    const e = parseFloat(entry);
    const s = parseFloat(sl);
    const t = parseFloat(tp);

    if (!isNaN(e) && !isNaN(s) && !isNaN(t)) {
      const risk = Math.abs(e - s);
      const reward = Math.abs(t - e);
      if (risk > 0) {
        setRatio(reward / risk);
      } else {
        setRatio(null);
      }
    }
  }, [entry, sl, tp]);

  return (
    <Card className="border-primary/20 shadow-xl overflow-hidden h-full">
      <div className="h-1 bg-primary w-full" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <ShieldAlert className="w-5 h-5" />
          Risk/Reward Calculator
        </CardTitle>
        <CardDescription>Determine if your trade setup has a favorable ratio.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Entry Price</Label>
            <Input value={entry} onChange={(e) => setEntry(e.target.value)} type="number" className="bg-muted/30" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-rose-500 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> Stop Loss
              </Label>
              <Input value={sl} onChange={(e) => setSl(e.target.value)} type="number" className="bg-muted/30 border-rose-500/20" />
            </div>
            <div className="space-y-2">
              <Label className="text-emerald-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Take Profit
              </Label>
              <Input value={tp} onChange={(e) => setTp(e.target.value)} type="number" className="bg-muted/30 border-emerald-500/20" />
            </div>
          </div>
        </div>

        {ratio !== null && (
          <div className="space-y-4">
            <div className={cn(
              "p-6 rounded-2xl border text-center transition-all",
              ratio >= 2 ? "bg-emerald-500/10 border-emerald-500/20" : "bg-orange-500/10 border-orange-500/20"
            )}>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Risk/Reward Ratio</p>
              <div className={cn(
                "text-4xl font-black font-mono",
                ratio >= 2 ? "text-emerald-500" : "text-orange-500"
              )}>
                1 : {ratio.toFixed(2)}
              </div>
              <p className="text-[10px] mt-2 font-bold uppercase tracking-tight">
                {ratio >= 3 ? "Excellent Setup" : ratio >= 2 ? "Good Setup" : "High Risk Setup"}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3 bg-muted/40 rounded-xl">
                <p className="text-[10px] text-muted-foreground uppercase">Potential Loss</p>
                <p className="font-bold text-rose-500">{(Math.abs(parseFloat(entry) - parseFloat(sl))).toFixed(5)} Units</p>
              </div>
              <div className="p-3 bg-muted/40 rounded-xl">
                <p className="text-[10px] text-muted-foreground uppercase">Potential Profit</p>
                <p className="font-bold text-emerald-500">{(Math.abs(parseFloat(tp) - parseFloat(entry))).toFixed(5)} Units</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}