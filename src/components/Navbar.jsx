import React, { useState, useEffect } from "react"
import { Menu, X, Briefcase, LogOut, Moon, Sun } from "lucide-react"
import useAuth from "@/hooks/useAuth"
import useTheme from "@/hooks/useTheme"
import { useNavigate } from "react-router"
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, signOutUser } = useAuth()
  const { theme, toggleTheme } = useTheme()
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
    <nav className={`navbar bg-base-100 sticky top-0 z-50 shadow-lg backdrop-blur-md bg-opacity-90 transition-all duration-300 ${
      isScrolled ? 'shadow-xl' : ''
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between w-full h-16 lg:h-18">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-r from-[#14A800] to-[#0f8000] p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#14A800] to-[#0f8000] bg-clip-text text-transparent font-display tracking-tight hidden sm:block">
                Cent Workers
              </span>
            </a>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="btn btn-ghost btn-sm text-base-content hover:bg-[#14A800] hover:text-white transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle swap swap-rotate"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {user ? (
              <div className="hidden lg:flex items-center gap-3">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full ring ring-[#14A800] ring-offset-base-100 ring-offset-2">
                      <img 
                        src={user.photoURL || 'https://via.placeholder.com/40'} 
                        alt={user.displayName || 'User'}
                      />
                    </div>
                  </div>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52">
                    <li className="menu-title">
                      <span>{user.displayName || 'User'}</span>
                      <span className="text-xs opacity-60">{user.email}</span>
                    </li>
                    <li><a href={`/profile/${user.uid}`}>My Profile</a></li>
                    <li><a href="/my-added-jobs">My Jobs</a></li>
                    <li><a href="/my-accepted-tasks">My Tasks</a></li>
                    <li>
                      <button onClick={handleLogout} className="text-error">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <a
                href="/login"
                className="hidden lg:flex btn btn-sm bg-gradient-to-r from-[#14A800] to-[#0f8000] text-white border-none hover:shadow-lg transition-all duration-200"
              >
                Login/Register
              </a>
            )}

            <button
              onClick={toggleMenu}
              className="lg:hidden btn btn-ghost btn-circle"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4">
            <ul className="menu bg-base-100 rounded-box">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} onClick={toggleMenu}>
                    {link.name}
                  </a>
                </li>
              ))}
              {user ? (
                <>
                  <li className="menu-title">
                    <div className="flex items-center gap-3 p-3">
                      <img 
                        src={user.photoURL || 'https://via.placeholder.com/40'} 
                        alt={user.displayName || 'User'}
                        className="w-10 h-10 rounded-full ring ring-[#14A800] ring-offset-2"
                      />
                      <div>
                        <p className="font-medium">{user.displayName || 'User'}</p>
                        <p className="text-xs opacity-60">{user.email}</p>
                      </div>
                    </div>
                  </li>
                  <li><a href={`/profile/${user.uid}`} onClick={toggleMenu}>My Profile</a></li>
                  <li>
                    <button onClick={() => { handleLogout(); toggleMenu(); }} className="text-error">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <a href="/login" onClick={toggleMenu} className="btn btn-primary">
                    Login/Register
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
