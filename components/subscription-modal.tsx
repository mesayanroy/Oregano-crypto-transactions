"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: ["Basic transaction support", "Community support", "Standard gas fees", "1 wallet connection"],
  },
  {
    name: "Gold",
    price: "$49/month",
    description: "For serious crypto traders",
    features: [
      "Priority transaction support",
      "24/7 Email support",
      "Reduced gas fees",
      "Multiple wallet connections",
      "Advanced analytics",
    ],
  },
  {
    name: "Premium",
    price: "$99/month",
    description: "Enterprise-grade solution",
    features: [
      "Instant transaction support",
      "24/7 Priority support",
      "Minimal gas fees",
      "Unlimited wallet connections",
      "Advanced analytics",
      "Custom API access",
      "Dedicated account manager",
    ],
  },
]

export function SubscriptionModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-black/50 border-[#2fff00]/30 text-[#2fff00] hover:bg-[#2fff00]/10">
          View Subscription Plans
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-black/95 border-[#2fff00]/30">
        <DialogHeader>
          <DialogTitle className="text-[#2fff00] text-2xl">Choose Your Plan</DialogTitle>
          <DialogDescription>
            Select the plan that best fits your needs. All plans include our core features.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {plans.map((plan) => (
            <Card key={plan.name} className="bg-black/50 border-[#2fff00]/30 hover:border-[#2fff00] transition-colors">
              <CardHeader>
                <CardTitle className="text-[#2fff00]">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="text-2xl font-bold text-[#2fff00]">{plan.price}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#2fff00]" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

