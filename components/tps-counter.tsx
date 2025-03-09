"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity } from "lucide-react"

export function TPSCounter() {
  const [tps, setTps] = useState(0)
  const [transactions, setTransactions] = useState(0)
  const startTimeRef = useRef(Date.now())
  const animationRef = useRef<number | null>(null)

  // Generate random TPS values that fluctuate realistically
  const generateRandomTPS = () => {
    // Base TPS with some randomness
    const baseTPS = 15 + Math.random() * 5

    // Add occasional spikes
    const spike = Math.random() > 0.95 ? Math.random() * 20 : 0

    return baseTPS + spike
  }

  useEffect(() => {
    const updateTPS = () => {
      const newTPS = generateRandomTPS()
      setTps(newTPS)

      // Accumulate transactions
      const elapsedSeconds = (Date.now() - startTimeRef.current) / 1000
      setTransactions(Math.floor(elapsedSeconds * newTPS))

      animationRef.current = requestAnimationFrame(updateTPS)
    }

    animationRef.current = requestAnimationFrame(updateTPS)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-[#2fff00]/30 py-2 px-4 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Activity className="h-5 w-5 text-[#2fff00] mr-2" />
          <span className="text-[#2fff00] font-medium">Network Activity</span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">TPS:</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={Math.floor(tps)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-[#2fff00] font-mono font-bold"
                >
                  {tps.toFixed(1)}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="text-xs text-muted-foreground">Transactions per second</span>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">Total:</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={Math.floor(transactions / 100)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-[#2fff00] font-mono font-bold"
                >
                  {transactions.toLocaleString()}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="text-xs text-muted-foreground">Transactions since page load</span>
          </div>
        </div>
      </div>
    </div>
  )
}

