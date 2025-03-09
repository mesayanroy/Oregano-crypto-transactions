"use client"

import { useEffect, useRef } from "react"

class Star {
  x: number
  y: number
  size: number
  speed: number

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 2
    this.speed = Math.random() * 3 + 1
  }

  update(canvas: HTMLCanvasElement) {
    this.y += this.speed
    if (this.y > canvas.height) {
      this.y = 0
      this.x = Math.random() * canvas.width
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.fillStyle = `rgba(47, 255, 0, ${Math.random() * 0.5 + 0.5})`
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

class Meteor {
  x: number
  y: number
  size: number
  speed: number
  tailLength: number
  angle: number

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width
    this.y = 0
    this.size = Math.random() * 2 + 2
    this.speed = Math.random() * 10 + 10
    this.tailLength = Math.random() * 100 + 50
    this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2
  }

  update(canvas: HTMLCanvasElement) {
    this.x += Math.cos(this.angle) * this.speed
    this.y += Math.sin(this.angle) * this.speed
    if (this.y > canvas.height || this.x > canvas.width) {
      this.x = Math.random() * canvas.width
      this.y = 0
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x - Math.cos(this.angle) * this.tailLength, this.y - Math.sin(this.angle) * this.tailLength)
    ctx.strokeStyle = `rgba(47, 255, 0, ${Math.random() * 0.5 + 0.5})`
    ctx.lineWidth = this.size
    ctx.stroke()
  }
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const stars = Array.from({ length: 100 }, () => new Star(canvas))
    const meteors = Array.from({ length: 5 }, () => new Meteor(canvas))

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        star.update(canvas)
        star.draw(ctx)
      })

      meteors.forEach((meteor) => {
        meteor.update(canvas)
        meteor.draw(ctx)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

