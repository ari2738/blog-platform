import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully!')
    navigate('/')
  }

  const isHome = location.pathname === '/'

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-100 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
            BlogSpace
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition py-1 relative ${
              isHome ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500' : ''
            }`}
          >
            Home
          </Link>
          <a 
            href="/#posts" 
            className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition py-1"
          >
            Explore
          </a>
          <a 
            href="/#posts" 
            className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition py-1"
          >
            Categories
          </a>

          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition text-lg border border-slate-100 dark:border-slate-600"
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/create" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-medium text-sm shadow-sm shadow-emerald-600/10">
                + New Post
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">{user.username}</span>
                <Link to="/profile" className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-200/50 shadow-sm overflow-hidden">
                  {user.profile_picture ? (
                    <img src={user.profile_picture} alt={user.username} className="w-full h-full object-cover" />
                  ) : (
                    user.username.charAt(0).toUpperCase()
                  )}
                </Link>
              </div>
              <button onClick={handleLogout} className="text-emerald-600 hover:text-emerald-700 font-medium transition text-sm">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 font-medium transition text-sm">
                Login
              </Link>
              <Link to="/register" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-medium text-sm shadow-sm">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-lg border border-slate-100 dark:border-slate-600"
          >
            {dark ? '☀️' : '🌙'}
          </button>
          <button className="text-gray-600 dark:text-gray-300 p-1" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800 px-4 pb-4 flex flex-col gap-3 border-t border-gray-100 dark:border-slate-700 animate-fadeIn">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-300 font-medium pt-2">Home</Link>
          <a href="/#posts" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-300 font-medium">Explore</a>
          <a href="/#posts" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-300 font-medium">Categories</a>
          {user ? (
            <>
              <Link to="/create" onClick={() => setMenuOpen(false)} className="text-emerald-600 font-medium">+ New Post</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-300 font-medium flex items-center gap-2">
                <span>Profile ({user.username})</span>
              </Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-red-500 text-left font-medium">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-300 font-medium">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="text-emerald-600 font-medium">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar