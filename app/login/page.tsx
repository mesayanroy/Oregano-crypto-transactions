"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Github, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { toast } = useToast()

  const handleLogin = (provider: string) => {
    // Implement login logic here
    console.log(`Logging in with ${provider}`)
    setIsLoggedIn(true)
    toast({
      title: "Logged In",
      description: `You have successfully logged in with ${provider}.`,
    })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted")
  }

  if (isLoggedIn) {
    return (
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome Back!</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      <div className="space-y-4">
        <Button className="w-full" onClick={() => handleLogin("Google")}>
          <Mail className="mr-2 h-4 w-4" /> Login with Google
        </Button>
        <Button className="w-full" onClick={() => handleLogin("GitHub")}>
          <Github className="mr-2 h-4 w-4" /> Login with GitHub
        </Button>
        <Button className="w-full" onClick={() => handleLogin("MetaMask")}>
          Login with MetaMask
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" placeholder="Enter your name" />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input type="text" id="role" name="role" placeholder="Enter your role" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" placeholder="Enter your email" />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input type="date" id="date" name="date" />
        </div>
        <div>
          <Label htmlFor="bonus">Bonus</Label>
          <Input type="number" id="bonus" name="bonus" placeholder="Enter your bonus" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="eligibility" />
          <Label htmlFor="eligibility">Are you eligible?</Label>
        </div>
        <div>
          <Label>Gender</Label>
          <RadioGroup defaultValue="male">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="about">Write about yourself</Label>
          <Textarea id="about" placeholder="Write here..." />
        </div>
        <div>
          <Label htmlFor="robot">Are you a Robot?</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button type="submit">Submit</Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </div>
      </form>
    </div>
  )
}

