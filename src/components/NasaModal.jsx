import { Modal } from 'react-bootstrap'

const NasaModal = ({ card, onClose }) => {
  return (
    <Modal show onHide={onClose} centered size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{card.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {card.mediaType === 'video'
          ? <iframe src={card.videoUrl} title={card.title} style={{ width: '100%', height: '400px', border: 'none', marginBottom: '1rem' }} allowFullScreen />
          : <img src={card.image} alt={card.title} style={{ width: '100%', marginBottom: '1rem' }} />
        }
        <p>{card.description}</p>
      </Modal.Body>
    </Modal>
  )
}

export default NasaModal
