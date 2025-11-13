import React from 'react'
import Navbar from './components/Navbar'
import RecentJob from './components/RecentJob';
import TopCategories from './components/TopCategories';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import useTheme from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-1'>
        <div className="container mx-auto p-8 relative">
          <button
            onClick={toggleTheme}
            className="absolute top-4 right-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-700" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='text-4xl lg:text-5xl font-bold text-[#14A800] mb-4 font-display'
            >
              Welcome to Cent Workers
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 text-lg text-muted-foreground max-w-2xl"
            >
              Your professional freelance marketplace built with modern technology and beautiful design.
              Connect with talented professionals and grow your business today.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 flex gap-4"
            >
              <a 
                href="/add-job"
                className="bg-[#14A800] hover:bg-[#0f8000] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Create a Job
              </a>
              <a 
                href="/all-jobs"
                className="bg-white hover:bg-gray-50 text-[#14A800] border-2 border-[#14A800] px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Browse Jobs
              </a>
            </motion.div>
          </motion.div>
        </div>
        <TopCategories />
        <RecentJob/>
      </main>
      <Footer />
    </div>
  )
}

export default App;
