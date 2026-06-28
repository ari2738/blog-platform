import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import MDEditor from '@uiw/react-md-editor'

const EditPost = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', category: '', content: '' })
  const [coverImage, setCoverImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}/`)
        if (res.data.author.username !== user.username) {
          toast.error('Not authorized!')
          navigate('/')
          return
        }
        setForm({
          title: res.data.title,
          category: res.data.category,
          content: res.data.content,
        })
      } catch {
        toast.error('Post not found')
        navigate('/')
      } finally {
        setFetching(false)
      }
    }
    fetchPost()
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('category', form.category)
      formData.append('content', form.content)
      if (coverImage) formData.append('cover_image', coverImage)

      await API.patch(`/posts/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      toast.success('Post updated! ✅')
      navigate(`/posts/${id}`)
    } catch {
      toast.error('Failed to update post')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">✏️ Edit Post</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cover Image <span className="text-gray-400">(optional)</span>
            </label>
            {!coverImage ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const file = e.dataTransfer.files[0]
                  if (file && file.type.startsWith('image/')) setCoverImage(file)
                }}
                onClick={() => document.getElementById('fileInputEdit').click()}
                className="w-full border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
              >
                <p className="text-4xl mb-2">🖼️</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Drag & drop image here</p>
                <p className="text-gray-400 text-xs mt-1">or click to browse</p>
                <input
                  id="fileInputEdit"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-slate-600">
                <img
                  src={URL.createObjectURL(coverImage)}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setCoverImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition text-sm font-bold"
                >
                  ✕
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs px-3 py-1">
                  {coverImage.name}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
            <div data-color-mode="light">
              <MDEditor
                value={form.content}
                onChange={(val) => setForm({ ...form, content: val || '' })}
                height={400}
                preview="edit"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {loading ? 'Updating...' : '✅ Update Post'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/posts/${id}`)}
              className="px-6 py-3 rounded-xl border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPost