import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MarketCardProps {
  symbol: string;
  price: number;
  change: number;
  type: string;
}

export function MarketCard({ symbol, price, change, type }: MarketCardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      layout
      className="group flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/60 border border-transparent hover:border-border/50 transition-all cursor-pointer"
    >
      <div className="flex flex-col">
        <span className="font-bold text-sm tracking-tight">{symbol}</span>
        <span className="text-[10px] text-muted-foreground capitalize">{type}</span>
      </div>
      
      <div className="text-right">
        <div className="font-mono text-sm font-semibold">
          {price.toLocaleString(undefined, { minimumFractionDigits: type === 'crypto' ? 2 : 4, maximumFractionDigits: type === 'crypto' ? 2 : 5 })}
        </div>
        <div className={cn(
          "flex items-center justify-end text-[10px] font-bold",
          isPositive ? "text-emerald-500" : "text-rose-500"
        )}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
          {Math.abs(change).toFixed(2)}%
        </div>
      </div>
    </motion.div>
  );
}