import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MarketCard } from './MarketCard';
import { Search, Filter, CheckCircle2 } from 'lucide-react';
import { Input } from '../ui/input';
import { ALL_ASSETS, AssetType } from '../../lib/constants';
import { useAsset } from '../../hooks/use-asset';

type MarketItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  type: AssetType;
};

export function MarketOverview() {
  const { selectedAsset, setSelectedAsset } = useAsset();
  const [prices, setPrices] = useState<MarketItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | AssetType>('all');

  useEffect(() => {
    // Initial data setup
    const initialData: MarketItem[] = ALL_ASSETS.map(asset => ({
      symbol: asset.symbol,
      name: asset.name,
      price: asset.type === 'crypto' 
        ? (asset.symbol.includes('BTC') ? 65000 : (asset.symbol.includes('ETH') ? 3500 : 100))
        : (asset.type === 'synthetic' ? Math.random() * 10000 : 1.0 + Math.random() * 0.5),
      change: 0,
      type: asset.type
    }));
    setPrices(initialData);

    const interval = setInterval(() => {
      setPrices(current => 
        current.map(p => {
          const changePercent = (Math.random() - 0.5) * 0.002;
          return {
            ...p,
            price: p.price * (1 + changePercent),
            change: changePercent * 100
          };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredPrices = prices.filter(p => {
    const matchesSearch = p.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                          (activeFilter === 'major' && p.type === 'major') ||
                          (activeFilter === 'minor' && p.type === 'minor') ||
                          (activeFilter === 'exotic' && p.type === 'exotic') ||
                          (activeFilter === 'crypto' && p.type === 'crypto') ||
                          (activeFilter === 'synthetic' && p.type === 'synthetic');
    return matchesSearch && matchesFilter;
  });

  const handleSelect = (symbol: string) => {
    const asset = ALL_ASSETS.find(a => a.symbol === symbol);
    if (asset) {
      setSelectedAsset(asset);
    }
  };

  return (
    <Card className="border-border/50 shadow-xl glass-panel sticky top-20 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl font-black flex items-center gap-2">
            Market Watch
          </CardTitle>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Live Updates</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pairs or indices..."
              className="pl-9 bg-muted/40 border-none h-10 text-sm rounded-xl focus-visible:ring-primary/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {['all', 'major', 'minor', 'exotic', 'crypto', 'synthetic'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f as any)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all flex-shrink-0 ${
                  activeFilter === f 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 max-h-[calc(100vh-350px)] overflow-y-auto pr-2 custom-scrollbar p-0">
        <div className="px-4 pb-4">
           <p className="text-[10px] text-muted-foreground font-bold uppercase mb-3 tracking-widest">Selected: <span className="text-primary">{selectedAsset.symbol}</span></p>
          {filteredPrices.length > 0 ? (
            <div className="grid grid-cols-1 gap-1.5">
              {filteredPrices.map(p => (
                <div 
                  key={p.symbol} 
                  onClick={() => handleSelect(p.symbol)}
                  className={`cursor-pointer transition-all duration-200 rounded-xl overflow-hidden relative ${
                    selectedAsset.symbol === p.symbol ? 'ring-2 ring-primary' : 'hover:bg-muted/30'
                  }`}
                >
                  {selectedAsset.symbol === p.symbol && (
                    <div className="absolute top-1 right-1 z-10">
                      <CheckCircle2 className="w-4 h-4 text-primary fill-background" />
                    </div>
                  )}
                  <MarketCard {...p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground text-sm">
              No assets found matching "{searchTerm}"
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}