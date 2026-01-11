import { Code, Cloud, TrendingUp, Globe, Shield, Cpu, ArrowRight, Sparkles } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useState } from 'react'

export function Services() {
  const { isDark } = useTheme()
  const headerReveal = useScrollReveal({ threshold: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)

  const services = [
    {
      icon: Code,
      title: 'Custom Software Development',
      description:
        'Tailored enterprise solutions built with scalable architecture and modern frameworks.',
      features: ['Scalable Architecture', 'Modern Frameworks', 'Enterprise Grade', 'Cloud Native'],
      gradient: 'from-teal-500 to-emerald-500',
      image: '/services/custom-software.svg',
    },
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description:
        'Secure, scalable cloud migration and management services for optimal performance.',
      features: ['Cloud Migration', 'Infrastructure as Code', 'Auto Scaling', '24/7 Monitoring'],
      gradient: 'from-teal-500 to-cyan-500',
      image: '/services/cloud-infrastructure.svg',
    },
    {
      icon: TrendingUp,
      title: 'Digital Transformation',
      description:
        'Strategic consulting to modernize legacy systems and digitize business processes.',
      features: ['Process Automation', 'Legacy Modernization', 'Digital Strategy', 'Change Management'],
      gradient: 'from-teal-500 to-blue-500',
      image: '/services/digital-transformation.svg',
    },
    {
      icon: Globe,
      title: 'Web & Mobile Solutions',
      description:
        'Responsive, high-performance applications that deliver exceptional user experiences.',
      features: ['Progressive Web Apps', 'Native Mobile', 'Cross-Platform', 'Responsive Design'],
      gradient: 'from-emerald-500 to-teal-500',
      image: '/services/web-mobile.svg',
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description:
        'Robust security protocols and audits to protect your digital assets and data.',
      features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Threat Detection'],
      gradient: 'from-cyan-500 to-teal-500',
      image: '/services/cybersecurity.svg',
    },
    {
      icon: Cpu,
      title: 'Emerging Tech',
      description:
        'Implementation of AI, IoT, and blockchain solutions for competitive advantage.',
      features: ['Artificial Intelligence', 'IoT Solutions', 'Blockchain', 'Machine Learning'],
      gradient: 'from-blue-500 to-teal-500',
      image: '/services/emerging-tech.svg',
    },
  ]

  return (
    <section
      id="services"
      className={`relative py-16 md:py-24 overflow-hidden ${
        isDark ? 'bg-slate-950' : 'bg-gray-50'
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
            animationDuration: '6s',
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerReveal.ref}
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
            headerReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20">
            <Sparkles className="w-4 h-4 text-teal-500" />
            <span className={`text-xs font-semibold ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
              Our Expertise
            </span>
          </div>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Comprehensive{' '}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
              technology solutions
            </span>
          </h2>
          <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            We deliver end-to-end technical capabilities to help your business thrive in the digital age.
          </p>
        </div>

        {/* Interactive Service List - Timeline Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Left Side - Service Navigation */}
          <div className="lg:col-span-4 space-y-2">
            {services.map((service, index) => {
              const Icon = service.icon
              const isActive = activeIndex === index
              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group relative cursor-pointer transition-all duration-500 ${
                    isActive ? 'scale-105' : 'hover:scale-102'
                  }`}
                >
                  {/* Timeline line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full transition-all duration-500 ${
                    isActive
                      ? `bg-gradient-to-b ${service.gradient}`
                      : isDark ? 'bg-slate-800' : 'bg-gray-300'
                  }`} />

                  {/* Content */}
                  <div className={`pl-6 py-4 pr-4 rounded-r-2xl transition-all duration-500 ${
                    isActive
                      ? isDark
                        ? 'bg-gradient-to-r from-teal-500/10 to-transparent'
                        : 'bg-gradient-to-r from-teal-500/5 to-transparent'
                      : ''
                  }`}>
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      <div className={`relative flex-shrink-0 p-2.5 rounded-lg transition-all duration-500 ${
                        isActive
                          ? `bg-gradient-to-br ${service.gradient} shadow-lg scale-110`
                          : isDark
                            ? 'bg-slate-800'
                            : 'bg-gray-200'
                      }`}>
                        <Icon className={`w-5 h-5 transition-colors duration-500 ${
                          isActive ? 'text-white' : isDark ? 'text-gray-400' : 'text-gray-600'
                        }`} />

                        {/* Pulsing ring when active */}
                        {isActive && (
                          <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${service.gradient} opacity-30 blur-xl animate-ping`} />
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <h3 className={`text-base font-bold transition-colors duration-300 ${
                          isActive
                            ? `bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`
                            : isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {service.title}
                        </h3>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className={`w-4 h-4 transition-all duration-500 ${
                        isActive
                          ? 'opacity-100 translate-x-0 text-teal-500'
                          : 'opacity-0 -translate-x-4'
                      }`} />
                    </div>
                  </div>

                  {/* Number indicator */}
                  <div className={`absolute -left-1.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500 flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? `border-teal-500 bg-teal-500 text-white`
                      : isDark
                        ? 'border-slate-700 bg-slate-900 text-gray-500'
                        : 'border-gray-300 bg-white text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Side - Active Service Details */}
          <div className="lg:col-span-8">
            <div
              key={activeIndex}
              className={`relative rounded-2xl overflow-hidden transition-all duration-700 ${
                isDark ? 'bg-slate-900' : 'bg-white'
              } shadow-xl`}
            >
              {/* Top gradient bar */}
              <div className={`h-1.5 bg-gradient-to-r ${services[activeIndex].gradient}`} />

              <div className="relative p-6 md:p-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${services[activeIndex].gradient} flex items-center justify-center shadow-lg`}>
                      {(() => {
                        const Icon = services[activeIndex].icon
                        return <Icon className="w-8 h-8 text-white" />
                      })()}
                    </div>
                    <div>
                      <h3 className={`text-2xl md:text-3xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {services[activeIndex].title}
                      </h3>
                      <p className={`text-xs mt-1 uppercase tracking-wider font-medium ${
                        isDark ? 'text-teal-400' : 'text-teal-600'
                      }`}>
                        Service #{activeIndex + 1} of 6
                      </p>
                    </div>
                  </div>

                  {/* Progress dots */}
                  <div className="flex gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === activeIndex
                            ? `w-12 bg-gradient-to-r ${services[activeIndex].gradient}`
                            : `w-2 ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Left: Animation */}
                  <div className="relative order-2 md:order-1 flex items-center justify-center min-h-[300px] md:min-h-[350px]">
                    {/* Floating animation container */}
                    <div className="relative w-full">
                      <div className={`absolute -inset-6 bg-gradient-to-br ${services[activeIndex].gradient} opacity-5 blur-3xl rounded-full`} />
                      <img
                        src={services[activeIndex].image}
                        alt={services[activeIndex].title}
                        className="relative w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
                        style={{ minHeight: '300px', maxHeight: '350px', objectFit: 'contain' }}
                      />
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="order-1 md:order-2 space-y-6">
                    {/* Description */}
                    <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {services[activeIndex].description}
                    </p>

                    {/* Features */}
                    <div>
                      <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Key Capabilities
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {services[activeIndex].features.map((feature, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                              isDark ? 'bg-slate-800/40 hover:bg-slate-800/70' : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                            style={{
                              animation: 'fadeInUp 0.5s ease-out forwards',
                              animationDelay: `${idx * 0.1}s`,
                              opacity: 0
                            }}
                          >
                            <div className={`flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br ${services[activeIndex].gradient} flex items-center justify-center`}>
                              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
