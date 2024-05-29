'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {toast} from 'react-toastify';
import { FaBookmark } from 'react-icons/fa';
// css in header.css

const BookmarkButton = ({hike}) => {
    const {data:session} = useSession();
    const userId = session?.user?.id;

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const checkBookmarkStatus = async () => {
            try {
                const res = await fetch('/api/bookmarks/check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        hikeId: hike._id
                    })
                });
    
                if (res.status === 200) {
                    const data = await res.json();
                    setIsBookmarked(data.isBookmarked);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        checkBookmarkStatus();
    }, [hike._id, userId]);

    const handleClick = async () => {
        if (!userId) {
            toast.error('You need to sign in to bookmark a property');
            return;
        }

        try {
            const res = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    hikeId: hike._id
                })
            });

            if (res.status === 200) {
                const data = await res.json();
                toast.success(data.message);
                setIsBookmarked(data.isBookmarked);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    if(loading) return <p>Loading...</p>;

  return isBookmarked ? (
    <button 
        onClick={handleClick}
        className='bookmark btn'
        >
        <FaBookmark/> Remove Bookmark
    </button>
  ) : (
    <button 
        className='bookmark btn'
        onClick={handleClick}>
        <FaBookmark/> Add Bookmark
    </button>
  )
}

export default BookmarkButton