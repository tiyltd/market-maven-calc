import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { TrendingUp, Info } from 'lucide-react';
import { useAsset } from '../../hooks/use-asset';

export function PipValueCalculator() {
  const { selectedAsset } = useAsset();
  const [lots, setLots] = useState('1');
  const [pipValue, setPipValue] = useState<number>(10);

  useEffect(() => {
    // Logic: Pip Value = (Pip Size * Contract Size) * Lot Size
    // For XXX/USD, Pip Value is roughly (0.0001 * 100,000) = 10 USD per lot
    // For Cryptos like BTC/USD, Pip Value is (0.01 * 1) = 0.01 USD per unit? 
    // Actually brokers vary, but let's use the standard formula.
    
    const l = parseFloat(lots || '0');
    const value = (selectedAsset.pipSize * selectedAsset.contractSize) * l;
    
    setPipValue(value);
  }, [selectedAsset, lots]);

  return (
    <Card className="border-primary/20 shadow-xl overflow-hidden h-full glass-panel">
      <div className="h-1 bg-primary w-full" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <TrendingUp className="w-5 h-5" />
          Pip Value Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lot Size</Label>
            <Input 
              value={lots} 
              onChange={(e) => setLots(e.target.value)} 
              type="number" 
              className="bg-muted/30 border-none h-12 text-lg font-mono font-bold" 
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Instrument</Label>
            <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{selectedAsset.symbol}</p>
                <p className="text-[10px] text-muted-foreground uppercase">{selectedAsset.name}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Pip Size</p>
                <p className="font-mono text-xs">{selectedAsset.pipSize}</p>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground italic">Select a different pair from the Market Watch sidebar</p>
          </div>
        </div>

        <div className="p-8 bg-brand-blue/5 rounded-3xl border border-primary/10 text-center space-y-3 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 opacity-5">
             <TrendingUp className="w-24 h-24" />
          </div>
          <p className="text-xs font-black text-primary uppercase tracking-widest">Value per Pip</p>
          <div className="text-5xl font-black text-foreground font-mono tracking-tighter">
            ${pipValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
          </div>
          <p className="text-xs text-muted-foreground italic">Based on {lots} lot(s)</p>
          
          <div className="flex justify-center gap-4 pt-4 border-t border-primary/10 mt-4">
             <div className="text-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Mini (0.1)</p>
                <p className="font-bold text-sm text-primary">${(pipValue * 0.1).toFixed(2)}</p>
             </div>
             <div className="text-center border-l border-primary/10 pl-4">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Micro (0.01)</p>
                <p className="font-bold text-sm text-primary">${(pipValue * 0.01).toFixed(2)}</p>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl text-[10px] text-muted-foreground border border-border">
          <Info className="w-4 h-4 text-primary flex-shrink-0" />
          <p>This calculation uses the standard contract size of {selectedAsset.contractSize.toLocaleString()} units. Real-world values may vary by broker.</p>
        </div>
      </CardContent>
    </Card>
  );
}