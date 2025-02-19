"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Github, Mail } from "lucide-react"

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
    </div>
  )
}

