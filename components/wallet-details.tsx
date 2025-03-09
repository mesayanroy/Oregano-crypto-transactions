"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface WalletDetailsProps {
  walletType: string
  address: string
  balance?: string
}

export function WalletDetails({ walletType, address, balance }: WalletDetailsProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="bg-black/50 border border-[#2fff00]/30">
      <CardHeader>
        <CardTitle className="text-[#2fff00]">{walletType}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between space-x-2">
          <code className="text-sm text-[#2fff00]/80">{address}</code>
          <Button variant="ghost" size="icon" onClick={copyToClipboard} className="hover:text-[#2fff00]">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        {balance && <p className="mt-2 text-sm text-[#2fff00]/80">Balance: {balance}</p>}
      </CardContent>
    </Card>
  )
}

