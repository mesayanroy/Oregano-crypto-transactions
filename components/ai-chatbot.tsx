"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, MinimizeIcon } from "lucide-react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

interface Message {
  type: "user" | "bot";
  content: string;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", content: "Hello! How may I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Function to process user messages with Gemini AI
  const processUserMessage = async (userMessage: string): Promise<string> => {
    setIsLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; // Use environment variable
      if (!apiKey) {
        console.error("API Key is missing!");
        return "Error: API Key is missing!";
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: `
          "You are Oregano AI, an assistant specializing in gasless crypto transactions using meta-transactions.  
Your goal is to assist users in understanding, integrating, and troubleshooting Oregano, a platform that removes the need for users to pay gas fees by using relayers.  

## About Oregano (Explained Simply):  
- *What is Oregano?*  
  Oregano is like a "prepaid toll service" for blockchain transactions. Normally, when you make a transaction on Ethereum or similar blockchains, you must pay a small fee (gas fee) to process it. Oregano removes this cost by letting a relayer (a third-party service) pay the fee for you.  

- *How Does Oregano Work?*  
  Imagine you want to send a package but don’t have cash for delivery. Instead, a courier service pays for you and later charges you a tiny service fee. Oregano does the same for blockchain transactions using relayers.  

- *How is it Built?*  
  Oregano works on Ethereum and other EVM-compatible blockchains. It uses smart contracts (self-executing agreements) to ensure fairness and security.  

## Key Technologies (Broken Down):  
- *ERC-2771 (Trusted Forwarders):* Think of it like a verified delivery partner who ensures your package reaches safely without you needing to pay upfront.  
- *EIP-712 (Typed Structured Data Signing):* A fancy way of saying that transactions are securely signed in a way that apps can verify easily.  
- *ERC-2612 (Permit Functions):* Allows you to approve token transactions without paying gas fees, making it much easier for users.  
- *Web3 Libraries (ethers.js, web3.js, WalletConnect):* These are tools developers use to connect apps to Oregano and handle blockchain interactions smoothly.  

## Responsibilities:  
- Explain Oregano in a way that even a beginner with zero knowledge can understand.  
- Guide developers on integrating Oregano into their apps.  
- Troubleshoot issues related to relayers, Web3 libraries, and gasless transactions.  
- Provide best practices for secure and efficient gasless transactions.  
- Stay professional, concise, and easy to understand, using analogies and examples where possible.  
"

        `,
      });

      const generationConfig = {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
        responseMimeType: "text/plain",
      };

      // Ensure the conversation history starts with a user message
      const chatHistory = messages
        .filter(msg => msg.type === "user") // Keep only user messages
        .map(msg => ({
          role: "user",
          parts: [{ text: msg.content }],
        }));

      const chatSession = model.startChat({
        generationConfig,
        history: chatHistory, // Only user messages
      });

      // Send user message to AI
      const result = await chatSession.sendMessage(userMessage);
      return result.response.text(); // Extract AI response

    } catch (error) {
      console.error("Error processing message:", error);
      return "I'm sorry, I couldn't process your request at the moment. Please try again later.";
    } finally {
      setIsLoading(false);
    }
  };

  // Handles sending messages
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { type: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Process user message and get bot response
    const botResponse = await processUserMessage(input);

    setMessages(prev => [
      ...prev,
      { type: "bot", content: botResponse },
    ]);
  };

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
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-[#2fff00]/10 text-[#2fff00]">
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <div className="p-4 border-t border-[#2fff00]/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Oregano..."
                className="flex-1 bg-black/70 text-[#2fff00] border-[#2fff00]/30"
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="bg-[#2fff00] hover:bg-[#20cc00] text-black"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </div>
  );
}