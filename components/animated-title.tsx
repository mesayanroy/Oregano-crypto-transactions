"use client"

import { motion } from "framer-motion"

export function AnimatedTitle() {
  return (
    <h1 className="text-4xl font-bold mb-8 flex items-center justify-center gap-2">
      <span>Welcome to</span>
      <motion.span
        className="text-[#2fff00] drop-shadow-[0_0_0.3rem_#2fff00]"
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        Oregano
      </motion.span>
    </h1>
  )
}

