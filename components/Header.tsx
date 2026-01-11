import { useEffect, useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { toggleTheme, isDark } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? isDark
            ? 'bg-slate-900/70 backdrop-blur-2xl border-b border-white/5'
            : 'bg-white/70 backdrop-blur-2xl border-b border-black/5 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center group transition-transform duration-300 hover:scale-105">
            <img
              src="/assets/logo/MKI-LOGO.png"
              alt="MKI Logo"
              className="h-12 lg:h-16 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm lg:text-base font-medium rounded-lg transition-all duration-300 group ${
                  isDark
                    ? 'text-gray-300 hover:text-white hover:bg-white/5'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-black/5'
                }`}
              >
                {link.name}
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 group-hover:w-1/2 transition-all duration-300" />
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`ml-4 p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-amber-400'
                  : 'bg-black/5 hover:bg-black/10 text-slate-700'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </nav>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-amber-400'
                  : 'bg-black/5 hover:bg-black/10 text-slate-700'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-white'
                  : 'bg-black/5 hover:bg-black/10 text-gray-900'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`px-4 pb-6 pt-2 space-y-1 border-t ${
          isDark
            ? 'bg-slate-900/95 backdrop-blur-2xl border-white/5'
            : 'bg-white/95 backdrop-blur-2xl border-black/5'
        }`}>
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-gray-300 hover:text-white hover:bg-white/5'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-black/5'
              }`}
              style={{
                animation: isMobileMenuOpen ? `slideDown 0.3s ease-out ${index * 0.05}s both` : 'none'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </header>
  )
}
