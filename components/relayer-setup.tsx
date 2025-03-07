"use client"

import type React from "react"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const setupSteps = [
  {
    id: "basic-info",
    title: "Basic Information",
    description: "Set up your relayer's basic details.",
  },
  {
    id: "network-config",
    title: "Network Configuration",
    description: "Configure the network settings for your relayer.",
  },
  {
    id: "security",
    title: "Security Settings",
    description: "Set up security measures for your relayer.",
  },
  {
    id: "review",
    title: "Review and Create",
    description: "Review your settings and create your relayer.",
  },
]

export function RelayerSetup() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    network: "",
    approvalProcess: false,
    relayerType: "single",
    gasPrice: "",
    maxGasLimit: "",
    privateKey: "",
    whitelistedAddresses: "",
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < setupSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Relayer setup data:", formData)
    toast({
      title: "Relayer Created",
      description: "Your relayer has been successfully created",
    })
    setIsOpen(false)
    setCurrentStep(0)
    setFormData({
      name: "",
      network: "",
      approvalProcess: false,
      relayerType: "single",
      gasPrice: "",
      maxGasLimit: "",
      privateKey: "",
      whitelistedAddresses: "",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#2fff00] hover:bg-[#20cc00] text-black font-bold">
          Create Your First RELAYER With Us : Complete Set- Guidance
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-black/95 border-[#2fff00]/30">
        <DialogHeader>
          <DialogTitle className="text-[#2fff00]">Create Relayer</DialogTitle>
          <DialogDescription>Set up your relayer for handling gasless transactions.</DialogDescription>
        </DialogHeader>
        <Tabs value={setupSteps[currentStep].id} className="w-full">
          <TabsList className="grid grid-cols-4 bg-black/50">
            {setupSteps.map((step, index) => (
              <TabsTrigger
                key={step.id}
                value={step.id}
                className={`data-[state=active]:text-[#2fff00] data-[state=active]:border-b-2 data-[state=active]:border-[#2fff00]`}
                disabled
              >
                {index + 1}. {step.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {setupSteps.map((step, index) => (
            <TabsContent key={step.id} value={step.id}>
              <Card className="bg-black/50 border-[#2fff00]/30">
                <CardHeader>
                  <CardTitle className="text-[#2fff00]">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {index === 0 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Relayer Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-black/70 border-[#2fff00]/30 text-[#2fff00]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="network">Network</Label>
                        <Select
                          value={formData.network}
                          onValueChange={(value) => handleSelectChange("network", value)}
                        >
                          <SelectTrigger className="bg-black/70 border-[#2fff00]/30 text-[#2fff00]">
                            <SelectValue placeholder="Select a network" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ethereum">Ethereum</SelectItem>
                            <SelectItem value="polygon">Polygon</SelectItem>
                            <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="approvalProcess"
                          name="approvalProcess"
                          checked={formData.approvalProcess}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, approvalProcess: checked as boolean })
                          }
                        />
                        <Label htmlFor="approvalProcess">Create an Approval Process for this relayer</Label>
                      </div>
                      <RadioGroup
                        value={formData.relayerType}
                        onValueChange={(value) => handleSelectChange("relayerType", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="single" id="single" />
                          <Label htmlFor="single">Single Relayer</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="group" id="group" />
                          <Label htmlFor="group">Relayer Group</Label>
                        </div>
                      </RadioGroup>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="gasPrice">Gas Price (Gwei)</Label>
                        <Input
                          id="gasPrice"
                          name="gasPrice"
                          type="number"
                          value={formData.gasPrice}
                          onChange={handleInputChange}
                          className="bg-black/70 border-[#2fff00]/30 text-[#2fff00]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxGasLimit">Max Gas Limit</Label>
                        <Input
                          id="maxGasLimit"
                          name="maxGasLimit"
                          type="number"
                          value={formData.maxGasLimit}
                          onChange={handleInputChange}
                          className="bg-black/70 border-[#2fff00]/30 text-[#2fff00]"
                        />
                      </div>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="privateKey">Private Key (encrypted)</Label>
                        <Input
                          id="privateKey"
                          name="privateKey"
                          type="password"
                          value={formData.privateKey}
                          onChange={handleInputChange}
                          className="bg-black/70 border-[#2fff00]/30 text-[#2fff00]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="whitelistedAddresses">Whitelisted Addresses (comma-separated)</Label>
                        <Input
                          id="whitelistedAddresses"
                          name="whitelistedAddresses"
                          value={formData.whitelistedAddresses}
                          onChange={handleInputChange}
                          className="bg-black/70 border-[#2fff00]/30 text-[#2fff00]"
                        />
                      </div>
                    </>
                  )}
                  {index === 3 && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-[#2fff00]">Review Your Settings</h3>
                      <p>Name: {formData.name}</p>
                      <p>Network: {formData.network}</p>
                      <p>Approval Process: {formData.approvalProcess ? "Yes" : "No"}</p>
                      <p>Relayer Type: {formData.relayerType}</p>
                      <p>Gas Price: {formData.gasPrice} Gwei</p>
                      <p>Max Gas Limit: {formData.maxGasLimit}</p>
                      <p>Private Key: {formData.privateKey ? "Set" : "Not Set"}</p>
                      <p>Whitelisted Addresses: {formData.whitelistedAddresses || "None"}</p>
                    </div>
                  )}
                  <Button className="w-full bg-[#2fff00] hover:bg-[#20cc00] text-black" onClick={handleNextStep}>
                    {index === setupSteps.length - 1 ? "Create Relayer" : "Next"}{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
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

