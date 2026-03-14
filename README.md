# 🌿 Gianni Bio Shop - MVP Blockchain E-commerce

Piattaforma e-commerce decentralizzata per la vendita di prodotti biologici a km zero, con pagamenti in criptovaluta su blockchain Ethereum.


## 📋 Indice

- [Panoramica del Progetto](#panoramica-del-progetto)
- [Caratteristiche Principali](#caratteristiche-principali)
- [Architettura Tecnica](#architettura-tecnica)
- [Stack Tecnologico](#stack-tecnologico)
- [Struttura del Progetto](#struttura-del-progetto)
- [Funzionalità](#funzionalità)
- [Integrazione Blockchain](#integrazione-blockchain)
- [Sicurezza](#sicurezza)
- [Performance](#performance)
- [Setup e Deploy](#setup-e-deploy)


## 🎯 Panoramica del Progetto

Gianni Bio Shop è un MVP di e-commerce che combina prodotti biologici tradizionali con tecnologia blockchain moderna. La piattaforma permette ai clienti di acquistare prodotti biologici locali pagando in Ethereum, con transazioni trasparenti e tracciabili sulla blockchain.

### Obiettivi Principali
- **Digitalizzazione** del commercio di prodotti biologici locali
- **Trasparenza** totale delle transazioni tramite blockchain
- **Accessibilità** globale mediante pagamenti in cripto
- **Tracciabilità** immutabile degli ordini


## ✨ Caratteristiche Principali

### 🛒 E-commerce Moderno
- Catalogo prodotti con immagini su IPFS
- Carrello della spesa persistente
- Checkout multi-step con validazione
- Sistema di pagamenti integrato

### 🔐 Wallet Integration
- Connessione wallet Web3 (MetaMask, WalletConnect)
- Balance checking in tempo reale
- Stato connessione persistente

### 🎨 Design Moderno
- Glassmorphism UI e animazioni fluide
- Design responsive
- Micro-interazioni e feedback visivo

### ⛡️ Blockchain Features
- Transazioni immutabili su Ethereum
- Tracking su Etherscan
- Conferma multi-step (pending → confirmed)
- Gestione errori robusta


## 🏗️ Architettura Tecnica

### Frontend Architecture
```
┌─────────────────────────────────────┐
│            *UI/UX Layer*            │
├─────────────────────────────────────┤
│   React Components + TypeScript     │
│            Tailwind CSS             │
├─────────────────────────────────────┤
│         *State Management*          │
├─────────────────────────────────────┤
│     Zustand Store + React Query     │
├─────────────────────────────────────┤
│         *Blockchain Layer*          │
├─────────────────────────────────────┤
│    Wagmi + Viem + Reown AppKit      │
└─────────────────────────────────────┘
```

### Data Flow
1. **Products**: Dati statici con immagini su IPFS
2. **Cart**: Zustand - Store per stato locale
3. **Payments**: Wagmi - Hooks per gestione transazioni blockchain
4. **Orders**: Session storage per persistenza cache


## 🛠️ Stack Tecnologico

### Frontend Core
- **React 19.2.0**: UI framework per impiego di Functional Components
- **TypeScript 5.9.3**: Type-safety e developer experience
- **Vite 7.2.4**: Build tool ultra-veloce con HMR
- **React Router 7.13.0**: Routing client-side

### Styling & UI
- **Tailwind CSS 4.1.18**: Utility-first CSS framework
- **Glassmorphism Design**: Modern UI con backdrop-filter
- **CSS Animations**: Effetti di float, pulse, slide-up
- **Responsive Design**: Approccio mobile-first

### State Management
- **Zustand 5.0.11**: Gestione dello stato ultra-leggera
- **React Query 5.90.20**: Gestione dello stato server-side e caching
- **Session Storage**: Persistenza temporanea ordini

### Blockchain Integration
- **Wagmi 3.4.2**: React hooks per interazione con Ethereum
- **Viem 2.45.1**: TypeScript Ethereum client
- **Reown AppKit 1.8.17**: Wallet connection UI
- **Sepolia Testnet**: Network di test di riferimento

### Development Tools
- **ESLint 9.39.1**: Code quality e consistency
- **PostCSS 8.5.6**: CSS processing pipeline
- **Terser 5.46.0**: JavaScript minification
- **Vercel**: Deployment platform


## 📁 Struttura del Progetto

```
src/
├── components/       # UI
│   ├── shared/       # Types cross-components
│   ├── SuccessPageComponents/
│   └── CheckoutPageComponents/
├── pages/            # Routes
├── store/            # State management
├── hooks/            # Custom hooks
├── types/            # Types definitions
├── config/           # Configuration constants
├── data/             # Static data
└── assets/           # Static assets
```

### Component Architecture
**S.O.L.I.D.**:
- **Segregazione** delle responsabilità
- **Composizione** e children-prop drilling
- **Compatibilità** su sostituzione di un tipo base con uno derivato
- **Interfacce atomiche** per determinate props


## 🚀 Funzionalità

### Catalog Management
```typescript
/**
 * Interfaccia per i prodotti, comprende:
 * - @param priceETH Prezzo in ETH
 * - @param priceUSD Prezzo in USD
 * - @param unit Unità di misura
 * - @param imageIPFS Immagine IPFS
 * - @param category Tag di categoria 
 * */ 
interface Product {
  id: string;
  name: string;
  description: string;
  priceETH: string;
  priceUSD: number;
  unit: string;
  imageIPFS: string;
  category: string;
}
```

### Payment Processing
secondo lo standard della documentazione di Wagmi
```typescript
/**
 * Interfaccia per il risultato del pagamento, comprende:
 * - @param success Stato di successo del pagamento
 * - @param txHash Hash della transazione
 * - @param error Errore del pagamento
 * */ 
interface PaymentResult {
  success: boolean;
  txHash?: string;
  error?: string;
}
```

- **Multi-step validation**: Balance → Transaction → Confirmation
- **Error handling**: User-friendly messages
- **Transaction tracking**: Real-time status updates
- **Success flow**: Order summary e next steps


## ⛓️ Integrazione Blockchain

### Wallet Connection
```typescript
/**
 * Hook per la connessione del wallet, comprende:
 * - @param address Indirizzo del wallet
 * - @param isConnected Stato di connessione
 * */ 
const { address, isConnected } = useConnection();
/**
 * Hook per il recupero del saldo, comprende:
 * - @param data Saldo del wallet
 * */ 
const { data: balance } = useBalance({ address });
```

### Transaction Flow
1. **Validation**: Check saldo sufficiente
2. **Send Transaction**: `useSendTransaction` hook
3. **Wait Confirmation**: `useWaitForTransactionReceipt`
4. **Success Handling**: Navigate to success page


## 🔒 Sicurezza

### Frontend Security
- **TypeScript**: Compile-time type checking
- **Input Validation**: Quantity and form validation
- **XSS Prevention**: React auto-escapes content
- **CSRF Protection**: Same-origin policy

### Blockchain Security
- **Read-only Operations**: No sensitive data exposure
- **Client-side Signing**: Private keys never leave wallet
- **Transaction Verification**: Hash verification on success

### Data Protection
- **Session Storage**: Temporary order data
- **No PII Storage**: No personal information collected
- **Local State Only**: No backend persistence
- **Wallet Privacy**: Address-only identification


## ⚡ Performance

### Build Optimization
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-wagmi": ["wagmi", "viem"],
          "vendor-ui": ["@reown/appkit"],
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: { drop_console: true },
    },
  },
});
```

### Runtime Performance
- **Code Splitting**: Route-based lazy loading
- **Tree Shaking**: Unused code elimination
- **Image Optimization**: IPFS distributed storage
- **Caching Strategy**: React Query intelligent caching

### Bundle Analysis
- **Vendor chunks**: Separated Web3 libraries
- **Dynamic imports**: Route-level code splitting
- **Minification**: Terser optimization
- **Compression**: Gzip ready output


## 🛠️ Setup e Deploy

### Prerequisites
- Node.js 18+
- npm or yarn
- Ethereum wallet (MetaMask)
- Sepolia ETH for testing

### Installation
```bash
# Clone repository
git clone <repository-url>
cd bio-shop

# Install dependencies
npm install

# Start development server
npm run dev
```

### Configuration
```typescript
// src/config/constants.ts
export const GIANNI_WALLET_ADDRESS = "0x..." as `0x${string}`;
export const SEPOLIA_CHAIN_ID = 11155111;
export const SEPOLIA_EXPLORER = "https://sepolia.etherscan.io";
```

### Build & Deploy
```bash
# Build for production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```
La build è stata deployata su Vercel all'indirizzo: <br />
**https://gianni-bio-shop.vercel.app**

### Environment Setup
1. **MetaMask**: Aggiungi la network Sepolia al wallet
2. **Faucet**: Acquisisci test ETH dal Sepolia faucet
3. **Network**: Imposta la rete Sepolia nel wallet
4. **Connect**: Clicca "Connetti Wallet" nell'app


## 📊 MVP Metrics & Contributing

### Current Features
- ✅ **6 Prodotti**: Catalogo completo
- ✅ **Pagamenti Web3**: Flusso di transazioni integrato
- ✅ **UI Moderna**: Design glassmorphism
- ✅ **Type Safety**: Type Safety completo

### Code Quality
- **TypeScript Strict Mode**: Nessun `any` type
- **ESLint + Prettier**: Codice pulito e coerente
- **Custom Hooks**: Componenti grandi rifattorizzati in hook di logica riutilizzabile
- **Component Pattern**: Container/Presentational separation


## 📄 Licenza

MIT License - Copyright (c) 2026 | Giovanni Battista Avella

Built using React, TypeScript, and Wagmi/Viem for Ethereum integration