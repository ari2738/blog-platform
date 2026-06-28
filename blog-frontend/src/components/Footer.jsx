import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#f4fbf8] dark:bg-slate-900 border-t border-emerald-100/50 dark:border-slate-800/80 mt-16 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 group">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span className="text-xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                BlogSpace
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-xs md:text-sm leading-relaxed">
              A platform for writers and readers to connect, share and grow together.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 hover:scale-105 transition text-xs shadow-sm">
                f
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 hover:scale-105 transition text-xs shadow-sm font-semibold">
                𝕏
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 hover:scale-105 transition text-xs shadow-sm">
                ig
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 hover:scale-105 transition text-xs shadow-sm font-semibold">
                in
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-xs md:text-sm">
              <li><Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">Home</Link></li>
              <li><a href="/#posts" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">Explore</a></li>
              <li><a href="/#posts" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">Categories</a></li>
              <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">About Us</a></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-4">Resources</h3>
            <ul className="space-y-2.5 text-xs md:text-sm">
              <li><Link to="/create" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">Write a Blog</Link></li>
              <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">Help Center</a></li>
              <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">Guidelines</a></li>
              <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-4">Legal</h3>
            <ul className="space-y-2.5 text-xs md:text-sm">
              <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">Terms of Service</a></li>
              <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-4">Newsletter</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed mb-3">
              Stay updated with our latest stories and announcements.
            </p>
            <div className="flex shadow-sm rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-emerald-500 max-w-[280px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-xs focus:outline-none bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 transition flex-shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-emerald-100/50 dark:border-slate-800/80 pt-6 text-center">
          <p className="text-slate-400 dark:text-slate-500 text-xs md:text-sm">
            © 2026 <span className="font-medium">BlogSpace</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer