import Link from 'next/link';
import React from 'react'
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

const HomeHikeCards = async () => {
    try {
        const data = await fetchHikes();

        if (!data || !data.hikes) {
            throw new Error('Failed to fetch hikes');
        }

        const randomHikes = data.hikes
            .sort(() => Math.random() - Math.random())
            .slice(0, 3);

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
    } catch (error) {
        console.error('Error fetching hikes:', error);
        return (
            <section className="container section home-featured">
                <h1>Featured Hikes</h1>
                <div className="home-featured__container">
                    <p>Failed to load hikes.</p>
                </div>
            </section>
        );
    }
};

export default HomeHikeCards