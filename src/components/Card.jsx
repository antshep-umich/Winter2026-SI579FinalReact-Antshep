import { useState } from 'react'

const Card = ({ props, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform: isHovered ? 'scale(1.15)' : 'scale(1)', transition: 'transform 0.2s ease', cursor: 'pointer' }}
      onClick={onClick}
    >
      <div style={{ position: 'relative' }}>
        <img src={props.image} alt={props.title} className="card-image" />
        {props.mediaType === 'video' && (
          <div className="play-overlay">▶</div>
        )}
      </div>
      <h2 className="card-title">{props.title}</h2>
    </div>
  )
}

export default Card
