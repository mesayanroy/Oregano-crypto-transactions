"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  BookOpen,
  FileCode,
  Coins,
  BarChart,
  BanknoteIcon as Bank,
  Users,
  DollarSign,
  Gamepad2,
  Image,
} from "lucide-react"

const features = [
  { id: "build", label: "Build", icon: Building2 },
  { id: "contract-libraries", label: "Contract Libraries", icon: BookOpen },
  { id: "use-cases", label: "Use Cases", icon: FileCode },
  { id: "tokens", label: "Tokens", icon: Coins },
  { id: "asset-tokenization", label: "Asset Tokenization", icon: BarChart },
  { id: "defi", label: "DeFi", icon: Bank },
  { id: "governance", label: "Governance", icon: Users },
  { id: "stablecoin", label: "Stablecoin", icon: DollarSign },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
  { id: "nfts", label: "NFTs", icon: Image },
]

export function BlockchainTabs() {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h3 className="text-2xl font-semibold text-[#2fff00] mb-6">Blockchain Features</h3>
      <Tabs defaultValue="build" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-black/50 p-2">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              onHoverStart={() => setHoveredTab(feature.id)}
              onHoverEnd={() => setHoveredTab(null)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <TabsTrigger
                value={feature.id}
                className={`w-full flex items-center gap-2 ${
                  hoveredTab === feature.id ? "text-[#2fff00]" : "text-[#2fff00]/70"
                }`}
              >
                <feature.icon className="h-4 w-4" />
                {feature.label}
              </TabsTrigger>
            </motion.div>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

