import React, { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import RecentJob from './components/RecentJob';
import TopCategories from './components/TopCategories';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react';
import gsap from 'gsap';

function App() {
  const shapeRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      })

      gsap.from('.hero-buttons', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
      })

      gsap.to('.floating-shape', {
        y: -20,
        rotation: 360,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })

      gsap.to('.pulse-circle', {
        scale: 1.2,
        opacity: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className='flex flex-col min-h-screen bg-base-100'>
      <Navbar />
      <main className='flex-1'>
        <div ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-base-100 via-base-200 to-base-100 py-20 lg:py-32">
          <div className="absolute inset-0 overflow-hidden">
            <div className="floating-shape absolute top-20 left-10 w-72 h-72 bg-[#14A800]/10 rounded-full blur-3xl"></div>
            <div className="floating-shape absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" style={{animationDelay: '1s'}}></div>
            <div className="pulse-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-4 border-[#14A800]/20 rounded-full"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-[#14A800]/10 text-[#14A800] px-6 py-3 rounded-full mb-6 border border-[#14A800]/20"
              >
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Welcome to the Future of Freelancing</span>
              </motion.div>

              <h1 className="hero-title text-5xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-[#14A800] via-[#0f8000] to-[#14A800] bg-clip-text text-transparent font-display leading-tight">
                Find Your Next Great <br />Opportunity
              </h1>

              <p className="hero-subtitle text-lg lg:text-2xl text-base-content/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                Connect with talented professionals and businesses worldwide. Your dream project is just one click away.
              </p>

              <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="/add-job"
                  className="group btn btn-lg bg-gradient-to-r from-[#14A800] to-[#0f8000] text-white border-none hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Post a Job
                  <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </a>
                <a 
                  href="/all-jobs"
                  className="group btn btn-lg btn-outline border-2 border-[#14A800] text-[#14A800] hover:bg-[#14A800] hover:text-white hover:scale-105 transition-all duration-300"
                >
                  Browse Jobs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="card bg-base-100 shadow-xl border border-base-300 hover:border-[#14A800] transition-all duration-300"
                >
                  <div className="card-body items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#14A800]/10 flex items-center justify-center mb-4">
                      <TrendingUp className="w-8 h-8 text-[#14A800]" />
                    </div>
                    <h3 className="card-title text-2xl font-bold">10,000+</h3>
                    <p className="text-base-content/70">Active Jobs</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -10 }}
                  className="card bg-base-100 shadow-xl border border-base-300 hover:border-[#14A800] transition-all duration-300"
                >
                  <div className="card-body items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8 text-purple-500" />
                    </div>
                    <h3 className="card-title text-2xl font-bold">5,000+</h3>
                    <p className="text-base-content/70">Freelancers</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -10 }}
                  className="card bg-base-100 shadow-xl border border-base-300 hover:border-[#14A800] transition-all duration-300"
                >
                  <div className="card-body items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                      <Zap className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="card-title text-2xl font-bold">98%</h3>
                    <p className="text-base-content/70">Success Rate</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <TopCategories />
        <RecentJob/>
      </main>
      <Footer />
    </div>
  )
}

export default App;
