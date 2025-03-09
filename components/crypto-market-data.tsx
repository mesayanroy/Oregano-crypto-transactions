"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowUp, ArrowDown } from "lucide-react"

interface CryptoData {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
}

export function CryptoMarketData() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        // In a real app, you would fetch from a real API like CoinGecko
        // For demo purposes, we'll simulate a delay and use mock data
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data based on real cryptocurrency values
        const mockData: CryptoData[] = [
          {
            id: "bitcoin",
            name: "Bitcoin",
            symbol: "btc",
            current_price: 63245.78,
            price_change_percentage_24h: 2.34,
            market_cap: 1234567890000,
            total_volume: 45678900000,
          },
          {
            id: "ethereum",
            name: "Ethereum",
            symbol: "eth",
            current_price: 3456.92,
            price_change_percentage_24h: -1.23,
            market_cap: 416789000000,
            total_volume: 23456700000,
          },
          {
            id: "solana",
            name: "Solana",
            symbol: "sol",
            current_price: 149.87,
            price_change_percentage_24h: 5.67,
            market_cap: 64532100000,
            total_volume: 5678900000,
          },
          {
            id: "cardano",
            name: "Cardano",
            symbol: "ada",
            current_price: 0.45,
            price_change_percentage_24h: -0.78,
            market_cap: 15678900000,
            total_volume: 789000000,
          },
          {
            id: "polkadot",
            name: "Polkadot",
            symbol: "dot",
            current_price: 6.78,
            price_change_percentage_24h: 3.45,
            market_cap: 8765400000,
            total_volume: 456700000,
          },
        ]

        setCryptoData(mockData)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch crypto data:", error)
        setLoading(false)
      }
    }

    fetchCryptoData()

    // In a real app, you might want to refresh the data periodically
    const intervalId = setInterval(fetchCryptoData, 60000) // Refresh every minute

    return () => clearInterval(intervalId)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatLargeNumber = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
    return formatCurrency(value)
  }

  return (
    <Card className="bg-black/50 border border-[#2fff00]/30">
      <CardHeader>
        <CardTitle className="text-[#2fff00]">Cryptocurrency Market Data</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>24h Change</TableHead>
                <TableHead className="hidden md:table-cell">Market Cap</TableHead>
                <TableHead className="hidden md:table-cell">Volume (24h)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cryptoData.map((crypto) => (
                <TableRow key={crypto.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-[#2fff00]">{crypto.name}</span>
                      <span className="text-xs text-muted-foreground uppercase">{crypto.symbol}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(crypto.current_price)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={crypto.price_change_percentage_24h >= 0 ? "default" : "destructive"}
                      className="flex items-center gap-1"
                    >
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{formatLargeNumber(crypto.market_cap)}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatLargeNumber(crypto.total_volume)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

