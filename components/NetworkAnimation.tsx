import React, { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export const NetworkAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Initialize nodes
    const nodeCount = 12;
    const nodes: Node[] = [];
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 2,
      });
    }
    nodesRef.current = nodes;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const connectionDistance = isHovered ? 150 : 120;

      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Keep within bounds
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      });

      // Draw connections
      nodes.forEach((node1, i) => {
        nodes.slice(i + 1).forEach((node2) => {
          const dx = node2.x - node1.x;
          const dy = node2.y - node1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.4;
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
            ctx.lineWidth = isHovered ? 1.5 : 1;
            ctx.beginPath();
            ctx.moveTo(node1.x, node1.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        // Outer glow
        if (isHovered) {
          const gradient = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            node.radius * 3
          );
          gradient.addColorStop(0, 'rgba(6, 182, 212, 0.3)');
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Main node
        ctx.fillStyle = '#06b6d4';
        ctx.shadowBlur = isHovered ? 15 : 10;
        ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner core
        ctx.fillStyle = '#22d3ee';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw data packets traveling along connections
      if (isHovered) {
        const time = Date.now() * 0.001;
        nodes.forEach((node1, i) => {
          nodes.slice(i + 1).forEach((node2) => {
            const dx = node2.x - node1.x;
            const dy = node2.y - node1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              const progress = (Math.sin(time * 2 + i) + 1) * 0.5;
              const packetX = node1.x + dx * progress;
              const packetY = node1.y + dy * progress;

              ctx.fillStyle = '#22d3ee';
              ctx.shadowBlur = 8;
              ctx.shadowColor = 'rgba(34, 211, 238, 1)';
              ctx.beginPath();
              ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          });
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', updateSize);
    };
  }, [isHovered]);

  return (
    <div className="relative">
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-20 blur-lg" />

      {/* Main container */}
      <div
        className="relative bg-gradient-to-br from-[#0f1f3a]/90 to-[#0a1628]/90 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 aspect-video flex items-center justify-center overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Tech pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(6, 182, 212, 0.1) 2px,
                rgba(6, 182, 212, 0.1) 4px
              )
            `,
          }}
        />

        {/* Animated gradient border effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 blur-sm animate-border-flow" />
        </div>

        {/* Canvas for network animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Center text overlay */}
        <div className="relative z-10 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="text-cyan-400 font-bold text-lg mb-2">Connected Innovation</div>
          <div className="text-gray-400 text-sm">Building the future together</div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
};
