"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, Eye, RefreshCw } from "lucide-react"

const steps = [
  {
    id: "report",
    title: "Generate your Code Inspector Report",
    icon: Code,
    description: "Start by analyzing your smart contract code for potential vulnerabilities.",
  },
  {
    id: "monitor",
    title: "Create your Monitor",
    icon: Eye,
    description: "Set up monitoring for your blockchain transactions and events.",
  },
  {
    id: "relayer",
    title: "Relayer",
    icon: RefreshCw,
    description: "Configure your transaction relayer for gasless transactions.",
  },
]

export function FreeTrialFlow() {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#2fff00] hover:bg-[#20cc00] text-black font-bold">Start Free Trial</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-black/95 border-[#2fff00]/30">
        <DialogHeader>
          <DialogTitle className="text-[#2fff00] text-2xl">Welcome to Oregano</DialogTitle>
          <DialogDescription>Follow these steps to get started with your free trial.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue={steps[currentStep].id} className="w-full">
          <TabsList className="grid grid-cols-3 bg-black/50">
            {steps.map((step, index) => (
              <TabsTrigger
                key={step.id}
                value={step.id}
                className={`data-[state=active]:text-[#2fff00] data-[state=active]:border-b-2 data-[state=active]:border-[#2fff00]`}
                onClick={() => setCurrentStep(index)}
              >
                {index + 1}. {step.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {steps.map((step, index) => (
            <TabsContent key={step.id} value={step.id}>
              <Card className="bg-black/50 border-[#2fff00]/30">
                <CardHeader>
                  <CardTitle className="text-[#2fff00] flex items-center gap-2">
                    <step.icon className="h-6 w-6" />
                    {step.title}
                  </CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full bg-[#2fff00] hover:bg-[#20cc00] text-black"
                    onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
                  >
                    {index === steps.length - 1 ? "Complete Setup" : "Continue"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

