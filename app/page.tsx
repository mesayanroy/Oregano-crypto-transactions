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
import { useRouter } from "next/navigation"
import { AnimatedWalletButton } from "@/components/animated-wallet-button"
import { TPSCounter } from "@/components/tps-counter"
import { motion } from "framer-motion"

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<WalletType>("metamask")
  const [walletDetails, setWalletDetails] = useState<{
    address: string
    balance?: string
  } | null>(null)
  const { toast } = useToast()
  const walletService = WalletService.getInstance()
  const router = useRouter()

  const handleConnect = async (address: string) => {
    setIsWalletConnected(true)
    setWalletDetails({
      address,
      balance: "0.00", // You would get the actual balance from the wallet
    })
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

    // Navigate to transaction details page
    router.push(`/transaction-details?wallet=${selectedWallet}&address=${walletDetails?.address || ""}`)
  }

  return (
    <>
      <AnimatedBackground />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <AnimatedTitle />
        </motion.div>

        <motion.div
          className="space-y-6 w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex gap-4 justify-center mb-8">
            <SubscriptionModal />
            <FreeTrialFlow />
          </div>

          {/* Only show RelayerSetup when wallet is connected */}
          {isWalletConnected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RelayerSetup />
            </motion.div>
          )}

          <div className="space-y-4">
            <Select value={selectedWallet} onValueChange={(value: WalletType) => setSelectedWallet(value)}>
              <SelectTrigger className="bg-black/50 border-[#2fff00]/30 text-[#2fff00]">
                <SelectValue placeholder="Select wallet" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-[#2fff00]/30">
                <SelectItem value="metamask">MetaMask</SelectItem>
                <SelectItem value="phantom">Phantom</SelectItem>
                <SelectItem value="binance">Binance Wallet</SelectItem>
                <SelectItem value="coindcx">CoinDCX</SelectItem>
              </SelectContent>
            </Select>

            <AnimatedWalletButton onConnect={handleConnect} isConnected={isWalletConnected} />

            {walletDetails && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <WalletDetails
                  walletType={selectedWallet.toUpperCase()}
                  address={walletDetails.address}
                  balance={walletDetails.balance}
                />
              </motion.div>
            )}

            <Button
              className="w-full bg-black hover:bg-gray-800 text-[#2fff00] border border-[#2fff00] neon-button"
              onClick={sendTransaction}
            >
              Send Transaction
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 w-full max-w-md space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CryptoConverter />
          <SolidityContract />
        </motion.div>

        <AIChatbot />
      </div>

      <TPSCounter />
    </>
  )
}

