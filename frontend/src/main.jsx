import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './input.css'

import StudyAdvisorLanding from '../page-landing.tsx'
import UHPathfinderAI from '../page-uhresults.tsx'
import ProfilePage from '../page-profile.tsx'
import SignIn from '../page-signin.tsx'
import SignUp from '../page-signup.tsx'
import SignOutModal from '../page-signout.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudyAdvisorLanding />} />
        <Route path="/uh" element={<UHPathfinderAI />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/my-profile" element={<ProfilePage />} />
        <Route path="/signout" element={<SignOutModal />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
