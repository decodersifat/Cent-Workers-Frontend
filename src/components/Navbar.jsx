import React, { useState, useEffect } from "react"
import { Menu, X, Briefcase, User, Briefcase as JobIcon, ListTodo, LogOut } from "lucide-react"
import useAuth from "@/hooks/useAuth"
import { ModeToggle } from "@/components/ModeToggle"
import { useNavigate } from "react-router"
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, signOutUser } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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
      setIsDropdownOpen(false)
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
  ]

  return (
    <nav className={`sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/95 backdrop-blur supports-[backdrop-filter]:bg-base-100/60 transition-all duration-300 ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2 group">
              <div className="bg-linear-to-r from-[#14A800] to-[#0f8000] p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-[#14A800] to-[#0f8000] bg-clip-text text-transparent hidden sm:block">
                Cent Workers
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-base-content/80 hover:text-[#14A800] hover:bg-[#14A800]/5 rounded-md transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle with shadcn */}
            <ModeToggle />

            {/* User Menu or Login Button */}
            {user ? (
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                  className="flex items-center gap-2 p-1 hover:bg-base-200 rounded-full transition-colors duration-200"
                >
                  <div className="w-9 h-9 rounded-full ring-2 ring-[#14A800] ring-offset-2 ring-offset-base-100 overflow-hidden">
                    <img 
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=14A800&color=fff`} 
                      alt={user.displayName || 'User'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-lg border border-base-300 bg-base-100 shadow-lg overflow-hidden">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-base-300">
                      <p className="text-sm font-medium text-base-content">{user.displayName || 'User'}</p>
                      <p className="text-xs text-base-content/60 truncate">{user.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <a
                        href={`/profile/${user.uid}`}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-base-content hover:bg-[#14A800]/10 hover:text-[#14A800] transition-colors duration-200"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </a>
                      <a
                        href="/my-added-jobs"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-base-content hover:bg-[#14A800]/10 hover:text-[#14A800] transition-colors duration-200"
                      >
                        <JobIcon className="w-4 h-4" />
                        <span>My Jobs</span>
                      </a>
                      <a
                        href="/my-accepted-tasks"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-base-content hover:bg-[#14A800]/10 hover:text-[#14A800] transition-colors duration-200"
                      >
                        <ListTodo className="w-4 h-4" />
                        <span>My Tasks</span>
                      </a>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-base-300 py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/10 w-full transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-[#14A800] to-[#0f8000] rounded-md hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Login
              </a>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 hover:bg-base-200 rounded-md transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-base-300 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={toggleMenu}
                className="block px-4 py-2.5 text-sm font-medium text-base-content hover:bg-[#14A800]/10 hover:text-[#14A800] rounded-md transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}

            {user ? (
              <>
                <div className="border-t border-base-300 my-2 pt-2">
                  <div className="px-4 py-3 bg-base-200 rounded-md mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full ring-2 ring-[#14A800] overflow-hidden">
                        <img 
                          src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=14A800&color=fff`} 
                          alt={user.displayName || 'User'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-base-content truncate">{user.displayName || 'User'}</p>
                        <p className="text-xs text-base-content/60 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`/profile/${user.uid}`}
                    onClick={toggleMenu}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-base-content hover:bg-[#14A800]/10 hover:text-[#14A800] rounded-md transition-colors duration-200"
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </a>
                  <a
                    href="/my-added-jobs"
                    onClick={toggleMenu}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-base-content hover:bg-[#14A800]/10 hover:text-[#14A800] rounded-md transition-colors duration-200"
                  >
                    <JobIcon className="w-4 h-4" />
                    <span>My Jobs</span>
                  </a>
                  <a
                    href="/my-accepted-tasks"
                    onClick={toggleMenu}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-base-content hover:bg-[#14A800]/10 hover:text-[#14A800] rounded-md transition-colors duration-200"
                  >
                    <ListTodo className="w-4 h-4" />
                    <span>My Tasks</span>
                  </a>
                  <button
                    onClick={() => { handleLogout(); toggleMenu(); }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/10 w-full rounded-md transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-base-300 pt-2 mt-2">
                <a
                  href="/login"
                  onClick={toggleMenu}
                  className="block px-4 py-2.5 text-sm font-medium text-white bg-linear-to-r from-[#14A800] to-[#0f8000] rounded-md text-center hover:shadow-lg transition-all duration-200"
                >
                  Login
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
