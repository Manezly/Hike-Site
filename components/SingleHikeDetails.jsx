import React from 'react'
import DirectionsButton from './DirectionsButton'

const SingleHikeDetails = ({hike}) => {
  return (
    <section className="container details section">
        <DirectionsButton latitude={hike.location.latitude} longitude={hike.location.longitude} />
        <div className="details__title">
            <h1>{hike.title}</h1>
            <p>{hike.difficulty}</p>
            <h5>{hike.location.area}</h5>
        </div>
        <ul>
            <li>
                <span>Length</span>
                <span>{hike.length}km</span>
            </li>
            <li>
                <span>Elevation Gain</span>
                <span>{hike['elevation_gain']}m</span>
            </li>
            <li>
                <span>Route Type</span>
                <span>{hike['trail_type']}</span>
            </li>
        </ul>
        <p>The average duraction of this hike is <strong>{hike['average_time']}</strong>.</p>
        <p>{hike.summary}</p>
        <div className="tags">
            {hike.type.map((type, i) => {
                return <span key={i}>{type}</span>
            })}
        </div>
        <div className="details__description">
            <h3>Description</h3>
            <p>{hike['text_body']}</p>
        </div>
    </section>
  )
}

export default SingleHikeDetails