"use client"

import { motion } from "framer-motion"

export function WelcomeSection() {
  return (
    <div className="text-center space-y-6 max-w-4xl mx-auto">
      <motion.h1
        className="text-5xl font-bold text-[#2fff00] drop-shadow-[0_0_0.3rem_#2fff00]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Oregano
      </motion.h1>
      <motion.h2
        className="text-3xl font-semibold text-[#9fff00]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        The standard for secure onchain applications at any scale
      </motion.h2>
      <motion.p
        className="text-lg text-[#2fff00]/80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Build operate with OREGANO open-source tools and Defender Cloud Services across 30+ networks. Secure your code
        with our smart contract Audits.
      </motion.p>
    </div>
  )
}

