import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './input.css'

import StudyAdvisorLanding from '../page-landing.tsx'
import UHPathfinderAI from '../page-uhresults.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudyAdvisorLanding />} />
        <Route path="/uh" element={<UHPathfinderAI />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
