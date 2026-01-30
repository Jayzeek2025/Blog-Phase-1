import { Routes, Route, Navigate } from 'react-router-dom'
import ArticlesList from './pages/ArticlesList'
import ArticlePage from './pages/ArticlesPage'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/articles" />} />
      <Route path="/articles" element={<ArticlesList />} />
      <Route path="/articles/:slug" element={<ArticlePage />} />
    </Routes>
  )
}
