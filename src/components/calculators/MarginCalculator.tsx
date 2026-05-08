import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { BarChart3, Info } from 'lucide-react';
import { useAsset } from '../../hooks/use-asset';

export function MarginCalculator() {
  const { selectedAsset } = useAsset();
  const [leverage, setLeverage] = useState('100');
  const [lots, setLots] = useState('1');
  const [price, setPrice] = useState('1.0850');
  const [margin, setMargin] = useState<number | null>(null);

  useEffect(() => {
    // Initial price based on asset type if not manually changed?
    // For now we just use a reasonable default if it looks like the old value
    if (price === '1.0850') {
      if (selectedAsset.type === 'crypto') setPrice('65000');
      else if (selectedAsset.type === 'synthetic') setPrice('1000');
      else setPrice('1.0850');
    }
  }, [selectedAsset.symbol]);

  useEffect(() => {
    const l = parseFloat(leverage);
    const contractSize = selectedAsset.contractSize;
    const sz = parseFloat(lots) * contractSize;
    const p = parseFloat(price);

    if (!isNaN(l) && !isNaN(sz) && !isNaN(p) && l > 0) {
      setMargin((sz * p) / l);
    }
  }, [leverage, lots, price, selectedAsset]);

  return (
    <Card className="border-primary/20 shadow-xl overflow-hidden h-full glass-panel">
      <div className="h-1 bg-primary w-full" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <BarChart3 className="w-5 h-5" />
          Margin Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Asset</Label>
          <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground">{selectedAsset.symbol}</p>
              <p className="text-[10px] text-muted-foreground uppercase">{selectedAsset.name}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Contract Size</p>
              <p className="font-mono text-xs">{selectedAsset.contractSize.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Leverage (1:X)</Label>
            <Input 
              value={leverage} 
              onChange={(e) => setLeverage(e.target.value)} 
              type="number" 
              className="bg-muted/30 border-none h-12 text-lg font-mono font-bold" 
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lot Size</Label>
            <Input 
              value={lots} 
              onChange={(e) => setLots(e.target.value)} 
              type="number" 
              className="bg-muted/30 border-none h-12 text-lg font-mono font-bold" 
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Current Price</Label>
          <Input 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            type="number" 
            className="bg-muted/30 border-none h-12 text-lg font-mono font-bold" 
          />
        </div>

        {margin !== null && (
          <div className="mt-6 p-8 bg-brand-blue/5 rounded-3xl border border-primary/10 text-center relative overflow-hidden">
            <div className="absolute -top-6 -right-6 opacity-5">
               <BarChart3 className="w-24 h-24" />
            </div>
            <p className="text-xs font-black text-primary uppercase tracking-widest">Required Margin</p>
            <div className="text-5xl font-black text-foreground font-mono tracking-tighter">
              ${margin.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="mt-4 pt-4 border-t border-primary/10">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Total Position Value</p>
              <p className="text-xl font-black text-foreground">${(parseFloat(lots) * selectedAsset.contractSize * parseFloat(price)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl text-[10px] text-muted-foreground border border-primary/5">
          <Info className="w-4 h-4 text-primary flex-shrink-0" />
          <p>Margin required to open {lots} lot(s) of {selectedAsset.symbol} with 1:{leverage} leverage.</p>
        </div>
      </CardContent>
    </Card>
  );
}