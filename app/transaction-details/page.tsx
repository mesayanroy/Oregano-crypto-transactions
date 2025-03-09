"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CryptoMarketData } from "@/components/crypto-market-data"
import { WalletTransactions } from "@/components/wallet-transactions"
import { WalletDetails } from "@/components/wallet-details"
import { AnimatedBackground } from "@/components/animated-background"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { WalletService, type WalletType } from "@/lib/wallet-service"
import { TPSCounter } from "@/components/tps-counter"
import { motion } from "framer-motion"

export default function TransactionDetailsPage() {
  const searchParams = useSearchParams()
  const walletType = (searchParams.get("wallet") as WalletType) || "metamask"
  const address = searchParams.get("address") || ""
  const [balance, setBalance] = useState<string | undefined>(undefined)
  const { toast } = useToast()
  const walletService = WalletService.getInstance()

  useEffect(() => {
    const fetchWalletDetails = async () => {
      try {
        // In a real app, you would fetch the actual balance from the blockchain
        // For demo purposes, we'll simulate a delay and use a mock balance
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setBalance("0.25 ETH")
      } catch (error) {
        console.error("Failed to fetch wallet details:", error)
        toast({
          title: "Error",
          description: "Failed to fetch wallet details",
          variant: "destructive",
        })
      }
    }

    if (address) {
      fetchWalletDetails()
    }
  }, [address, toast])

  return (
    <>
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-8 pb-16">
        <div className="flex flex-col space-y-8">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/">
              <Button
                variant="outline"
                className="bg-black/50 border-[#2fff00]/30 text-[#2fff00] hover:bg-[#2fff00]/10 neon-button"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-[#2fff00] drop-shadow-[0_0_0.3rem_#2fff00] glow-text">
              Transaction Details
            </h1>
          </motion.div>

          {address ? (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="bg-black/50 border border-[#2fff00]/30 md:col-span-3 animate-pulse-glow">
                  <CardHeader>
                    <CardTitle className="text-[#2fff00]">Wallet Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <WalletDetails walletType={walletType.toUpperCase()} address={address} balance={balance} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <CryptoMarketData />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <WalletTransactions walletType={walletType} address={address} />
              </motion.div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Card className="bg-black/50 border border-[#2fff00]/30">
                <CardContent className="p-8 text-center">
                  <p className="text-xl text-[#2fff00]">
                    No wallet connected. Please connect your wallet on the home page.
                  </p>
                  <Link href="/" className="mt-4 inline-block">
                    <Button className="bg-[#2fff00] hover:bg-[#20cc00] text-black neon-button">Go to Home</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
      <TPSCounter />
    </>
  )
}

