import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'
import toast from 'react-hot-toast'

const Comment = ({ comment, postId, onRefresh }) => {
  const { user } = useAuth()
  const [replyOpen, setReplyOpen] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReply = async () => {
    if (!replyText.trim()) return
    setLoading(true)
    try {
      await API.post(`/posts/${postId}/comments/`, {
        content: replyText,
        parent: comment.id,
      })
      setReplyText('')
      setReplyOpen(false)
      toast.success('Reply posted!')
      onRefresh()
    } catch {
      toast.error('Failed to post reply')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/comments/${id}/`)
      toast.success('Comment deleted!')
      onRefresh()
    } catch {
      toast.error('Failed to delete comment')
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 mb-3">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm flex-shrink-0">
          {comment.author.username.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-gray-800 dark:text-white text-sm">{comment.author.username}</span>
            <span className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{comment.content}</p>

          <div className="flex items-center gap-3">
            {user && (
              <button
                onClick={() => setReplyOpen(!replyOpen)}
                className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium"
              >
                ↩ Reply
              </button>
            )}
            {user && user.username === comment.author.username && (
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-xs text-red-400 hover:text-red-500 font-medium"
              >
                🗑 Delete
              </button>
            )}
          </div>

          {replyOpen && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={handleReply}
                disabled={loading}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {loading ? '...' : 'Post'}
              </button>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 pl-4 border-l-2 border-emerald-200 dark:border-emerald-800">
              {comment.replies.map(reply => (
                <div key={reply.id} className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 text-xs font-bold">
                        {reply.author.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-white text-xs">{reply.author.username}</span>
                    </div>
                    {user && user.username === reply.author.username && (
                      <button
                        onClick={() => handleDelete(reply.id)}
                        className="text-xs text-red-400 hover:text-red-500"
                      >
                        🗑
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-xs ml-8">{reply.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment