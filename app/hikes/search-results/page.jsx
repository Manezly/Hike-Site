'use client'
import {useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import HikeCard from '@/components/HikeCard';
import HikeSearchForm from '@/components/HikeSearchForm';
import '@/assets/styles/searchResultsPage.css'

const SearchResultsPage = () => {
    const searchParams = useSearchParams();

    const [hikes, setHikes] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = searchParams.get('location');
    const difficulty = searchParams.get('difficulty');

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const res = await fetch(`/api/hikes/search?location=${location}&difficulty=${difficulty}`);

                if (res.status === 200) {
                    const data = await res.json();
                    setHikes(data);
                } else {
                    setHikes([]);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchSearchResults();
    }, [location, difficulty]);

  return (<>
    {loading ? 'Loading...' : (
    <>
        
        <section className="container section results">
        <Link
            className='btn'
            href={'/hikes'}>
            Back to hikes
        </Link>
        <HikeSearchForm />
        
            <h1>Search Results</h1>
            <div className='hikes'>

            { hikes.length === 0 ? (
                <p>No search results found</p>
            ) : (
                hikes.map((hike) => (
                <HikeCard key={hike._id} hike={hike} />
                ))
            )}
            </div>
        </section>
    </>
  )}
  </>);
}

export default SearchResultsPage
