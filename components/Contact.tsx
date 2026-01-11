import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useState } from 'react'

export function Contact() {
  const { isDark } = useTheme()
  const headerReveal = useScrollReveal({ threshold: 0.2 })
  const leftReveal = useScrollReveal({ threshold: 0.2 })
  const rightReveal = useScrollReveal({ threshold: 0.2 })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@mkinnovations.ae',
      href: 'mailto:info@mkinnovations.ae',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+971 50 330 8043',
      href: 'tel:+971503308043',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Meydan Grandstand, 6th floor\nMeydan Road, Nad Al Sheba\nDubai, U.A.E.',
      gradient: 'from-blue-500 to-teal-500',
    },
  ]

  return (
    <section
      id="contact"
      className={`relative py-24 md:py-32 overflow-hidden ${
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
            animationDuration: '5s',
          }}
        />
      </div>

      {/* Large gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerReveal.ref}
          className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${
            headerReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20">
            <MessageSquare className="w-4 h-4 text-teal-500" />
            <span className={`text-sm font-semibold ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
              Get in Touch
            </span>
          </div>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Let's build the{' '}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
              future together
            </span>
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Ready to transform your business? Contact us to discuss how MKI can help you achieve your technology goals.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Contact Methods */}
          <div
            ref={leftReveal.ref}
            className={`space-y-6 transition-all duration-700 ${
              leftReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            {/* Contact cards */}
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] ${
                  isDark
                    ? 'bg-slate-900 hover:bg-slate-800'
                    : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl'
                }`}
                style={{
                  animation: leftReveal.isVisible ? `fadeInLeft 0.6s ease-out ${index * 0.1}s both` : 'none',
                }}
              >
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                  <div className={`w-full h-full rounded-2xl ${isDark ? 'bg-slate-900' : 'bg-white'}`} />
                </div>

                <div className="relative z-10 flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${method.gradient} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {method.title}
                    </h3>
                    {method.href ? (
                      <a
                        href={method.href}
                        className={`text-sm transition-all duration-300 hover:translate-x-1 inline-block ${
                          isDark ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'
                        }`}
                      >
                        {method.content}
                      </a>
                    ) : (
                      <p className={`text-sm whitespace-pre-line ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {method.content}
                      </p>
                    )}
                  </div>

                  {/* Arrow on hover */}
                  {method.href && (
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                      <ArrowRight className="w-5 h-5 text-teal-500" />
                    </div>
                  )}
                </div>

                {/* Floating particles on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                  <div className={`absolute top-1/4 right-1/4 w-24 h-24 bg-gradient-to-br ${method.gradient} rounded-full blur-2xl opacity-30 group-hover:animate-float`} />
                </div>
              </div>
            ))}

            {/* Additional info card */}
            <div
              className={`relative overflow-hidden rounded-2xl p-8 ${
                isDark
                  ? 'bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20'
                  : 'bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200'
              }`}
            >
              <div className="relative z-10">
                <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Business Hours
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                  Weekend: By appointment only
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div
            ref={rightReveal.ref}
            className={`transition-all duration-700 ${
              rightReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div
              className={`relative overflow-hidden rounded-3xl p-8 ${
                isDark
                  ? 'bg-gradient-to-br from-slate-900 to-slate-800'
                  : 'bg-gradient-to-br from-white to-gray-50 shadow-2xl'
              }`}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 opacity-20">
                <div className={`w-full h-full rounded-3xl ${isDark ? 'bg-slate-900' : 'bg-white'}`} />
              </div>

              <form className="relative z-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
                        focusedField === 'name'
                          ? isDark ? 'text-teal-400' : 'text-teal-600'
                          : isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500 focus:border-teal-500 focus:bg-slate-900'
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:bg-gray-50'
                      }`}
                      placeholder="John Doe"
                    />
                    {focusedField === 'name' && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 opacity-20 blur-xl -z-10" />
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
                        focusedField === 'email'
                          ? isDark ? 'text-teal-400' : 'text-teal-600'
                          : isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500 focus:border-teal-500 focus:bg-slate-900'
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:bg-gray-50'
                      }`}
                      placeholder="john@example.com"
                    />
                    {focusedField === 'email' && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 opacity-20 blur-xl -z-10" />
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="relative">
                  <label
                    htmlFor="subject"
                    className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
                      focusedField === 'subject'
                        ? isDark ? 'text-teal-400' : 'text-teal-600'
                        : isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500 focus:border-teal-500 focus:bg-slate-900'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:bg-gray-50'
                    }`}
                    placeholder="How can we help?"
                  />
                  {focusedField === 'subject' && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 opacity-20 blur-xl -z-10" />
                  )}
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
                      focusedField === 'message'
                        ? isDark ? 'text-teal-400' : 'text-teal-600'
                        : isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none resize-none ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500 focus:border-teal-500 focus:bg-slate-900'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:bg-gray-50'
                    }`}
                    placeholder="Tell us about your project..."
                  />
                  {focusedField === 'message' && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 opacity-20 blur-xl -z-10" />
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group relative w-full px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 hover:shadow-2xl hover:shadow-teal-500/50 transition-all duration-500 overflow-hidden"
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {/* Button content */}
                  <span className="relative flex items-center justify-center gap-2">
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>

                  {/* Pulsing glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl blur-xl opacity-30 group-hover:opacity-60 group-hover:animate-ping" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
