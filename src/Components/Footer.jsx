import React from 'react';

export default function Footer() {
  return (
    <div>
      <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-stone-50 border-t border-stone-200 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-stone-900 dark:border-stone-700">
        <span className="text-sm text-stone-600 sm:text-center dark:text-stone-300">
          © 2025 <a href="#" className="hover:underline font-medium">El Manase™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-stone-600 dark:text-stone-300 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6 hover:text-stone-800 dark:hover:text-white">About</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6 hover:text-stone-800 dark:hover:text-white">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6 hover:text-stone-800 dark:hover:text-white">Licensing</a>
          </li>
          <li>
            <a href="#" className="hover:underline hover:text-stone-800 dark:hover:text-white">Contact</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}