import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { LandingPage } from './pages/LandingPage'

export function App() {
  return (
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>
  )
}
