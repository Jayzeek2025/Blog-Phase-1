import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchArticles } from '../api/articles'

export default function ArticlesList() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const LIMIT = 10

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchArticles(page, LIMIT)
      .then(res => {
        setArticles(res.data.articles)
        setTotal(res.data.articlesCount)
      })
      .catch(() => {
        setError('Failed to load articles')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page])

  if (loading) return <p>Loading articles...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div>
      <h1>Articles</h1>

      {articles.map(article => (
  <div
    key={article.slug}
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #eee',
      padding: '10px 0'
    }}
  >
    <div>
      <Link to={`/articles/${article.slug}`}>
        <h3 style={{ margin: 0 }}>{article.title}</h3>
      </Link>
      <p>{article.description}</p>
    </div>

    <button
      disabled
      style={{
        cursor: 'not-allowed',
        border: '1px solid #ccc',
        background: article.favorited ? '#5cb85c' : 'white',
        color: article.favorited ? 'white' : '#555',
        borderRadius: '20px',
        padding: '5px 10px'
      }}
      title="Login required to like"
    >
      ♥ {article.favoritesCount}
    </button>
  </div>
))}

      <div>
        <button
          disabled={page === 1}
          onClick={() => setPage(p => Math.max(p - 1, 1))}
        >
          Prev
        </button>

        <span> Page {page} of {totalPages} </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
