import { Twitter, Linkedin, Github } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export function Footer() {
  const { isDark } = useTheme()

  return (
    <footer
      className={`relative border-t ${
        isDark ? 'bg-slate-950 border-white/10' : 'bg-gray-50 border-gray-200'
      }`}
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-10'}`}
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? 'rgba(93, 190, 189, 0.05)' : 'rgba(93, 190, 189, 0.03)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? 'rgba(93, 190, 189, 0.05)' : 'rgba(93, 190, 189, 0.03)'} 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Logo & Description */}
          <div className="col-span-1 sm:col-span-2 text-center sm:text-left">
            <a href="#home" className="inline-flex items-center gap-3 mb-3 sm:mb-4 group">
              <img
                src="/assets/logo/MKI-LOGO.png"
                alt="MKI Logo"
                className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <p className={`max-w-sm mx-auto sm:mx-0 mb-5 sm:mb-6 text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Crafting tomorrow's legacy through strategic investments and technological innovation. Building the future, one solution at a time.
            </p>

            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3 justify-center sm:justify-start">
              <a
                href="#"
                className={`w-9 sm:w-10 h-9 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-teal-400'
                    : 'bg-black/5 hover:bg-black/10 text-gray-600 hover:text-teal-600'
                }`}
                aria-label="Twitter"
              >
                <Twitter className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a
                href="#"
                className={`w-9 sm:w-10 h-9 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-teal-400'
                    : 'bg-black/5 hover:bg-black/10 text-gray-600 hover:text-teal-600'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a
                href="#"
                className={`w-9 sm:w-10 h-9 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-teal-400'
                    : 'bg-black/5 hover:bg-black/10 text-gray-600 hover:text-teal-600'
                }`}
                aria-label="GitHub"
              >
                <Github className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="text-center sm:text-left">
            <h4 className={`font-semibold mb-3 sm:mb-4 text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Company
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="#about"
                  className={`text-sm sm:text-base transition-colors ${
                    isDark ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'
                  }`}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className={`text-sm sm:text-base transition-colors ${
                    isDark ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'
                  }`}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`text-sm sm:text-base transition-colors ${
                    isDark ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'
                  }`}
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`text-sm sm:text-base transition-colors ${
                    isDark ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'
                  }`}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="text-center sm:text-left">
            <h4 className={`font-semibold mb-3 sm:mb-4 text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Legal
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="#"
                  className={`text-sm sm:text-base transition-colors ${
                    isDark ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'
                  }`}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`text-sm sm:text-base transition-colors ${
                    isDark ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'
                  }`}
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`text-sm sm:text-base transition-colors ${
                    isDark ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'
                  }`}
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`pt-6 sm:pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm ${
            isDark ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-teal-500 rounded-full animate-pulse" />
            <span className="text-center">© {new Date().getFullYear()} MKI Technologies. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
            <span className={isDark ? 'text-teal-400/70' : 'text-teal-600'}>[SYSTEM ONLINE]</span>
            <span className="hidden sm:inline">|</span>
            <span>Designed for the future.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
