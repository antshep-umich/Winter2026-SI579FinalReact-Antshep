import { useState } from 'react'
import Card from './components/Card'
import NasaModal from './components/NasaModal'
import './App.css'

function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)

  const getVideoThumbnail = (item) => {
    if (item.thumbnail_url) return item.thumbnail_url
    const match = item.url.match(/embed\/([^?]+)/)
    if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
    return null
  }

  const fetchImages = async (attempt = 1) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://api.nasa.gov/planetary/apod?count=10&api_key=01wuxrezLwzWxzerqY9i5I15y4zPHXRTPL2cq3yw')
      if (!res.ok) throw new Error(`API error ${res.status}`)
      const data = await res.json()
      if (!data.length) throw new Error('No results returned')
      setImages(data)
      setLoading(false)
    } catch {
      if (attempt < 3) {
        setTimeout(() => fetchImages(attempt + 1), 2000)
      } else {
        setError('Failed to load images. Try again.')
        setLoading(false)
      }
    }
  }

  const toCardProps = (item) => ({
    image: item.media_type === 'video' ? getVideoThumbnail(item) : item.url,
    title: item.title,
    description: item.explanation,
    mediaType: item.media_type,
    videoUrl: item.url,
  })

  return (
    <>
      <div className="cards">
        <button onClick={fetchImages} disabled={loading}>
          {loading ? 'Loading...' : 'Get NASA Images'}
        </button>
        {images.map(item => (
          <Card
            key={item.date}
            props={toCardProps(item)}
            onClick={() => setSelected(toCardProps(item))}
          />
        ))}
      </div>
      {error && <p className="error">{error}</p>}
      {selected && <NasaModal card={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

export default App
