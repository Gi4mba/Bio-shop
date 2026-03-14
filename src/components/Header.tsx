import { useConnection, useBalance, useDisconnect } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { formatEther } from "viem";

export const Header: React.FC = () => {
  const { address, isConnected } = useConnection();
  const { data: balance } = useBalance({ address });
  const { open } = useAppKit();
  const disconnect = useDisconnect();

  return (
    <header className="glass-dark sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 group">
          <div>
            <h1 className="text-xl font-bold text-white">Gianni Bio Shop</h1>
            <p className="text-xs text-white/70">Prodotti biologici a km zero</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isConnected && balance ? (
            <div className="glass rounded-xl px-4 py-3 text-white">
              <div className="text-xs font-medium text-white/80 mb-1">Il tuo saldo</div>
              <div className="text-lg font-bold">
                {parseFloat(formatEther(balance.value)).toFixed(4)} ETH
              </div>
            </div>
          ) : null}

          <button
            onClick={() => (isConnected ? disconnect.mutate() : open())}
            className="glass text-white px-6 py-3 rounded-xl font-semibold interactive-card hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            {isConnected ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
              </div>
            ) : (
              "Connetti Wallet"
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
