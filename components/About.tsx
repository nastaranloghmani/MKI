import { useTheme } from '../context/ThemeContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useEffect, useState } from 'react'

export function About() {
  const { isDark } = useTheme()
  const headerReveal = useScrollReveal({ threshold: 0.2 })
  const card1Reveal = useScrollReveal({ threshold: 0.2 })
  const card2Reveal = useScrollReveal({ threshold: 0.2 })
  const card3Reveal = useScrollReveal({ threshold: 0.2 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect()
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / rect.height))
        setScrollY(scrollProgress)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      title: 'Strategic Vision',
      description:
        'We identify and cultivate technologies that have the potential to reshape industries and improve lives.',
      reveal: card1Reveal,
      delay: '0.1s',
      animation: '/animations/strategic-vision.svg',
    },
    {
      title: 'Sustainable Growth',
      description:
        'Building resilient systems and business models that stand the test of time in a rapidly evolving digital landscape.',
      reveal: card2Reveal,
      delay: '0.2s',
      animation: '/animations/sustainable-growth.svg',
    },
    {
      title: 'Rapid Innovation',
      description:
        'Accelerating development through agile methodologies and cutting-edge technical expertise.',
      reveal: card3Reveal,
      delay: '0.3s',
      animation: '/animations/rapid-innovation.svg',
    },
  ]

  // Animation Component
  const AnimationCard = ({ animation, title, isDark, index }: any) => (
    <div className="group relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
      <img
        src={animation}
        alt={title}
        className="w-full h-auto object-contain relative z-10 rounded-2xl"
        style={{ maxHeight: '200px', maxWidth: '100%' }}
      />
    </div>
  )

  return (
    <section
      id="about"
      className={`relative py-12 sm:py-16 md:py-20 overflow-hidden ${
        isDark ? 'bg-slate-900' : 'bg-white'
      }`}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 ${isDark ? 'opacity-10' : 'opacity-20'} animate-pulse`}
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? 'rgba(93, 190, 189, 0.05)' : 'rgba(93, 190, 189, 0.03)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? 'rgba(93, 190, 189, 0.05)' : 'rgba(93, 190, 189, 0.03)'} 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animationDuration: '4s',
            transform: `translateY(${scrollY * 50}px)`,
          }}
        />
      </div>

      {/* Floating Orb */}
      <div
        className="absolute top-1/4 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-float"
        style={{ transform: `translateY(${scrollY * 100}px)` }}
      />
      <div
        className="absolute bottom-1/4 left-0 w-64 h-64 bg-teal-600/10 rounded-full blur-3xl animate-float-delayed"
        style={{ transform: `translateY(${-scrollY * 80}px)` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Floating Animation */}
        <div
          ref={headerReveal.ref}
          className={`text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4 transition-all duration-700 ${
            headerReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transform: `translateY(${Math.sin(scrollY * 3) * 15}px)`,
          }}
        >
          <div
            className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4 animate-glow-pulse ${
              isDark ? 'bg-teal-500/10 text-teal-400' : 'bg-teal-500/10 text-teal-600'
            }`}
          >
            <span className="text-xs sm:text-sm font-semibold">Who We Are</span>
          </div>

          {/* Animated floating text */}
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            style={{
              transform: `translateY(${Math.sin((scrollY + 0.1) * 3) * 10}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            Pioneering the intersection of technology and investment
          </h2>

          <p
            className={`text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            style={{
              transform: `translateY(${Math.sin((scrollY + 0.2) * 3) * 8}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            At MKI, we believe that the most powerful innovations are those that solve real-world problems. Founded on principles of excellence and integrity, we partner with forward-thinking organizations to build the digital infrastructure of tomorrow.
          </p>

          <p
            className={`text-sm sm:text-base md:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            style={{
              transform: `translateY(${Math.sin((scrollY + 0.3) * 3) * 6}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            Our team combines decades of technical expertise with deep market insights to deliver solutions that are not just advanced, but transformative.
          </p>
        </div>

        {/* Feature Cards - Creative Diagonal Layout */}
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            {features.map((feature, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={index}
                  ref={feature.reveal.ref}
                  className={`relative ${
                    feature.reveal.isVisible
                      ? 'opacity-100 translate-x-0'
                      : `opacity-0 ${isEven ? '-translate-x-20' : 'translate-x-20'}`
                  } transition-all duration-1000 ease-out`}
                  style={{
                    transitionDelay: feature.reveal.isVisible ? `${index * 250}ms` : '0s',
                  }}
                >
                  <div className={`relative flex flex-col lg:flex-row ${isEven ? '' : 'lg:flex-row-reverse'} items-center gap-3 sm:gap-4 lg:gap-6 group`}>
                    {/* Animation Side with Decorative Elements */}
                    <div className="relative w-full lg:w-1/2 mb-2 sm:mb-0">
                      {/* Integrated background with animation */}
                      <div className="relative transition-transform duration-500 hover:scale-105">
                        {/* Soft glow background - extends beyond animation */}
                        <div className={`absolute -inset-4 sm:-inset-6 md:-inset-8 rounded-full blur-2xl sm:blur-3xl opacity-20 sm:opacity-25 md:opacity-30 transition-all duration-1000 ${
                          feature.reveal.isVisible ? 'opacity-20 sm:opacity-25 md:opacity-30 scale-100' : 'opacity-0 scale-50'
                        }`}
                        style={{
                          background: 'radial-gradient(circle, rgba(93,190,189,0.4) 0%, rgba(20,184,166,0.2) 50%, transparent 100%)',
                          transitionDelay: feature.reveal.isVisible ? `${index * 250 + 200}ms` : '0s',
                        }} />

                        {/* Corner accent dots - hidden on mobile for cleaner look */}
                        <div className={`hidden sm:block absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 transition-all duration-1000 ${
                          feature.reveal.isVisible ? 'opacity-15 sm:opacity-20 scale-100' : 'opacity-0 scale-50'
                        }`}
                        style={{
                          background: 'radial-gradient(circle, rgba(93,190,189,0.6) 0%, transparent 70%)',
                          transitionDelay: feature.reveal.isVisible ? `${index * 250 + 250}ms` : '0s',
                        }} />
                        <div className={`hidden sm:block absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 transition-all duration-1000 ${
                          feature.reveal.isVisible ? 'opacity-15 sm:opacity-20 scale-100' : 'opacity-0 scale-50'
                        }`}
                        style={{
                          background: 'radial-gradient(circle, rgba(34,211,238,0.6) 0%, transparent 70%)',
                          transitionDelay: feature.reveal.isVisible ? `${index * 250 + 300}ms` : '0s',
                        }} />

                        {/* Main animation - no separate box */}
                        <div className="relative">
                          <AnimationCard animation={feature.animation} title={feature.title} isDark={isDark} index={index} />
                        </div>

                        {/* Subtle bottom shadow for depth */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-teal-500/20 blur-xl rounded-full" />
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pl-4' : 'lg:pr-4'}`}>
                      <div className={`relative transition-all duration-700 ${
                        feature.reveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                      style={{
                        transitionDelay: feature.reveal.isVisible ? `${index * 250 + 500}ms` : '0s',
                      }}>
                        {/* Title with gradient underline */}
                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-black mb-2 sm:mb-3 text-center lg:text-left ${isDark ? 'text-white' : 'text-gray-900'} ${isEven ? '' : 'lg:text-right'}`}>
                          {feature.title}
                        </h3>
                        <div className={`h-0.5 sm:h-1 w-16 sm:w-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mb-3 sm:mb-4 mx-auto lg:mx-0 transition-all duration-700 ${
                          feature.reveal.isVisible ? 'w-16 sm:w-20' : 'w-0'
                        } ${isEven ? '' : 'lg:ml-auto'}`}
                        style={{
                          transitionDelay: feature.reveal.isVisible ? `${index * 250 + 600}ms` : '0s',
                        }} />

                        {/* Description */}
                        <p className={`text-sm sm:text-base leading-relaxed text-center lg:text-left ${isDark ? 'text-gray-300' : 'text-gray-700'} ${isEven ? '' : 'lg:text-right'}`}>
                          {feature.description}
                        </p>

                        {/* Decorative dots */}
                        <div className={`flex gap-2 mt-4 sm:mt-6 justify-center lg:justify-start ${isEven ? '' : 'lg:justify-end'}`}>
                          {[0, 1, 2].map((dot) => (
                            <div
                              key={dot}
                              className={`w-3 h-3 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 transition-all duration-500 ${
                                feature.reveal.isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                              }`}
                              style={{
                                transitionDelay: feature.reveal.isVisible ? `${index * 250 + 700 + dot * 100}ms` : '0s',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connecting line to next item */}
                  {index < features.length - 1 && (
                    <div className={`hidden lg:block absolute left-1/2 -translate-x-1/2 -bottom-6 w-0.5 h-12 bg-gradient-to-b from-teal-500/50 to-transparent transition-all duration-700 ${
                      feature.reveal.isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                    }`}
                    style={{
                      transitionDelay: feature.reveal.isVisible ? `${index * 250 + 800}ms` : '0s',
                    }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
