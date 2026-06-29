import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../api/axios'
import PostCard from '../components/PostCard'
import toast from 'react-hot-toast'
import heroGif from '../assets/hero.gif'

const CATEGORIES = ['All', 'Technology', 'Travel', 'Food', 'Health', 'Business', 'Lifestyle', 'Education']

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [activeCategory, setActiveCategory] = useState('All')

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const categorySearch = activeCategory !== 'All' ? activeCategory : search
      const res = await API.get(`/posts/?search=${categorySearch}&page=${page}`)
      setPosts(res.data.results)
      setTotalPages(Math.ceil(res.data.count / 6))
    } catch {
      toast.error('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [search, page, activeCategory])

  return (
    <div>
      {/* Hero Section */}
      <div className="px-4 py-8 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden" style={{background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 40%, #a5d6a7 100%)'}}>
            <div className="flex flex-col md:flex-row items-center px-10 py-12 gap-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                  Welcome to <span className="text-emerald-600">BlogSpace</span>
                </h1>
                <p className="text-emerald-700 font-semibold text-lg mb-2">Read. Write. Share.</p>
                <p className="text-gray-600 mb-6 text-base">Discover stories, ideas and perspectives from writers around the world</p>
                <div className="flex gap-3 flex-wrap mb-8">
                  <Link to="/register" className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition shadow-md">
                    Start Writing ✍️
                  </Link>
                  <a href="#posts" className="bg-white text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition border border-gray-200 shadow-sm">
                    Explore Posts 📖
                  </a>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {[
                    { icon: '📄', count: '127', label: 'POSTS' },
                    { icon: '👥', count: '31', label: 'WRITERS' },
                    { icon: '👁', count: '1.2K', label: 'READERS' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white/70 backdrop-blur rounded-xl px-5 py-3 flex items-center gap-3 border border-white/50">
                      <span className="text-emerald-600 text-xl">{stat.icon}</span>
                      <div>
                        <p className="text-xl font-bold text-gray-800">{stat.count}</p>
                        <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Illustration */}
              {/* Illustration */}
              <div className="animate-float flex-1 flex justify-center">
                <img
                  src={heroGif}
                  alt="Blog illustration"
                  className="w-80 h-72 object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="posts" className="max-w-6xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6 relative">
          <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search posts by title, category or author..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); setActiveCategory('All') }}
            className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base"
          />
          <span className="absolute right-4 top-3.5 text-gray-400">⚙️</span>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(1); setSearch('') }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition border ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:bg-emerald-50 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Latest Articles Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            🚀 Latest Articles
          </h2>
          <Link to="/" className="text-emerald-600 text-sm font-medium hover:underline">
            View all posts →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📝</p>
            <p className="text-gray-500 dark:text-gray-400 text-xl">No posts found</p>
            <Link to="/create" className="mt-4 inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition">
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 disabled:opacity-50 hover:bg-emerald-50 transition"
            >
              ← Prev
            </button>
            <span className="px-4 py-2 text-gray-600 dark:text-gray-300 font-medium">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 disabled:opacity-50 hover:bg-emerald-50 transition"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
