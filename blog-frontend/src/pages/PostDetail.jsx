import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'
import Comment from '../components/Comment'
import toast from 'react-hot-toast'

const PostDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [bookmarked, setBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)

  const fetchPost = async () => {
    try {
      const res = await API.get(`/posts/${id}/`)
      setPost(res.data)
      setLiked(res.data.is_liked)
      setLikeCount(res.data.total_likes)
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
      setBookmarked(bookmarks.includes(res.data.id))
    } catch {
      toast.error('Post not found')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      const res = await API.get(`/posts/${id}/comments/`)
      setComments(res.data.results || res.data)
    } catch {
      toast.error('Failed to load comments')
    }
  }

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [id])

  const handleLike = async () => {
    if (!user) { toast.error('Login to like posts!'); return }
    try {
      const res = await API.post(`/posts/${id}/like/`)
      setLiked(res.data.liked)
      setLikeCount(res.data.total_likes)
    } catch {
      toast.error('Failed to like post')
    }
  }

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    if (bookmarked) {
      const updated = bookmarks.filter(b => b !== post.id)
      localStorage.setItem('bookmarks', JSON.stringify(updated))
      toast.success('Bookmark removed!')
    } else {
      bookmarks.push(post.id)
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
      toast.success('Post bookmarked! 🔖')
    }
    setBookmarked(!bookmarked)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    toast.success('Link copied to clipboard! 🔗')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleComment = async () => {
    if (!commentText.trim()) return
    try {
      await API.post(`/posts/${id}/comments/`, { content: commentText })
      setCommentText('')
      toast.success('Comment posted!')
      fetchComments()
    } catch {
      toast.error('Login to comment!')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return
    try {
      await API.delete(`/posts/${id}/`)
      toast.success('Post deleted!')
      navigate('/')
    } catch {
      toast.error('Failed to delete post')
    }
  }

  const wordCount = post?.content.replace(/<[^>]+>/g, '').split(' ').length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>
  )

  if (!post) return null

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden mb-6">
        {post.cover_image && (
          <img src={post.cover_image} alt={post.title} className="w-full h-64 object-cover" />
        )}

        <div className="p-6 md:p-8">
          {post.category && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
              {post.category}
            </span>
          )}

          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-3 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100 dark:border-slate-700 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
                {post.author.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white text-sm">{post.author.username}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>·</span>
                  <span>⏱ {readingTime} min read</span>
                  <span>·</span>
                  <span>👁 {post.views} views</span>
                </div>
              </div>
            </div>

            {user && user.username === post.author.username && (
              <div className="flex gap-2">
                <Link to={`/edit/${post.id}`} className="text-sm bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-100 transition font-medium">
                  ✏️ Edit
                </Link>
                <button onClick={handleDelete} className="text-sm bg-red-50 dark:bg-red-900/30 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium">
                  🗑 Delete
                </button>
              </div>
            )}
          </div>

          {/* Tags */}
          {post.category && (
            <div className="flex gap-2 mb-6 flex-wrap">
              <span className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full">
                #{post.category.toLowerCase()}
              </span>
              <span className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full">
                #blog
              </span>
            </div>
          )}

          <div
            className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Action Bar */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 flex-wrap">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                liked ? 'bg-red-50 dark:bg-red-900/30 text-red-500' : 'bg-gray-50 dark:bg-slate-700 text-gray-500 hover:bg-red-50 hover:text-red-500'
              }`}
            >
              {liked ? '❤️' : '🤍'} {likeCount} Likes
            </button>

            <button
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                bookmarked ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-500' : 'bg-gray-50 dark:bg-slate-700 text-gray-500 hover:bg-yellow-50 hover:text-yellow-500'
              }`}
            >
              {bookmarked ? '🔖 Saved' : '📌 Save'}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-gray-50 dark:bg-slate-700 text-gray-500 hover:bg-green-50 hover:text-green-500 transition"
            >
              {copied ? '✅ Copied!' : '🔗 Share'}
            </button>

            <span className="text-gray-400 text-sm ml-auto">💬 {comments.length} Comments</span>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Comments ({comments.length})
        </h2>

        {user ? (
          <div className="mb-6">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-sm"
            />
            <button
              onClick={handleComment}
              className="mt-2 bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-emerald-700 transition text-sm"
            >
              Post Comment
            </button>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              <Link to="/login" className="text-emerald-600 font-medium hover:underline">Login</Link> to leave a comment
            </p>
          </div>
        )}

        {comments.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No comments yet. Be the first! 💬</p>
        ) : (
          comments.map(comment => (
            <Comment key={comment.id} comment={comment} postId={id} onRefresh={fetchComments} />
          ))
        )}
      </div>
    </div>
  )
}

export default PostDetail