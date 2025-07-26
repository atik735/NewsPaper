import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const UpdateArticle = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:5000/articles/${id}`)
      .then(res => setArticle(res.data))
      .catch(err => console.error('Failed to fetch article'))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const updatedArticle = {
      title: form.title.value,
      content: form.content.value,
      tags: form.tags.value.split(',').map(tag => tag.trim())
    }

    try {
      const res = await axios.patch(`http://localhost:5000/articles/${id}`, updatedArticle)
      if (res.data.modifiedCount > 0) {
        Swal.fire('Updated!', 'Article has been updated.', 'success')
        navigate('/dashboard/my-articles')
      }
    } catch (err) {
      Swal.fire('Error!', 'Failed to update article.', 'error')
    }
  }

  if (!article) return <p>Loading...</p>

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Update Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input defaultValue={article.title} name="title" className="w-full p-2 border rounded" placeholder="Title" />
        <textarea defaultValue={article.content} name="content" className="w-full p-2 border rounded" placeholder="Content" rows="5" />
        <input defaultValue={article.tags?.join(', ')} name="tags" className="w-full p-2 border rounded" placeholder="Tags (comma separated)" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  )
}

export default UpdateArticle
