export type AssetType = 'major' | 'minor' | 'exotic' | 'crypto' | 'synthetic';

export interface Asset {
  symbol: string;
  name: string;
  type: AssetType;
  pipSize: number;
  contractSize: number;
}

export const FOREX_PAIRS: Asset[] = [
  // Majors
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', type: 'major', pipSize: 0.0001, contractSize: 100000 },
  { symbol: 'GBP/USD', name: 'British Pound / US Dollar', type: 'major', pipSize: 0.0001, contractSize: 100000 },
  { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', type: 'major', pipSize: 0.01, contractSize: 100000 },
  { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', type: 'major', pipSize: 0.0001, contractSize: 100000 },
  { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', type: 'major', pipSize: 0.0001, contractSize: 100000 },
  { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', type: 'major', pipSize: 0.0001, contractSize: 100000 },
  { symbol: 'NZD/USD', name: 'New Zealand Dollar / US Dollar', type: 'major', pipSize: 0.0001, contractSize: 100000 },
  
  // Minors
  { symbol: 'EUR/GBP', name: 'Euro / British Pound', type: 'minor', pipSize: 0.0001, contractSize: 100000 },
  { symbol: 'EUR/JPY', name: 'Euro / Japanese Yen', type: 'minor', pipSize: 0.01, contractSize: 100000 },
  { symbol: 'GBP/JPY', name: 'British Pound / Japanese Yen', type: 'minor', pipSize: 0.01, contractSize: 100000 },
  { symbol: 'AUD/JPY', name: 'Australian Dollar / Japanese Yen', type: 'minor', pipSize: 0.01, contractSize: 100000 },
  { symbol: 'EUR/AUD', name: 'Euro / Australian Dollar', type: 'minor', pipSize: 0.0001, contractSize: 100000 },
  { symbol: 'EUR/CHF', name: 'Euro / Swiss Franc', type: 'minor', pipSize: 0.0001, contractSize: 100000 },
  { symbol: 'GBP/CHF', name: 'British Pound / Swiss Franc', type: 'minor', pipSize: 0.0001, contractSize: 100000 },
  { symbol: 'CAD/JPY', name: 'Canadian Dollar / Japanese Yen', type: 'minor', pipSize: 0.01, contractSize: 100000 },
  
  // Exotics
  { symbol: 'USD/ZAR', name: 'US Dollar / South African Rand', type: 'exotic', pipSize: 0.0001, contractSize: 100000 },
  { symbol: 'USD/TRY', name: 'US Dollar / Turkish Lira', type: 'exotic', pipSize: 0.0001, contractSize: 100000 },
  { symbol: 'USD/MXN', name: 'US Dollar / Mexican Peso', type: 'exotic', pipSize: 0.0001, contractSize: 100000 },
  { symbol: 'USD/SGD', name: 'US Dollar / Singapore Dollar', type: 'exotic', pipSize: 0.0001, contractSize: 100000 },
  { symbol: 'USD/HKD', name: 'US Dollar / Hong Kong Dollar', type: 'exotic', pipSize: 0.0001, contractSize: 100000 },
  { symbol: 'USD/NOK', name: 'US Dollar / Norwegian Krone', type: 'exotic', pipSize: 0.0001, contractSize: 100000 },
  { symbol: 'USD/SEK', name: 'US Dollar / Swedish Krona', type: 'exotic', pipSize: 0.0001, contractSize: 100000 },
];

export const CRYPTO_ASSETS: Asset[] = [
  { symbol: 'BTC/USD', name: 'Bitcoin', type: 'crypto', pipSize: 0.01, contractSize: 1 },
  { symbol: 'ETH/USD', name: 'Ethereum', type: 'crypto', pipSize: 0.01, contractSize: 1 },
  { symbol: 'SOL/USD', name: 'Solana', type: 'crypto', pipSize: 0.01, contractSize: 1 },
  { symbol: 'BNB/USD', name: 'Binance Coin', type: 'crypto', pipSize: 0.01, contractSize: 1 },
  { symbol: 'XRP/USD', name: 'XRP', type: 'crypto', pipSize: 0.0001, contractSize: 1 },
  { symbol: 'LTC/USD', name: 'Litecoin', type: 'crypto', pipSize: 0.01, contractSize: 1 },
  { symbol: 'ADA/USD', name: 'Cardano', type: 'crypto', pipSize: 0.0001, contractSize: 1 },
  { symbol: 'DOT/USD', name: 'Polkadot', type: 'crypto', pipSize: 0.01, contractSize: 1 },
];

export const DERIV_INDICES: Asset[] = [
  { symbol: 'Volatility 10', name: 'Volatility 10 Index', type: 'synthetic', pipSize: 0.001, contractSize: 1 },
  { symbol: 'Volatility 25', name: 'Volatility 25 Index', type: 'synthetic', pipSize: 0.001, contractSize: 1 },
  { symbol: 'Volatility 50', name: 'Volatility 50 Index', type: 'synthetic', pipSize: 0.0001, contractSize: 1 },
  { symbol: 'Volatility 75', name: 'Volatility 75 Index', type: 'synthetic', pipSize: 0.0001, contractSize: 1 },
  { symbol: 'Volatility 100', name: 'Volatility 100 Index', type: 'synthetic', pipSize: 0.01, contractSize: 1 },
  { symbol: 'Volatility 10 (1s)', name: 'Volatility 10 (1s) Index', type: 'synthetic', pipSize: 0.01, contractSize: 1 },
  { symbol: 'Volatility 25 (1s)', name: 'Volatility 25 (1s) Index', type: 'synthetic', pipSize: 0.01, contractSize: 1 },
  { symbol: 'Volatility 50 (1s)', name: 'Volatility 50 (1s) Index', type: 'synthetic', pipSize: 0.01, contractSize: 1 },
  { symbol: 'Volatility 75 (1s)', name: 'Volatility 75 (1s) Index', type: 'synthetic', pipSize: 0.01, contractSize: 1 },
  { symbol: 'Volatility 100 (1s)', name: 'Volatility 100 (1s) Index', type: 'synthetic', pipSize: 0.01, contractSize: 1 },
  { symbol: 'Boom 300', name: 'Boom 300 Index', type: 'synthetic', pipSize: 0.001, contractSize: 1 },
  { symbol: 'Boom 500', name: 'Boom 500 Index', type: 'synthetic', pipSize: 0.001, contractSize: 1 },
  { symbol: 'Boom 1000', name: 'Boom 1000 Index', type: 'synthetic', pipSize: 0.001, contractSize: 1 },
  { symbol: 'Crash 300', name: 'Crash 300 Index', type: 'synthetic', pipSize: 0.001, contractSize: 1 },
  { symbol: 'Crash 500', name: 'Crash 500 Index', type: 'synthetic', pipSize: 0.001, contractSize: 1 },
  { symbol: 'Crash 1000', name: 'Crash 1000 Index', type: 'synthetic', pipSize: 0.001, contractSize: 1 },
  { symbol: 'Jump 10', name: 'Jump 10 Index', type: 'synthetic', pipSize: 0.01, contractSize: 1 },
  { symbol: 'Step Index', name: 'Step Index', type: 'synthetic', pipSize: 0.1, contractSize: 1 },
  { symbol: 'Range Break 100', name: 'Range Break 100 Index', type: 'synthetic', pipSize: 1, contractSize: 1 },
];

export const ALL_ASSETS: Asset[] = [...FOREX_PAIRS, ...CRYPTO_ASSETS, ...DERIV_INDICES];