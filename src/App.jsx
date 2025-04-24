import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './pages/Home';
import Details from './pages/Details';
import Submission from './pages/Submission';
import { Toaster } from 'react-hot-toast';

function App() {
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch("https://portfolio-tracker-ll7p.onrender.com/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to submit");
      setTriggerRefresh(prev => !prev); 
    } catch (error) {
      throw error;
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Toaster position="top-center" reverseOrder={false} />
        <NavBar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submissions" element={<Submission onSubmit={handleFormSubmit} />} />
            <Route path="/details" element={<Details refresh={triggerRefresh} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
