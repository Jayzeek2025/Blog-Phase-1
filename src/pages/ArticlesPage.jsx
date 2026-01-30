import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { fetchArticleBySlug } from '../api/articles'

export default function ArticlePage() {
  const { slug } = useParams()

  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchArticleBySlug(slug)
      .then(res => {
        setArticle(res.data.article)
      })
      .catch(() => {
        setError('Failed to load article')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [slug])

  if (loading) return <p>Loading article...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!article) return null

  return (
    <div>
      <h1>{article.title}</h1>
      <p>By {article.author.username}</p>
      <ReactMarkdown>{article.body}</ReactMarkdown>
    </div>
  )
}
