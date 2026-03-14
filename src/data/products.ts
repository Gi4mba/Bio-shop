import type { Product } from "../types/Product";

// Immagini placeholder su IPFS pubblico
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Olio Extravergine di Oliva",
    description: "Olio DOP biologico dalle nostre olive Cultivar Coratina",
    priceETH: "0.005", // ~$10 USD al kg
    priceUSD: 10,
    unit: "kg",
    imageIPFS: "QmQVfFN6pXmTtHyufXtA1E7d8ggpMKjvdG41TQDrUvZXGL",
    category: "Oli",
  },
  {
    id: "2",
    name: "Pomodori Ciliegino",
    description: "Pomodori bio raccolti al punto giusto di maturazione",
    priceETH: "0.0025", // ~$5 USD al kg
    priceUSD: 5,
    unit: "kg",
    imageIPFS: "QmbikXB4MtLm2Pbh2rLNAdqqLfUGNo35X8DYr7kTySp4zU",
    category: "Ortaggi",
  },
  {
    id: "3",
    name: "Formaggio Caciocavallo",
    description: "Formaggio semi-stagionato prodotto con latte biologico locale",
    priceETH: "0.008", // ~$16 USD al kg
    priceUSD: 16,
    unit: "kg",
    imageIPFS: "QmcDPn7WY5ZdUmYirSUJ7jCJG895hbvt1UUAg546Yiwy7A",
    category: "Latticini",
  },
  {
    id: "4",
    name: "Miele di Acacia",
    description: "Miele biologico non pastorizzato da api locali",
    priceETH: "0.006", // ~$12 USD al kg
    priceUSD: 12,
    unit: "kg",
    imageIPFS: "QmRvMi527MyjmbdA9Dv83y7ub9Ci6miaMCtCPbrC7eopUM",
    category: "Dolci",
  },
  {
    id: "5",
    name: "Farina di Grano Duro",
    description: "Farina macinata a pietra da grano 100% italiano",
    priceETH: "0.003", // ~$6 USD al kg
    priceUSD: 6,
    unit: "kg",
    imageIPFS: "QmXU1EYsNxcfo5xiQHYHuTrnRXwbrnXEe3z7tW7bEeDAmQ",
    category: "Farine",
  },
  {
    id: "6",
    name: "Vino Primitivo",
    description: "Vino rosso biologico DOCG - Primitivo di Manduria",
    priceETH: "0.007", // ~$14 USD al litro
    priceUSD: 14,
    unit: "litro",
    imageIPFS: "QmYX4SDM5EiwnFBseCeWHCFyzbeRkqW4aHM6B8bhbPukxd",
    category: "Vini",
  },
];

// Helper per ottenere URL IPFS
export const getIPFSUrl = (hash: string): string => {
  return `https://ipfs.filebase.io/ipfs/${hash}`;
};
