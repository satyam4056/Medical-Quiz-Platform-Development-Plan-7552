import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import CreateQuizPage from './pages/CreateQuizPage';
import QuizPage from './pages/QuizPage';
import AuthPage from './pages/AuthPage';
import PricingPage from './pages/PricingPage';
import { useAuthStore } from './store/authStore';

function App() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <motion.main 
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          {user && (
            <>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/create-quiz" element={<CreateQuizPage />} />
              <Route path="/quiz/:id" element={<QuizPage />} />
            </>
          )}
        </Routes>
      </motion.main>
      <Footer />
    </div>
  );
}

export default App;