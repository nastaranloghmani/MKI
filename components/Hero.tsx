import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { DecryptedText } from './DecryptedText';

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      {/* Enhanced Animated Particle Canvas - Hidden on mobile for performance */}
      <canvas
        ref={canvasRef}
        className="hidden md:block absolute inset-0 z-0"
        style={{ opacity: isDark ? 0.7 : 0.5 }}
      />

      {/* Animated Grid Background with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 ${isDark ? 'opacity-20 md:opacity-30' : 'opacity-30 md:opacity-40'}`}
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? 'rgba(93, 190, 189, 0.1)' : 'rgba(93, 190, 189, 0.06)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? 'rgba(93, 190, 189, 0.1)' : 'rgba(93, 190, 189, 0.06)'} 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translateY(${scrollY * 0.8}px) scale(${1 + scrollY * 0.0005})`,
          }}
        />
      </div>

      {/* MASSIVE Gradient Orbs with mouse parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-1/2 -left-1/2 w-[300px] sm:w-[500px] md:w-[800px] h-[300px] sm:h-[500px] md:h-[800px] rounded-full blur-3xl animate-float ${
            isDark ? 'bg-teal-500/10 md:bg-teal-500/30' : 'bg-teal-400/20 md:bg-teal-400/40'
          }`}
          style={{
            transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px) scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div
          className={`absolute -bottom-1/2 -right-1/2 w-[300px] sm:w-[500px] md:w-[800px] h-[300px] sm:h-[500px] md:h-[800px] rounded-full blur-3xl animate-float-delayed ${
            isDark ? 'bg-teal-600/10 md:bg-teal-600/30' : 'bg-teal-500/20 md:bg-teal-500/40'
          }`}
          style={{
            transform: `translate(${mousePos.x * -0.05}px, ${mousePos.y * -0.05}px) scale(${1 + Math.cos(Date.now() * 0.001) * 0.1})`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div
          className={`hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-3xl opacity-40 ${
            isDark ? 'bg-teal-400/20' : 'bg-teal-300/30'
          }`}
          style={{
            animation: 'float 12s ease-in-out infinite, pulse 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* Desktop Floating Geometric Shapes */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-teal-500/30 rotate-45 animate-spin-slow" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-teal-600/30 rounded-full animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border-2 border-teal-500/40 animate-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 border-2 border-teal-400/30 rotate-12 animate-spin-slower" />
        <div className="absolute bottom-1/3 left-1/4 w-28 h-28 border-2 border-teal-500/20 rounded-full animate-ping-slow" />
      </div>

      {/* Mobile Animated Background Elements */}
      <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Dots - Layer 1 */}
        <div className={`absolute top-20 left-10 w-2 h-2 rounded-full ${isDark ? 'bg-teal-400/40' : 'bg-teal-500/30'} animate-float`} />
        <div className={`absolute top-32 right-12 w-3 h-3 rounded-full ${isDark ? 'bg-cyan-400/40' : 'bg-cyan-500/30'} animate-float-delayed`} />
        <div className={`absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full ${isDark ? 'bg-teal-300/40' : 'bg-teal-400/30'} animate-pulse`} style={{ animationDuration: '3s' }} />
        <div className={`absolute top-2/3 right-1/4 w-2.5 h-2.5 rounded-full ${isDark ? 'bg-cyan-300/40' : 'bg-cyan-400/30'} animate-float`} />
        <div className={`absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full ${isDark ? 'bg-teal-400/40' : 'bg-teal-500/30'} animate-float-delayed`} />
        <div className={`absolute bottom-24 right-16 w-1.5 h-1.5 rounded-full ${isDark ? 'bg-cyan-400/40' : 'bg-cyan-500/30'} animate-pulse`} style={{ animationDuration: '2.5s' }} />

        {/* Floating Dots - Layer 2 (More dots) */}
        <div className={`absolute top-16 right-20 w-2 h-2 rounded-full ${isDark ? 'bg-blue-400/30' : 'bg-blue-500/25'} animate-float`} style={{ animationDuration: '5s' }} />
        <div className={`absolute top-48 left-16 w-1.5 h-1.5 rounded-full ${isDark ? 'bg-teal-300/35' : 'bg-teal-400/28'} animate-pulse`} style={{ animationDuration: '2.8s' }} />
        <div className={`absolute top-56 right-24 w-2.5 h-2.5 rounded-full ${isDark ? 'bg-cyan-300/35' : 'bg-cyan-400/28'} animate-float-delayed`} />
        <div className={`absolute bottom-40 left-12 w-1.5 h-1.5 rounded-full ${isDark ? 'bg-teal-400/35' : 'bg-teal-500/28'} animate-float`} />
        <div className={`absolute bottom-48 right-10 w-2 h-2 rounded-full ${isDark ? 'bg-blue-300/35' : 'bg-blue-400/28'} animate-pulse`} style={{ animationDuration: '3.2s' }} />
        <div className={`absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full ${isDark ? 'bg-cyan-400/35' : 'bg-cyan-500/28'} animate-float-delayed`} />
        <div className={`absolute top-3/4 right-1/3 w-2 h-2 rounded-full ${isDark ? 'bg-teal-300/35' : 'bg-teal-400/28'} animate-float`} style={{ animationDuration: '4.5s' }} />

        {/* Small Geometric Shapes */}
        <div className={`absolute top-40 right-8 w-12 h-12 border ${isDark ? 'border-teal-400/20' : 'border-teal-500/15'} rounded-lg rotate-45 animate-spin-slower`} />
        <div className={`absolute top-1/2 left-8 w-8 h-8 border ${isDark ? 'border-cyan-400/20' : 'border-cyan-500/15'} rotate-12 animate-float`} />
        <div className={`absolute bottom-32 right-20 w-10 h-10 border ${isDark ? 'border-teal-300/20' : 'border-teal-400/15'} rounded-full animate-float-delayed`} />

        {/* Additional Geometric Shapes */}
        <div className={`absolute top-24 left-6 w-6 h-6 border ${isDark ? 'border-blue-400/15' : 'border-blue-500/12'} rotate-45 animate-pulse`} style={{ animationDuration: '3.5s' }} />
        <div className={`absolute top-60 right-6 w-14 h-14 border ${isDark ? 'border-teal-300/15' : 'border-teal-400/12'} rounded-lg animate-float`} style={{ animationDuration: '6s' }} />
        <div className={`absolute bottom-40 left-20 w-7 h-7 border ${isDark ? 'border-cyan-300/15' : 'border-cyan-400/12'} rounded-full animate-spin-slower`} />
        <div className={`absolute top-1/3 right-1/4 w-9 h-9 border ${isDark ? 'border-teal-400/15' : 'border-teal-500/12'} rotate-12 animate-float-delayed`} />
        <div className={`absolute bottom-1/4 right-12 w-11 h-11 border ${isDark ? 'border-blue-300/15' : 'border-blue-400/12'} rounded-lg rotate-45 animate-float`} style={{ animationDuration: '5.5s' }} />

        {/* Gradient Circles - Layer 1 */}
        <div className={`absolute top-1/4 right-1/3 w-16 h-16 rounded-full ${isDark ? 'bg-teal-500/5' : 'bg-teal-400/10'} blur-xl animate-pulse`} style={{ animationDuration: '4s' }} />
        <div className={`absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-400/10'} blur-xl animate-pulse`} style={{ animationDuration: '3.5s' }} />

        {/* Gradient Circles - Layer 2 (More gradients) */}
        <div className={`absolute top-1/3 left-1/4 w-24 h-24 rounded-full ${isDark ? 'bg-blue-500/5' : 'bg-blue-400/8'} blur-2xl animate-pulse`} style={{ animationDuration: '5s' }} />
        <div className={`absolute top-2/3 right-1/4 w-18 h-18 rounded-full ${isDark ? 'bg-teal-400/5' : 'bg-teal-300/8'} blur-xl animate-pulse`} style={{ animationDuration: '4.5s' }} />
        <div className={`absolute bottom-1/3 left-12 w-22 h-22 rounded-full ${isDark ? 'bg-cyan-400/5' : 'bg-cyan-300/8'} blur-2xl animate-pulse`} style={{ animationDuration: '3.8s' }} />
        <div className={`absolute top-44 right-16 w-20 h-20 rounded-full ${isDark ? 'bg-teal-500/5' : 'bg-teal-400/8'} blur-xl animate-pulse`} style={{ animationDuration: '4.2s' }} />

        {/* Sparkle Effects */}
        <div className={`absolute top-28 left-14 w-1 h-1 rounded-full ${isDark ? 'bg-white/60' : 'bg-white/50'} animate-ping`} style={{ animationDuration: '2s' }} />
        <div className={`absolute top-52 right-18 w-1 h-1 rounded-full ${isDark ? 'bg-white/60' : 'bg-white/50'} animate-ping`} style={{ animationDuration: '2.3s' }} />
        <div className={`absolute bottom-36 left-24 w-1 h-1 rounded-full ${isDark ? 'bg-white/60' : 'bg-white/50'} animate-ping`} style={{ animationDuration: '2.6s' }} />
        <div className={`absolute top-3/4 right-20 w-1 h-1 rounded-full ${isDark ? 'bg-white/60' : 'bg-white/50'} animate-ping`} style={{ animationDuration: '2.1s' }} />

        {/* Animated Lines */}
        <div className={`absolute top-36 left-4 w-16 h-0.5 ${isDark ? 'bg-gradient-to-r from-transparent via-teal-400/30 to-transparent' : 'bg-gradient-to-r from-transparent via-teal-500/25 to-transparent'} animate-pulse`} style={{ animationDuration: '3s' }} />
        <div className={`absolute bottom-28 right-8 w-20 h-0.5 ${isDark ? 'bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent' : 'bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent'} animate-pulse`} style={{ animationDuration: '3.5s' }} />
        <div className={`absolute top-1/2 left-1/4 w-12 h-0.5 rotate-45 ${isDark ? 'bg-gradient-to-r from-transparent via-blue-400/30 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-500/25 to-transparent'} animate-pulse`} style={{ animationDuration: '4s' }} />
      </div>

      {/* Hero Content - Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-8 text-center lg:text-left">
            {/* Main heading with bold animations */}
            <div className="space-y-4 sm:space-y-5 lg:space-y-4">
              <h1
                className={`text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tight animate-fade-in-up ${
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
                  <span className="absolute -bottom-1.5 sm:-bottom-3 left-0 right-0 h-1 sm:h-2 rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 animate-shimmer blur-sm" style={{ backgroundSize: '200% auto' }} />
                  <span className="absolute -bottom-1.5 sm:-bottom-3 left-0 right-0 h-1 sm:h-2 rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 animate-shimmer" style={{ backgroundSize: '200% auto' }} />
                </span>
                <br />
                <span className="inline-block pt-2 sm:pt-3">Legacy</span>
              </h1>

              {/* Subheading */}
              <p
                className={`text-base sm:text-lg md:text-lg lg:text-xl font-medium animate-fade-in-up px-1 sm:px-0 max-w-md mx-auto lg:mx-0 ${
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


            {/* Stats - Mobile with boxes, Desktop simple */}
            <div
              className="flex justify-center lg:justify-start gap-3 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 lg:border-t animate-fade-in-up lg:mx-0 mx-2"
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
                <div
                  key={index}
                  className={`relative group cursor-pointer px-4 py-3 sm:px-6 sm:py-4 lg:px-0 lg:py-0 rounded-2xl lg:rounded-none transition-all duration-300 ${
                    isDark
                      ? 'bg-gradient-to-br from-teal-500/10 to-cyan-500/10 hover:from-teal-500/20 hover:to-cyan-500/20 lg:bg-none'
                      : 'bg-gradient-to-br from-teal-500/10 to-cyan-500/10 hover:from-teal-500/20 hover:to-cyan-500/20 lg:bg-none'
                  }`}
                >
                  <div className={`lg:hidden absolute inset-0 rounded-2xl border ${isDark ? 'border-teal-500/20' : 'border-teal-500/30'} group-hover:border-teal-500/40 transition-colors duration-300`} />
                  <div className="relative text-center">
                    <div className={`text-2xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                      {stat.value}
                    </div>
                    <div className={`text-[10px] sm:text-sm font-semibold mt-0.5 sm:mt-1 ${isDark ? 'text-teal-400/80 lg:text-gray-500' : 'text-teal-600/80 lg:text-gray-600'}`}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Feature Badges */}
            <div
              className="lg:hidden flex flex-wrap justify-center gap-3 pt-2"
              style={{
                animation: 'fadeInUp 0.6s ease-out 1.4s both',
              }}
            >
              {[
                { icon: '🎯', text: 'Strategic' },
                { icon: '⚡', text: 'Fast' },
                { icon: '🔒', text: 'Secure' },
              ].map((badge, index) => (
                <div
                  key={index}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${
                    isDark
                      ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                      : 'bg-teal-500/10 text-teal-600 border border-teal-500/30'
                  }`}
                >
                  <span className="text-sm">{badge.icon}</span>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Mobile CTA Button */}
            <div className="lg:hidden flex justify-center pt-6">
              <a
                href="#contact"
                className={`group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 shadow-lg hover:shadow-2xl hover:shadow-teal-500/50 transition-all duration-500 overflow-hidden`}
                style={{
                  animation: 'fadeInUp 0.6s ease-out 1.6s both',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative text-sm font-bold">Get Started</span>
                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Right Side - Modern Tech Visual */}
          <div className="hidden lg:flex relative lg:h-[600px] items-center justify-center">
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
                    className="w-96 h-96 relative z-10"
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
                        ? '0 0 15px rgba(93, 190, 189, 0.6)'
                        : '0 0 10px rgba(93, 190, 189, 0.5)',
                    }}
                  />
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden sm:block absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <ChevronDown className={`w-8 h-8 sm:w-10 sm:h-10 ${isDark ? 'text-teal-400' : 'text-teal-500'}`} />
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
