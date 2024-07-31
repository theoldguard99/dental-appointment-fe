import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/RegisterPage'; 
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AuthProvider from './context/AuthContext';

const App = () => {
  const location = useLocation();
  const hideHeaderAndFooter = location.pathname === '/register';

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {!hideHeaderAndFooter && <Header />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<RegisterPage />} />  
          </Routes>
        </main>
        {!hideHeaderAndFooter && <Footer />}
      </div>
    </AuthProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
