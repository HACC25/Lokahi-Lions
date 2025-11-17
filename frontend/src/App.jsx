import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import LoginForm from './pages/login';
import SignIn from './pages/page-signin';
import ResultsPathway from './pages/results';
// ... other imports

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signin" element={<SignIn />} />
          
          {/* Protected route */}
          <Route 
            path="/pathway" 
            element={
              <ProtectedRoute>
                <ResultsPathway />
              </ProtectedRoute>
            } 
          />
          
          {/* Other routes */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;