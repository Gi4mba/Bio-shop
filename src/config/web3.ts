import { createAppKit } from "@reown/appkit/react";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { sepolia } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { QueryClient } from "@tanstack/react-query";

export const projectId = "874cf61d5bd1bded04aff20396abf3c3";

// Cast esplicito di sepolia come AppKitNetwork
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [sepolia as AppKitNetwork];

// Metadata
const metadata = {
  name: "Gianni Bio Shop",
  description: "Acquista prodotti biologici a km zero con ETH",
  url: "https://gianni-bio-shop.vercel.app",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
});

export const queryClient = new QueryClient();

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: false,
  },
});

export const config = wagmiAdapter.wagmiConfig;
