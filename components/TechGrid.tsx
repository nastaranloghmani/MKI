import React, { useEffect, useRef } from 'react'

interface TechGridProps {
  className?: string
}

export function TechGrid({ className = '' }: TechGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Node class for the network
    class Node {
      x: number
      y: number
      baseX: number
      baseY: number
      vx: number
      vy: number
      radius: number
      pulsePhase: number
      pulseSpeed: number
      connections: Node[]
      isActive: boolean
      activeTimer: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.radius = Math.random() * 2 + 1.5
        this.pulsePhase = Math.random() * Math.PI * 2
        this.pulseSpeed = 0.02 + Math.random() * 0.02
        this.connections = []
        this.isActive = Math.random() > 0.7
        this.activeTimer = Math.random() * 100
      }

      update() {
        // Gentle floating motion
        this.x += this.vx
        this.y += this.vy

        // Boundary check with soft bounce
        const margin = 50
        if (this.x < margin || this.x > canvas.width - margin) this.vx *= -1
        if (this.y < margin || this.y > canvas.height - margin) this.vy *= -1

        // Return to base position slowly
        this.x += (this.baseX - this.x) * 0.001
        this.y += (this.baseY - this.y) * 0.001

        // Update pulse
        this.pulsePhase += this.pulseSpeed

        // Random activation
        this.activeTimer--
        if (this.activeTimer <= 0) {
          this.isActive = !this.isActive
          this.activeTimer = 50 + Math.random() * 150
        }
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5
        const currentRadius = this.radius + pulse * 1.5

        // Outer glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, currentRadius * 4
        )

        if (this.isActive) {
          gradient.addColorStop(0, 'rgba(99, 179, 237, 0.8)')
          gradient.addColorStop(0.3, 'rgba(99, 179, 237, 0.3)')
          gradient.addColorStop(1, 'rgba(99, 179, 237, 0)')
        } else {
          gradient.addColorStop(0, 'rgba(148, 163, 184, 0.5)')
          gradient.addColorStop(0.3, 'rgba(148, 163, 184, 0.15)')
          gradient.addColorStop(1, 'rgba(148, 163, 184, 0)')
        }

        ctx.beginPath()
        ctx.arc(this.x, this.y, currentRadius * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = this.isActive ? 'rgba(99, 179, 237, 1)' : 'rgba(148, 163, 184, 0.8)'
        ctx.fill()
      }
    }

    // Data packet class
    class DataPacket {
      startNode: Node
      endNode: Node
      progress: number
      speed: number
      active: boolean

      constructor(start: Node, end: Node) {
        this.startNode = start
        this.endNode = end
        this.progress = 0
        this.speed = 0.008 + Math.random() * 0.012
        this.active = true
      }

      update() {
        this.progress += this.speed
        if (this.progress >= 1) {
          this.active = false
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const x = this.startNode.x + (this.endNode.x - this.startNode.x) * this.progress
        const y = this.startNode.y + (this.endNode.y - this.startNode.y) * this.progress

        // Packet glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8)
        gradient.addColorStop(0, 'rgba(99, 179, 237, 1)')
        gradient.addColorStop(0.5, 'rgba(99, 179, 237, 0.5)')
        gradient.addColorStop(1, 'rgba(99, 179, 237, 0)')

        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
      }
    }

    // Create nodes in a grid pattern with some randomization
    const nodes: Node[] = []
    const gridSpacingX = 120
    const gridSpacingY = 100
    const cols = Math.ceil(canvas.width / gridSpacingX) + 2
    const rows = Math.ceil(canvas.height / gridSpacingY) + 2

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * gridSpacingX + (Math.random() - 0.5) * 40
        const y = j * gridSpacingY + (Math.random() - 0.5) * 40
        nodes.push(new Node(x, y))
      }
    }

    // Create connections
    const maxDistance = 180
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < maxDistance) {
          nodes[i].connections.push(nodes[j])
          nodes[j].connections.push(nodes[i])
        }
      }
    }

    // Data packets
    let packets: DataPacket[] = []
    let packetTimer = 0

    // Hexagon grid pattern
    const drawHexGrid = (ctx: CanvasRenderingContext2D, time: number) => {
      const hexSize = 30
      const hexHeight = hexSize * Math.sqrt(3)
      const hexWidth = hexSize * 2

      ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)'
      ctx.lineWidth = 1

      for (let row = -1; row < canvas.height / hexHeight + 1; row++) {
        for (let col = -1; col < canvas.width / (hexWidth * 0.75) + 1; col++) {
          const x = col * hexWidth * 0.75
          const y = row * hexHeight + (col % 2) * (hexHeight / 2)

          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i + Math.PI / 6
            const hx = x + hexSize * Math.cos(angle)
            const hy = y + hexSize * Math.sin(angle)
            if (i === 0) ctx.moveTo(hx, hy)
            else ctx.lineTo(hx, hy)
          }
          ctx.closePath()
          ctx.stroke()
        }
      }
    }

    // Animation loop
    let time = 0
    const animate = () => {
      time += 0.016

      // Clear with gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      bgGradient.addColorStop(0, '#f8fafc')
      bgGradient.addColorStop(0.5, '#f1f5f9')
      bgGradient.addColorStop(1, '#e2e8f0')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw hex grid
      drawHexGrid(ctx, time)

      // Draw connections
      for (const node of nodes) {
        for (const conn of node.connections) {
          if (nodes.indexOf(conn) > nodes.indexOf(node)) {
            const dx = node.x - conn.x
            const dy = node.y - conn.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const alpha = Math.max(0, 1 - distance / maxDistance) * 0.3

            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(conn.x, conn.y)

            if (node.isActive && conn.isActive) {
              ctx.strokeStyle = `rgba(99, 179, 237, ${alpha})`
              ctx.lineWidth = 1.5
            } else {
              ctx.strokeStyle = `rgba(148, 163, 184, ${alpha * 0.5})`
              ctx.lineWidth = 1
            }
            ctx.stroke()
          }
        }
      }

      // Update and draw nodes
      for (const node of nodes) {
        node.update()
        node.draw(ctx, time)
      }

      // Spawn new packets
      packetTimer++
      if (packetTimer > 30) {
        packetTimer = 0
        const activeNodes = nodes.filter(n => n.isActive && n.connections.length > 0)
        if (activeNodes.length > 0) {
          const startNode = activeNodes[Math.floor(Math.random() * activeNodes.length)]
          const endNode = startNode.connections[Math.floor(Math.random() * startNode.connections.length)]
          packets.push(new DataPacket(startNode, endNode))
        }
      }

      // Update and draw packets
      packets = packets.filter(p => p.active)
      for (const packet of packets) {
        packet.update()
        packet.draw(ctx)
      }

      // Floating code snippets
      ctx.font = '10px monospace'
      ctx.fillStyle = 'rgba(99, 179, 237, 0.15)'
      const codeSnippets = ['{ }', '< />', '[ ]', '( )', '0x', '//']
      for (let i = 0; i < 20; i++) {
        const x = ((time * 20 + i * 200) % (canvas.width + 100)) - 50
        const y = (i * 80 + Math.sin(time + i) * 20) % canvas.height
        ctx.fillText(codeSnippets[i % codeSnippets.length], x, y)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}
