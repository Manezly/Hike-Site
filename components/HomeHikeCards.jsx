'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import '@/assets/styles/homehikecard.css';
import HikeCard from './HikeCard';
import { fetchHikes } from '@/utils/request';

// const HomeHikeCards = async () => {
//     const data = await fetchHikes();
//     console.log(data.hikes);

//     const randomHikes = data.hikes.sort(() => Math.random() - Math.random()).slice(0,3);
//   return (
//     <>
//         <section className="container section home-featured">
//             <h1>Featured Hikes</h1>
//             <div className="home-featured__container">
//                 {randomHikes.length === 0 ? (
//                     <p>No Hikes</p>
//                 ) : randomHikes.map((hike) => (
//                     <HikeCard key={hike._id} hike={hike} />
//                 ))}
//             </div>
//         </section>

//         <section className='container section see-all'>
//             <Link
//                 href='/hikes'
//                 className='btn'
//             >View All Hikes</Link>
//         </section>
//     </>
//   )
// }

const HomeHikeCards = () => {
    const [randomHikes, setRandomHikes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getHikes = async () => {
            const data = await fetchHikes();
            const hikes = data.hikes || [];
            const randomSelection = hikes
                .sort(() => Math.random() - Math.random())
                .slice(0, 3);
            setRandomHikes(randomSelection);
            setLoading(false);
        };
        getHikes();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <section className="container section home-featured">
                <h1>Featured Hikes</h1>
                <div className="home-featured__container">
                    {randomHikes.length === 0 ? (
                        <p>No Hikes</p>
                    ) : (
                        randomHikes.map((hike) => (
                            <HikeCard key={hike._id} hike={hike} />
                        ))
                    )}
                </div>
            </section>

            <section className='container section see-all'>
                <Link href='/hikes' className='btn'>
                    View All Hikes
                </Link>
            </section>
        </>
    );
}

export default HomeHikeCards