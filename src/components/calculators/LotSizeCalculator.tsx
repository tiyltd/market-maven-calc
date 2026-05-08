import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Info, Calculator, Target, ShieldAlert } from 'lucide-react';
import { useAsset } from '../../hooks/use-asset';

export function LotSizeCalculator() {
  const { selectedAsset } = useAsset();
  const [balance, setBalance] = useState('1000');
  const [risk, setRisk] = useState('1');
  const [stopLoss, setStopLoss] = useState('20');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const b = parseFloat(balance);
    const r = parseFloat(risk) / 100;
    const sl = parseFloat(stopLoss);
    
    if (isNaN(b) || isNaN(r) || isNaN(sl) || sl <= 0) return;

    // Logic: Position Size = (Risk Amount) / (Stop Loss * Pip Value per 1 Lot)
    const pipValuePerLot = selectedAsset.pipSize * selectedAsset.contractSize;
    const riskAmount = b * r;
    const lotSize = riskAmount / (sl * pipValuePerLot);
    
    setResult(lotSize);
  };

  useEffect(() => {
    calculate();
  }, [balance, risk, stopLoss, selectedAsset]);

  return (
    <Card className="border-primary/20 shadow-2xl overflow-hidden card-hover-effect glass-panel">
      <div className="h-2 bg-brand-gradient w-full" />
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-2">
            <Calculator className="w-6 h-6 text-primary" />
            Lot Size
          </CardTitle>
          <div className="bg-primary/10 text-primary p-2 rounded-xl">
            <Target className="w-5 h-5" />
          </div>
        </div>
        <CardDescription>Precision position sizing for professional risk management.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Account Balance ($)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
                <Input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="pl-8 bg-muted/30 border-none h-12 text-lg font-mono font-bold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Risk Percentage (%)</Label>
              <Input
                type="number"
                value={risk}
                onChange={(e) => setRisk(e.target.value)}
                className="bg-muted/30 border-none h-12 text-lg font-mono font-bold"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Stop Loss (Pips)</Label>
              <Input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                className="bg-muted/30 border-none h-12 text-lg font-mono font-bold"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Asset</Label>
              <div className="p-3 bg-muted/30 rounded-xl flex items-center justify-between h-12">
                 <span className="font-bold">{selectedAsset.symbol}</span>
                 <span className="text-[10px] text-primary uppercase font-black bg-primary/10 px-2 py-0.5 rounded">{selectedAsset.type}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Select pair in Market Watch</p>
            </div>
          </div>
        </div>

        {result !== null && (
          <div className="mt-8 p-8 bg-brand-blue/5 rounded-3xl border border-primary/10 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <ShieldAlert className="w-24 h-24" />
            </div>
            <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-2">Recommended Position Size</p>
            <div className="text-6xl font-black text-foreground font-mono tracking-tighter">
              {result.toFixed(3)} <span className="text-xl font-medium text-muted-foreground">Lots</span>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-8 pt-8 border-t border-primary/10">
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Cash at Risk</p>
                <p className="text-2xl font-black text-rose-500">${(parseFloat(balance) * (parseFloat(risk)/100)).toFixed(2)}</p>
              </div>
              <div className="text-center border-l border-primary/10">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Contract Value</p>
                <p className="text-2xl font-black text-primary">${(result * selectedAsset.contractSize).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl text-xs text-muted-foreground border border-primary/5">
          <Info className="w-5 h-5 text-primary flex-shrink-0" />
          <p>Calculation for {selectedAsset.symbol} with pip size {selectedAsset.pipSize}.</p>
        </div>
      </CardContent>
    </Card>
  );
}