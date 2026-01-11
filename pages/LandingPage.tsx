import React from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { AnimatedDivider } from '../components/AnimatedDivider'
import { About } from '../components/About'
import { Services } from '../components/Services'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <Header />
      <main>
        <Hero />
        <AnimatedDivider />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
