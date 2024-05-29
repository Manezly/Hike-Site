'use client'

const DirectionsButton = ({longitude, latitude}) => {
    const handleClick = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        window.open(url, '_blank')
    };
  return (
    <button
        className="btn"
        onClick={handleClick}
    >Get Directions to Start
    </button>
  )
}

export default DirectionsButton