import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { DollarSign, ArrowRightLeft } from 'lucide-react';

export function ProfitLossCalculator() {
  const [type, setType] = useState<'buy' | 'sell'>('buy');
  const [entry, setEntry] = useState('1.0850');
  const [exit, setExit] = useState('1.0950');
  const [lots, setLots] = useState('0.1');
  const [profit, setProfit] = useState<number>(0);

  useEffect(() => {
    const e = parseFloat(entry);
    const x = parseFloat(exit);
    const l = parseFloat(lots);
    
    if (!isNaN(e) && !isNaN(x) && !isNaN(l)) {
      const pips = type === 'buy' ? (x - e) : (e - x);
      const standardPipValue = 10; // per standard lot
      setProfit(pips * 10000 * l * (standardPipValue / 10)); // Simplified
    }
  }, [type, entry, exit, lots]);

  return (
    <Card className="border-border shadow-md bg-muted/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-primary" />
            Quick Profit/Loss Estimator
          </div>
          <div className="flex gap-1 bg-background p-1 rounded-lg border border-border">
            <button
              onClick={() => setType('buy')}
              className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all ${type === 'buy' ? 'bg-emerald-500 text-white' : 'hover:bg-muted'}`}
            >
              Buy
            </button>
            <button
              onClick={() => setType('sell')}
              className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all ${type === 'sell' ? 'bg-rose-500 text-white' : 'hover:bg-muted'}`}
            >
              Sell
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase text-muted-foreground">Entry</Label>
            <Input value={entry} onChange={(e) => setEntry(e.target.value)} type="number" className="h-9 bg-background" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase text-muted-foreground">Exit</Label>
            <Input value={exit} onChange={(e) => setExit(e.target.value)} type="number" className="h-9 bg-background" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase text-muted-foreground">Lots</Label>
            <Input value={lots} onChange={(e) => setLots(e.target.value)} type="number" className="h-9 bg-background" />
          </div>
          <div className={`p-2.5 rounded-lg border flex items-center justify-between ${profit >= 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
            <span className="text-[10px] font-bold uppercase text-muted-foreground">Profit</span>
            <span className={`font-mono font-bold ${profit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {profit >= 0 ? '+' : ''}{profit.toFixed(2)} USD
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}