"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

const REMIX_API_URL = "https://remix.ethereum.org"

export function SolidityContract() {
  const [contractCode, setContractCode] = useState(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OreganoToken {
    string public name = "Oregano Token";
    string public symbol = "OREG";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    constructor(uint256 initialSupply) {
        totalSupply = initialSupply * 10**uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value);
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
}`)
  const { toast } = useToast()

  const openInRemix = async () => {
    try {
      const encodedCode = encodeURIComponent(contractCode)
      window.open(`${REMIX_API_URL}/#code=${encodedCode}`, "_blank")
      toast({
        title: "Opening in Remix IDE",
        description: "Your smart contract is being loaded in Remix IDE",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open Remix IDE",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="bg-black/50 border border-[#2fff00]/30">
      <CardHeader>
        <CardTitle className="text-[#2fff00]">Solidity Smart Contract</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={contractCode}
          onChange={(e) => setContractCode(e.target.value)}
          className="font-mono h-[300px] bg-black/70 text-[#2fff00] border-[#2fff00]/30"
        />
        <Button onClick={openInRemix} className="w-full bg-[#2fff00] hover:bg-[#20cc00] text-black font-bold">
          Open in Remix IDE
        </Button>
      </CardContent>
    </Card>
  )
}

