import React, { useState, useEffect } from 'react';
import { MarketOverview } from './components/market/MarketOverview';
import { Header } from './components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { LotSizeCalculator } from './components/calculators/LotSizeCalculator';
import { RiskRewardCalculator } from './components/calculators/RiskRewardCalculator';
import { PipValueCalculator } from './components/calculators/PipValueCalculator';
import { MarginCalculator } from './components/calculators/MarginCalculator';
import { CompoundInterestCalculator } from './components/calculators/CompoundInterestCalculator';
import { ProfitLossCalculator } from './components/calculators/ProfitLossCalculator';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Toaster } from './components/ui/sonner';
import { AssetProvider } from './hooks/use-asset';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, BarChart3, TrendingUp, ShieldAlert, History } from 'lucide-react';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  // Hidden admin access: Press 'Alt + A'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') {
        setShowAdmin(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AssetProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <AnimatePresence mode="wait">
            {showAdmin ? (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <AdminDashboard onClose={() => setShowAdmin(false)} />
              </motion.div>
            ) : (
              <motion.div
                key="main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Market Sidebar */}
                  <div className="lg:col-span-4 space-y-6">
                    <MarketOverview />
                  </div>

                  {/* Main Content Area */}
                  <div className="lg:col-span-8">
                    <Tabs defaultValue="lot-size" className="w-full">
                      <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2 scrollbar-hide">
                        <TabsList className="bg-muted/50 p-1 rounded-xl border border-border">
                          <TabsTrigger value="lot-size" className="gap-2 px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <Calculator className="w-4 h-4" />
                            <span className="hidden sm:inline">Lot Size</span>
                          </TabsTrigger>
                          <TabsTrigger value="risk-reward" className="gap-2 px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <ShieldAlert className="w-4 h-4" />
                            <span className="hidden sm:inline">Risk/Reward</span>
                          </TabsTrigger>
                          <TabsTrigger value="pip-value" className="gap-2 px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <TrendingUp className="w-4 h-4" />
                            <span className="hidden sm:inline">Pip Value</span>
                          </TabsTrigger>
                          <TabsTrigger value="margin" className="gap-2 px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <BarChart3 className="w-4 h-4" />
                            <span className="hidden sm:inline">Margin</span>
                          </TabsTrigger>
                          <TabsTrigger value="compound" className="gap-2 px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <History className="w-4 h-4" />
                            <span className="hidden sm:inline">Compound</span>
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <AnimatePresence mode="wait">
                        <TabsContent value="lot-size">
                          <LotSizeCalculator />
                        </TabsContent>
                        <TabsContent value="risk-reward">
                          <RiskRewardCalculator />
                        </TabsContent>
                        <TabsContent value="pip-value">
                          <PipValueCalculator />
                        </TabsContent>
                        <TabsContent value="margin">
                          <MarginCalculator />
                        </TabsContent>
                        <TabsContent value="compound">
                          <CompoundInterestCalculator />
                        </TabsContent>
                      </AnimatePresence>
                    </Tabs>
                    
                    <div className="mt-8">
                      <ProfitLossCalculator />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="border-t border-border mt-12 py-8 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground text-sm">
              \u00a9 {new Date().getFullYear()} TIY LTD Forex Calculator. All market data is for educational purposes only.
            </p>
          </div>
        </footer>

        <Toaster position="bottom-right" richColors />
      </div>
    </AssetProvider>
  );
}

export default App;