import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          137: "https://polygon-mainnet.public.blastapi.io", // Polygon
          43114: "https://rpc.ankr.com/avalanche", // Avalanche
          250: "https://rpc2.fantom.network", // Fantom
          66: "https://exchainrpc.okex.org", // OKEx Chain
          42161: "https://arb-mainnet.g.alchemy.com/v2/demo", // Arbitrum
          1666600000: "https://harmony-mainnet.chainstacklabs.com", //Harmony
          1284: "https://moonbeam.public.blastapi.io" //Moonbeam
        },
        infuraId: "09f87278a177401cae8e0ad94f1e9024",
      }
    }
  };

const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required
    theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
});

const blockchains = [
  {
      chainName: 'Polygon Mainnet',
      chainId: 137,
      symbol: 'MATIC',
      currencyName: 'MATIC',
      decimals: 18,
      rpc: "https://polygon-mainnet.public.blastapi.io"
  },

  {
      chainName: "Avalanche C-Chain",
      chainId: 43114,
      symbol: "AVAX",
      currencyName: "AVAX",
      decimals: 18,
      rpc: "https://rpc.ankr.com/avalanche"
  },

  {
      chainName: "Fantom Opera",
      chainId: 250,
      symbol: "FTM",
      currencyName: "Fantom Token",
      decimals: 18,
      rpc: "https://rpc2.fantom.network"
  },
  {
      chainName: "OKXChain Mainnet",
      chainId: 66,
      symbol: "OKT",
      currencyName: "OKX Token",
      decimals: 18,
      rpc: "https://exchainrpc.okex.org"
  },
  {
      chainName: "Arbitrum One",
      chainId: 42161,
      symbol: "ETH",
      currencyName: "Ethereum",
      decimals: 18,
      rpc: "https://arb-mainnet.g.alchemy.com/v2/demo"
  },
  {
      chainName: "Harmony Mainnet Shard 0",
      chainId: 1666600000,
      symbol: 'ONE',
      currencyName: 'ONE',
      decimals: 18,
      rpc: "https://harmony-mainnet.chainstacklabs.com"
  },
  {
      chainName: "Moonbeam",
      chainId: 1284,
      symbol: "GLMR",
      currencyName: "Glimmer Token",
      decimals: 18,
      rpc: "https://moonbeam.public.blastapi.io"
  },
]

export {web3Modal, blockchains}

