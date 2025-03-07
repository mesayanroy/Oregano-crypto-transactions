"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, MinimizeIcon } from "lucide-react"

interface Message {
  type: "user" | "bot"
  content: string
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", content: "Hello! How can I help you with blockchain today?" },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { type: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response - Replace with actual AI integration
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "I'm here to help! Let me find information about that in our blockchain documentation.",
        },
      ])
    }, 1000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 bg-[#2fff00] hover:bg-[#20cc00] text-black"
        >
          <MessageCircle />
        </Button>
      ) : (
        <Card className="w-[350px] h-[500px] flex flex-col bg-black border border-[#2fff00]/30">
          <CardHeader className="bg-[#2fff00]/10 border-b border-[#2fff00]/30">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#2fff00]">Blockchain Assistant</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-[#2fff00] hover:text-[#20cc00]"
                >
                  <MinimizeIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-[#2fff00] hover:text-[#20cc00]"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.type === "user" ? "bg-[#2fff00] text-black" : "bg-[#2fff00]/10 text-[#2fff00]"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
          <div className="p-4 border-t border-[#2fff00]/30">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about blockchain..."
                className="flex-1 bg-black/70 text-[#2fff00] border-[#2fff00]/30"
              />
              <Button type="submit" className="bg-[#2fff00] hover:bg-[#20cc00] text-black">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </div>
  )
}

