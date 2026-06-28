import { Link } from 'react-router-dom'
import { useState } from 'react'

const PostCard = ({ post }) => {
  const [bookmarked, setBookmarked] = useState(
    JSON.parse(localStorage.getItem('bookmarks') || '[]').includes(post.id)
  )

  const toggleBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation() // Prevent navigating to post detail when clicking bookmark
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    if (bookmarked) {
      const updated = bookmarks.filter(id => id !== post.id)
      localStorage.setItem('bookmarks', JSON.stringify(updated))
    } else {
      bookmarks.push(post.id)
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    setBookmarked(!bookmarked)
  }

  // Get dynamic category badge colors matching mockup
  const getCategoryColor = (cat) => {
    const category = String(cat).toLowerCase();
    if (category === 'technology') return 'bg-emerald-600/90 text-white';
    if (category === 'travel') return 'bg-teal-600/90 text-white';
    if (category === 'lifestyle') return 'bg-emerald-600/90 text-white';
    if (category === 'food') return 'bg-amber-600/90 text-white';
    if (category === 'health') return 'bg-rose-600/90 text-white';
    if (category === 'business') return 'bg-cyan-600/90 text-white';
    if (category === 'education') return 'bg-indigo-600/90 text-white';
    return 'bg-emerald-600/90 text-white';
  }

  return (
    <Link to={`/posts/${post.id}`} className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      <div className="overflow-hidden relative h-48 md:h-52">
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-950 dark:to-teal-900 flex items-center justify-center">
            <span className="text-5xl select-none">📝</span>
          </div>
        )}
        
        {post.category && (
          <span className={`absolute top-4 left-4 text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm z-10 ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
        )}

        <button
          onClick={toggleBookmark}
          className="absolute top-4 right-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full w-8 h-8 flex items-center justify-center shadow-sm hover:scale-110 transition border border-white/20 z-10 text-xs"
          title={bookmarked ? 'Remove bookmark' : 'Bookmark post'}
        >
          {bookmarked ? '🔖' : '📌'}
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {post.title}
        </h2>

        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed">
          {post.content.replace(/<[^>]+>/g, '').substring(0, 150)}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50 dark:border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shadow-sm">
              {post.author.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex items-baseline">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{post.author.username}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-2 font-medium">
                {new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[11px] font-semibold">
            <span className="flex items-center gap-1">❤️ {post.total_likes}</span>
            <span className="flex items-center gap-1">💬 {post.total_comments}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard