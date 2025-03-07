"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const cryptocurrencies = ["SHIB", "CHILL", "DIA", "SOL", "ETH", "USDT", "USDC"]

// Mock conversion rates to USDT (these would typically come from an API)
const conversionRates = {
  SHIB: 0.000022, // 1 SHIB = 0.000022 USDT
  CHILL: 0.00015, // 1 CHILL = 0.00015 USDT
  DIA: 0.35, // 1 DIA = 0.35 USDT
  SOL: 150.25, // 1 SOL = 150.25 USDT
  ETH: 2500.0, // 1 ETH = 2500 USDT
  USDT: 1.0, // 1 USDT = 1 USDT
  USDC: 1.0, // 1 USDC = 1 USDC
}

export default function CryptoConverter() {
  const [amount, setAmount] = useState("")
  const [fromCrypto, setFromCrypto] = useState(cryptocurrencies[0])
  const [toCrypto, setToCrypto] = useState(cryptocurrencies[1])
  const [result, setResult] = useState<string | null>(null)

  const convertCrypto = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setResult("Please enter a valid amount")
      return
    }

    // Convert from source crypto to USDT first
    const amountInUSDT = Number(amount) * conversionRates[fromCrypto as keyof typeof conversionRates]
    // Then convert from USDT to target crypto
    const convertedAmount = amountInUSDT / conversionRates[toCrypto as keyof typeof conversionRates]

    setResult(`${amount} ${fromCrypto} = ${convertedAmount.toFixed(6)} ${toCrypto}`)
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-card">
      <h2 className="text-2xl font-semibold mb-4">Crypto Converter</h2>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-grow"
          />
          <Select value={fromCrypto} onValueChange={setFromCrypto}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="From" />
            </SelectTrigger>
            <SelectContent>
              {cryptocurrencies.map((crypto) => (
                <SelectItem key={crypto} value={crypto}>
                  {crypto}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Input type="text" placeholder="Converted Amount" value={result || ""} readOnly className="flex-grow" />
          <Select value={toCrypto} onValueChange={setToCrypto}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="To" />
            </SelectTrigger>
            <SelectContent>
              {cryptocurrencies.map((crypto) => (
                <SelectItem key={crypto} value={crypto}>
                  {crypto}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={convertCrypto} className="w-full">
          Convert
        </Button>
      </div>
    </div>
  )
}

