import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FOREX_PAIRS, CRYPTO_ASSETS, DERIV_INDICES, Asset } from '../lib/constants';

interface AssetContextType {
  selectedAsset: Asset;
  setSelectedAsset: (asset: Asset) => void;
}

const defaultAsset: Asset = FOREX_PAIRS[0];

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export function AssetProvider({ children }: { children: ReactNode }) {
  const [selectedAsset, setSelectedAsset] = useState<Asset>(defaultAsset);

  return (
    <AssetContext.Provider value={{ selectedAsset, setSelectedAsset }}>
      {children}
    </AssetContext.Provider>
  );
}

export function useAsset() {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAsset must be used within an AssetProvider');
  }
  return context;
}