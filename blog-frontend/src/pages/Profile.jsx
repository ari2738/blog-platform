import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'
import PostCard from '../components/PostCard'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ totalPosts: 0, totalLikes: 0, totalComments: 0 })

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchUserPosts()
  }, [user])

  const fetchUserPosts = async () => {
    try {
      const res = await API.get(`/users/${user.id}/posts/`)
      const userPosts = res.data.results || res.data
      setPosts(userPosts)
      const totalLikes = userPosts.reduce((sum, p) => sum + p.total_likes, 0)
      const totalComments = userPosts.reduce((sum, p) => sum + p.total_comments, 0)
      setStats({ totalPosts: userPosts.length, totalLikes, totalComments })
    } catch {
      toast.error('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out!')
    navigate('/')
  }

  if (!user) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-4xl font-bold flex-shrink-0">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{user.username}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
            {user.bio && (
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{user.bio}</p>
            )}

            <div className="flex justify-center md:justify-start gap-6 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.totalPosts}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-500">{stats.totalLikes}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Likes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">{stats.totalComments}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Comments</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              to="/create"
              className="bg-emerald-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-emerald-700 transition text-sm"
            >
              + New Post
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-50 dark:bg-red-900/30 text-red-500 px-5 py-2 rounded-xl font-medium hover:bg-red-100 transition text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">My Posts</h2>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
          <p className="text-5xl mb-4">📝</p>
          <p className="text-gray-500 dark:text-gray-400 text-xl mb-4">No posts yet</p>
          <Link to="/create" className="bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition font-medium">
            Write Your First Post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile