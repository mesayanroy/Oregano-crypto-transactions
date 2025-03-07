"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import CryptoConverter from "@/components/crypto-converter"
import { useToast } from "@/components/ui/use-toast"
import { WalletService, type WalletType } from "@/lib/wallet-service"
import { WalletDetails } from "@/components/wallet-details"
import SolidityContract from "@/components/solidity-contract"
import { AIChatbot } from "@/components/ai-chatbot"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatedBackground } from "@/components/animated-background"
import { AnimatedTitle } from "@/components/animated-title"
import { SubscriptionModal } from "@/components/subscription-modal"
import { FreeTrialFlow } from "@/components/free-trial-flow"
import { RelayerSetup } from "@/components/relayer-setup"

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<WalletType>("metamask")
  const [walletDetails, setWalletDetails] = useState<{
    address: string
    balance?: string
  } | null>(null)
  const { toast } = useToast()
  const walletService = WalletService.getInstance()

  const connectWallet = async () => {
    try {
      const connection = await walletService.connect(selectedWallet)
      setIsWalletConnected(true)
      setWalletDetails({
        address: connection.address,
        balance: "0.00", // You would get the actual balance from the wallet
      })
      toast({
        title: "Wallet Connected",
        description: `Connected to address: ${connection.address.slice(0, 6)}...${connection.address.slice(-4)}`,
      })
    } catch (error: any) {
      console.error("Failed to connect wallet:", error)
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const sendTransaction = () => {
    if (!isWalletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet before sending a transaction.",
        variant: "destructive",
      })
      return
    }
    // Implement transaction logic here
    console.log("Sending transaction...")
  }

  return (
    <>
      <AnimatedBackground />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <AnimatedTitle />
        <div className="space-y-4 w-full max-w-md">
          <div className="flex gap-4 justify-center mb-8">
            <SubscriptionModal />
            <FreeTrialFlow />
          </div>
          <RelayerSetup />
          <Select value={selectedWallet} onValueChange={(value: WalletType) => setSelectedWallet(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select wallet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="metamask">MetaMask</SelectItem>
              <SelectItem value="phantom">Phantom</SelectItem>
              <SelectItem value="binance">Binance Wallet</SelectItem>
              <SelectItem value="coindcx">CoinDCX</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full bg-[#2fff00] hover:bg-[#20cc00] text-black font-bold" onClick={connectWallet}>
            {isWalletConnected ? "Wallet Connected" : "Connect Wallet"}
          </Button>
          {walletDetails && (
            <WalletDetails
              walletType={selectedWallet.toUpperCase()}
              address={walletDetails.address}
              balance={walletDetails.balance}
            />
          )}
          <Button
            className="w-full bg-black hover:bg-gray-800 text-[#2fff00] border border-[#2fff00]"
            onClick={sendTransaction}
          >
            Send Transaction
          </Button>
        </div>
        <div className="mt-8 w-full max-w-md space-y-8">
          <CryptoConverter />
          <SolidityContract />
        </div>
        <AIChatbot />
      </div>
    </>
  )
}

