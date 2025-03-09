import { ethers } from "ethers"

export type WalletType = "metamask" | "phantom" | "binance" | "coindcx"

interface WalletConnection {
  address: string
  chainId: number
  provider: any
}

export class WalletService {
  private static instance: WalletService
  private currentConnection: WalletConnection | null = null

  private constructor() {}

  static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService()
    }
    return WalletService.instance
  }

  async connectMetaMask(): Promise<WalletConnection> {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", [])
        const network = await provider.getNetwork()

        this.currentConnection = {
          address: accounts[0],
          chainId: Number(network.chainId),
          provider,
        }
        return this.currentConnection
      } catch (error) {
        throw new Error("MetaMask connection failed")
      }
    } else {
      throw new Error("MetaMask not installed")
    }
  }

  async connectPhantom(): Promise<WalletConnection> {
    if ("solana" in window) {
      try {
        const provider = (window as any).solana
        const response = await provider.connect()

        this.currentConnection = {
          address: response.publicKey.toString(),
          chainId: 1, // Solana mainnet
          provider,
        }
        return this.currentConnection
      } catch (error) {
        throw new Error("Phantom connection failed")
      }
    } else {
      throw new Error("Phantom not installed")
    }
  }

  async connectBinance(): Promise<WalletConnection> {
    if (typeof (window as any).BinanceChain !== "undefined") {
      try {
        const provider = (window as any).BinanceChain
        const accounts = await provider.request({ method: "eth_requestAccounts" })

        this.currentConnection = {
          address: accounts[0],
          chainId: 56, // BSC mainnet
          provider,
        }
        return this.currentConnection
      } catch (error) {
        throw new Error("Binance Wallet connection failed")
      }
    } else {
      throw new Error("Binance Wallet not installed")
    }
  }

  async connectCoinDCX(): Promise<WalletConnection> {
    // Note: This is a placeholder as CoinDCX doesn't have a public wallet API
    // You would need to implement this according to CoinDCX's specific requirements
    throw new Error("CoinDCX wallet integration not implemented")
  }

  async connect(walletType: WalletType): Promise<WalletConnection> {
    switch (walletType) {
      case "metamask":
        return this.connectMetaMask()
      case "phantom":
        return this.connectPhantom()
      case "binance":
        return this.connectBinance()
      case "coindcx":
        return this.connectCoinDCX()
      default:
        throw new Error("Unsupported wallet type")
    }
  }

  async disconnect(): Promise<void> {
    if (this.currentConnection) {
      // Implement wallet-specific disconnect logic here
      this.currentConnection = null
    }
  }

  getCurrentConnection(): WalletConnection | null {
    return this.currentConnection
  }
}

