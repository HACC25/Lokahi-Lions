import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './input.css'

import StudyAdvisorLanding from './pages/page-landing.tsx'
import UHPathfinderAI from './pages/page-uhresults.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudyAdvisorLanding />} />
        <Route path="/pathway" element={<UHPathfinderAI />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
