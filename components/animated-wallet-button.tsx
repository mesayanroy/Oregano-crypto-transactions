"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Wallet, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock OCID Connect SDK integration
// In a real implementation, you would import the actual SDK
const mockOCIDConnect = {
  connect: () => {
    return new Promise<{ address: string; chainId: number }>((resolve) => {
      setTimeout(() => {
        resolve({
          address: "0x" + Math.random().toString(16).slice(2, 42),
          chainId: 1,
        })
      }, 1500)
    })
  },
}

const walletProviders = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "https://cryptologos.cc/logos/phantom-phntm-logo.png",
  },
  {
    id: "coinbase",
    name: "Coinbase",
    icon: "https://seeklogo.com/images/C/coinbase-coin-logo-C86F46D7B8-seeklogo.com.png",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png",
  },
]

interface AnimatedWalletButtonProps {
  onConnect: (address: string) => void
  isConnected: boolean
}

export function AnimatedWalletButton({ onConnect, isConnected }: AnimatedWalletButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [activeProvider, setActiveProvider] = useState<number | null>(null)
  const { toast } = useToast()

  const handleConnect = async () => {
    if (isConnected || isConnecting) return

    setIsConnecting(true)
    try {
      // Simulate cycling through providers during connection
      const cycleProviders = setInterval(() => {
        setActiveProvider((prev) => {
          if (prev === null) return 0
          return (prev + 1) % walletProviders.length
        })
      }, 200)

      // Connect using the mock OCID Connect SDK
      const result = await mockOCIDConnect.connect()

      clearInterval(cycleProviders)
      setActiveProvider(null)
      onConnect(result.address)

      toast({
        title: "Wallet Connected",
        description: `Connected to address: ${result.address.slice(0, 6)}...${result.address.slice(-4)}`,
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 -z-10 rounded-md overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered || isConnecting ? 0.15 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
          {walletProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              className={`flex items-center justify-center p-2 ${
                activeProvider === index ? "opacity-100" : "opacity-50"
              }`}
              animate={{
                scale: activeProvider === index ? 1.1 : 1,
              }}
            >
              <Image
                src={provider.icon || "/placeholder.svg"}
                alt={provider.name}
                width={24}
                height={24}
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Button
        className={`w-full relative overflow-hidden ${
          isConnected
            ? "bg-black hover:bg-gray-800 text-[#2fff00] border border-[#2fff00]"
            : "bg-[#2fff00] hover:bg-[#20cc00] text-black font-bold"
        }`}
        onClick={handleConnect}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isConnecting}
      >
        <AnimatePresence mode="wait">
          {isConnecting ? (
            <motion.div
              key="connecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Connecting...
            </motion.div>
          ) : isConnected ? (
            <motion.div
              key="connected"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Wallet Connected
            </motion.div>
          ) : (
            <motion.div
              key="connect"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                className="ml-2"
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  )
}

