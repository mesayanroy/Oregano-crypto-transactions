"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react"

interface Transaction {
  id: string
  type: "send" | "receive"
  amount: number
  token: string
  timestamp: number
  from: string
  to: string
  hash: string
}

interface WalletTransactionsProps {
  walletType: string
  address: string
}

export function WalletTransactions({ walletType, address }: WalletTransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // In a real app, you would fetch from a blockchain explorer API
        // For demo purposes, we'll simulate a delay and use mock data
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Generate mock transactions
        const now = Date.now()
        const mockTransactions: Transaction[] = [
          {
            id: "tx1",
            type: "receive",
            amount: 0.05,
            token: "ETH",
            timestamp: now - 3600000, // 1 hour ago
            from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            to: address,
            hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          },
          {
            id: "tx2",
            type: "send",
            amount: 0.02,
            token: "ETH",
            timestamp: now - 86400000, // 1 day ago
            from: address,
            to: "0x8901234567abcdef8901234567abcdef8901234567abcdef8901234567abcdef",
            hash: "0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef",
          },
          {
            id: "tx3",
            type: "receive",
            amount: 100,
            token: "USDT",
            timestamp: now - 172800000, // 2 days ago
            from: "0x9012345678abcdef9012345678abcdef9012345678abcdef9012345678abcdef",
            to: address,
            hash: "0x3456789012abcdef3456789012abcdef3456789012abcdef3456789012abcdef",
          },
          {
            id: "tx4",
            type: "send",
            amount: 50,
            token: "USDT",
            timestamp: now - 259200000, // 3 days ago
            from: address,
            to: "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
            hash: "0x4567890123abcdef4567890123abcdef4567890123abcdef4567890123abcdef",
          },
          {
            id: "tx5",
            type: "receive",
            amount: 0.1,
            token: "ETH",
            timestamp: now - 345600000, // 4 days ago
            from: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
            to: address,
            hash: "0x5678901234abcdef5678901234abcdef5678901234abcdef5678901234abcdef",
          },
        ]

        setTransactions(mockTransactions)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch transactions:", error)
        setLoading(false)
      }
    }

    if (address) {
      fetchTransactions()
    }
  }, [address])

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const getExplorerUrl = (hash: string) => {
    // In a real app, you would use the appropriate explorer URL based on the network
    return `https://etherscan.io/tx/${hash}`
  }

  return (
    <Card className="bg-black/50 border border-[#2fff00]/30">
      <CardHeader>
        <CardTitle className="text-[#2fff00]">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : transactions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">From/To</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <Badge variant={tx.type === "receive" ? "default" : "outline"} className="flex items-center gap-1">
                      {tx.type === "receive" ? (
                        <ArrowDownRight className="h-3 w-3" />
                      ) : (
                        <ArrowUpRight className="h-3 w-3" />
                      )}
                      {tx.type === "receive" ? "Received" : "Sent"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {tx.amount} {tx.token}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(tx.timestamp)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {tx.type === "receive" ? truncateAddress(tx.from) : truncateAddress(tx.to)}
                  </TableCell>
                  <TableCell>
                    <a
                      href={getExplorerUrl(tx.hash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2fff00] hover:text-[#20cc00] flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No transactions found for this wallet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

