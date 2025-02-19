"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const cryptocurrencies = ["SHIB", "CHILL", "DIA", "SOL", "ETH", "USDT", "USDC"]

export default function CryptoConverter() {
  const [fromCrypto, setFromCrypto] = useState(cryptocurrencies[0])
  const [toCrypto, setToCrypto] = useState(cryptocurrencies[1])
  const [amount, setAmount] = useState("")

  const handleConvert = () => {
    // Implement conversion logic here
    console.log(`Converting ${amount} ${fromCrypto} to ${toCrypto}`)
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
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
          <Input type="number" placeholder="Converted Amount" readOnly className="flex-grow" />
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
      </div>
    </div>
  )
}

