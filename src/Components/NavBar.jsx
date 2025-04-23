import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar({ setShowForm }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmissionClick = () => {
    navigate('/submissions');
    setShowForm(true);
    setIsMenuOpen(false);
  };

  const PortfolioLogo = () => (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2"
    >
      <path 
        d="M3 17L9 11L13 15L21 7M3 17H7M3 17V13M21 7V11M21 7H17" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none"
      />
    </svg>
  );

  return (
    <nav className="fixed w-full z-50 top-0 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link 
          to="/" 
          className="flex items-center space-x-2 rtl:space-x-reverse group"
          onClick={() => setIsMenuOpen(false)}
        >
          <PortfolioLogo />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-gray-800 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Portfolio-Tracker
          </span>
        </Link>
        
       
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:focus:ring-gray-600 transition-all" 
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg 
            className="w-5 h-5" 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 17 14"
          >
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        
       
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-6 rtl:space-x-reverse md:mt-0">
            <li>
              <Link 
                to="/" 
                className="block py-2 px-3 text-gray-700 rounded hover:text-blue-600 md:p-0 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <button 
                onClick={handleSubmissionClick}
                className="w-full text-left block py-2 px-3 text-gray-700 rounded hover:text-blue-600 md:p-0 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                Submission
              </button>
            </li>
            <li>
              <Link 
                to="/details" 
                className="block py-2 px-3 text-gray-700 rounded hover:text-blue-600 md:p-0 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Details
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}