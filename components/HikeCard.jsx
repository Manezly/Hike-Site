import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import '@/assets/styles/hikesPage.css';

const HikeCard = ({ hike }) => {
  return (
    <div className='hike__card'>
        
        <Link 
            href={`/hikes/${hike._id}`}
            className='hike__link'
        />
        <Image
            src={hike.images[0]}
            height={500}
            width={300}
            priority
            className='hike__image'
            alt='destination-image'>
        </Image>
        <h3>{hike.title}</h3>
        <p>{hike.location.area}</p>
        <ul>
            <li className={`difficulty ${hike.difficulty}`}>{hike.difficulty}</li>
            <li>{hike.length}km</li>
        </ul>
    </div>
  )
}

export default HikeCard
