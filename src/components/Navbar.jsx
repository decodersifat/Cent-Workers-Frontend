import React, { useState, useEffect } from "react"
import { Menu, X, Briefcase, LogOut } from "lucide-react"
import useAuth from "@/hooks/useAuth"
import { useNavigate } from "react-router"
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, signOutUser } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    try {
      await signOutUser()
      toast.success('Logged out successfully!')
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to logout')
    }
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Jobs", href: "/all-jobs" },
    { name: "Add a Job", href: "/add-job" },
    { name: "My Added Jobs", href: "/my-added-jobs" },
    { name: "My Accepted Tasks", href: "/my-accepted-tasks" },
  ]

  return (
    <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-md border-b' : 'border-b border-border/40'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
        
          <div className="shrink-0">
            <a href="/" className="flex items-center gap-2 group">
              <div className="bg-[#14A800] p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl lg:text-2xl font-bold bg-linear-to-r from-[#14A800] to-[#0f8000] bg-clip-text text-transparent font-display tracking-tight">
                Cent Workers
              </span>
            </a>
          </div>

          
          <div className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-foreground/80 hover:text-[#14A800] transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#14A800] transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
            
            {user ? (
              <div className="flex items-center gap-3 ml-2 lg:ml-4">
                <div className="group relative">
                  <img 
                    src={user.photoURL || 'https://via.placeholder.com/40'} 
                    alt={user.displayName || 'User'}
                    className="w-10 h-10 rounded-full border-2 border-[#14A800] cursor-pointer hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap z-50">
                    {user.displayName || user.email}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-5 lg:px-6 py-2 lg:py-2.5 rounded-lg hover:bg-red-600 transition-all duration-200 font-medium text-sm lg:text-base shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="ml-2 lg:ml-4 bg-[#14A800] text-white px-5 lg:px-6 py-2 lg:py-2.5 rounded-lg hover:bg-[#0f8000] transition-all duration-200 font-medium text-sm lg:text-base shadow-sm hover:shadow-md transform hover:scale-105"
              >
                Login/Register
              </a>
            )}
          </div>

        
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-foreground hover:text-[#14A800] focus:outline-none focus:ring-2 focus:ring-[#14A800]/20 rounded-lg p-2 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-2.5 text-base font-medium text-foreground/80 hover:text-[#14A800] hover:bg-accent/50 rounded-lg transition-all duration-200 transform hover:translate-x-1"
                onClick={toggleMenu}
              >
                {link.name}
              </a>
            ))}
            <div className="px-4 pt-2 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                    <img 
                      src={user.photoURL || 'https://via.placeholder.com/40'} 
                      alt={user.displayName || 'User'}
                      className="w-10 h-10 rounded-full border-2 border-[#14A800]"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{user.displayName || 'User'}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout()
                      toggleMenu()
                    }}
                    className="flex items-center justify-center gap-2 w-full bg-red-500 text-white px-6 py-2.5 rounded-lg hover:bg-red-600 transition-all duration-200 font-medium text-center shadow-sm hover:shadow-md"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="block w-full bg-[#14A800] text-white px-6 py-2.5 rounded-lg hover:bg-[#0f8000] transition-all duration-200 font-medium text-center shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                  onClick={toggleMenu}
                >
                  Login/Register
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
