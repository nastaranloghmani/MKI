import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Sparkles, Zap, Cpu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { DecryptedText } from './DecryptedText';

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [textIndex, setTextIndex] = useState(0);
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rotatingTexts = ['Innovation', 'Excellence', 'Technology', 'Future'];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Modern tech wave animation with data streams
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    let time = 0;

    // Create data stream particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      opacity: number;
      size: number;
    }> = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        size: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Draw flowing waves
      const waveCount = 3;
      for (let wave = 0; wave < waveCount; wave++) {
        ctx.beginPath();
        ctx.strokeStyle = isDark
          ? `rgba(93, 190, 189, ${0.3 - wave * 0.05})`
          : `rgba(93, 190, 189, ${0.22 - wave * 0.04})`;
        ctx.lineWidth = 3;

        for (let x = 0; x < canvas.width; x += 5) {
          const y =
            canvas.height / 2 +
            Math.sin(x * 0.005 + time + wave * 0.5) * 80 +
            Math.sin(x * 0.003 + time * 0.8 + wave) * 40;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(93, 190, 189, ${particle.opacity})`
          : `rgba(93, 190, 189, ${particle.opacity * 0.7})`;
        ctx.fill();

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = isDark
              ? `rgba(93, 190, 189, ${0.4 * (1 - distance / 120)})`
              : `rgba(93, 190, 189, ${0.28 * (1 - distance / 120)})`;
            ctx.lineWidth = 2;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDark ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
      }`}
    >
      {/* Enhanced Animated Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: isDark ? 0.7 : 0.5 }}
      />

      {/* Animated Grid Background with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 ${isDark ? 'opacity-30' : 'opacity-40'}`}
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? 'rgba(93, 190, 189, 0.15)' : 'rgba(93, 190, 189, 0.08)'} 2px, transparent 2px),
              linear-gradient(90deg, ${isDark ? 'rgba(93, 190, 189, 0.15)' : 'rgba(93, 190, 189, 0.08)'} 2px, transparent 2px)
            `,
            backgroundSize: '100px 100px',
            transform: `translateY(${scrollY * 0.8}px) scale(${1 + scrollY * 0.0005})`,
          }}
        />
      </div>

      {/* MASSIVE Gradient Orbs with mouse parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-1/2 -left-1/2 w-[800px] h-[800px] rounded-full blur-3xl animate-float ${
            isDark ? 'bg-teal-500/30' : 'bg-teal-400/40'
          }`}
          style={{
            transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px) scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div
          className={`absolute -bottom-1/2 -right-1/2 w-[800px] h-[800px] rounded-full blur-3xl animate-float-delayed ${
            isDark ? 'bg-teal-600/30' : 'bg-teal-500/40'
          }`}
          style={{
            transform: `translate(${mousePos.x * -0.05}px, ${mousePos.y * -0.05}px) scale(${1 + Math.cos(Date.now() * 0.001) * 0.1})`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-3xl opacity-40 ${
            isDark ? 'bg-teal-400/20' : 'bg-teal-300/30'
          }`}
          style={{
            animation: 'float 12s ease-in-out infinite, pulse 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* Dramatic Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-teal-500/30 rotate-45 animate-spin-slow" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-teal-600/30 rounded-full animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border-2 border-teal-500/40 animate-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 border-2 border-teal-400/30 rotate-12 animate-spin-slower" />
        <div className="absolute bottom-1/3 left-1/4 w-28 h-28 border-2 border-teal-500/20 rounded-full animate-ping-slow" />
      </div>

      {/* Hero Content - Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            {/* Main heading with bold animations */}
            <div className="space-y-4">
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight animate-fade-in-up ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
                style={{
                  animationDelay: '0.2s',
                  animationDuration: '0.8s',
                  animationFillMode: 'both',
                }}
              >
                Crafting
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x" style={{ backgroundSize: '200% auto' }}>
                    Tomorrow's
                  </span>
                  {/* Bold animated underline */}
                  <span className="absolute -bottom-3 left-0 right-0 h-2 rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 animate-shimmer blur-sm" style={{ backgroundSize: '200% auto' }} />
                  <span className="absolute -bottom-3 left-0 right-0 h-2 rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 animate-shimmer" style={{ backgroundSize: '200% auto' }} />
                </span>
                <br />
                <span className="inline-block pt-3">Legacy</span>
              </h1>

              {/* Subheading */}
              <p
                className={`text-lg md:text-xl font-medium animate-fade-in-up ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
                style={{
                  animationDelay: '0.4s',
                  animationDuration: '0.8s',
                  animationFillMode: 'both',
                }}
              >
                <DecryptedText
                  text="Building the future through strategic "
                  delay={800}
                  speed={30}
                />
                <DecryptedText
                  text="innovation"
                  className={`${isDark ? 'text-teal-400' : 'text-teal-600'}`}
                  delay={1500}
                  speed={30}
                />
              </p>
            </div>


            {/* Stats */}
            <div
              className="flex gap-8 pt-8 border-t animate-fade-in-up"
              style={{
                animationDelay: '1s',
                animationDuration: '0.8s',
                animationFillMode: 'both',
                borderColor: isDark ? 'rgba(93, 190, 189, 0.2)' : 'rgba(93, 190, 189, 0.3)',
              }}
            >
              {[
                { value: '180+', label: 'Projects' },
                { value: '20+', label: 'Clients' },
                { value: '7+', label: 'Years' },
              ].map((stat, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm font-medium ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Modern Tech Visual */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Pulsing gradient background */}
              <div
                className={`absolute inset-0 rounded-full animate-pulse ${
                  isDark ? 'bg-gradient-to-br from-teal-500/20 to-cyan-500/20' : 'bg-gradient-to-br from-teal-400/30 to-cyan-400/30'
                } blur-3xl`}
                style={{ animationDuration: '3s' }}
              />


              {/* Center Quantum Core - SVG Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative group">
                  <img
                    src="/hero/quantum-core.svg"
                    alt="Quantum Core"
                    className="w-80 h-80 md:w-96 md:h-96 relative z-10"
                  />

                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 opacity-20 blur-3xl rounded-full" />
                  </div>
                </div>
              </div>

              {/* Orbiting data points */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 animate-spin-slower"
                  style={{
                    animationDuration: `${10 + i * 3}s`,
                    animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                  }}
                >
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full shadow-lg"
                    style={{
                      boxShadow: isDark
                        ? '0 0 20px rgba(93, 190, 189, 0.6)'
                        : '0 0 15px rgba(93, 190, 189, 0.5)',
                    }}
                  />
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <ChevronDown className={`w-10 h-10 ${isDark ? 'text-teal-400' : 'text-teal-500'}`} />
        </div>
      </div>

      {/* Dramatic Bottom Fade */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-48 pointer-events-none ${
          isDark ? 'bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent' : 'bg-gradient-to-t from-gray-50 via-gray-50/50 to-transparent'
        }`}
      />
    </section>
  );
};
