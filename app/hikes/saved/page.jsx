'use client';
import { useState, useEffect } from "react";
import HikeCard from "@/components/HikeCard";
import {toast} from 'react-toastify'

const SavedHikesPage = () => {
    const [hikes, setHikes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedHikes = async () => {
            try {
                const res = await fetch('/api/bookmarks');        

                if (res.status === 200) {
                    const data = await res.json();
                    setHikes(data);
                } else {
                    console.log(res.statusText);
                    toast.error('Failed to fetch saved hikes');
                }
            } catch (error) {
                console.log(error);
                toast.error('Failed to fetch saved hikes');
            } finally {
                setLoading(false);
            }
        }

        fetchSavedHikes();
    }, [])



  return loading ? 'loading...' : (
    <>
        <h1 className="container section">Saved Hikes</h1>
        <section className="container section hikes">
            
        { hikes.length === 0 ? (
            <p>Hikes not found</p>
        ) : (
            hikes.map((hike) => (
            <HikeCard key={hike._id} hike={hike} />
            ))
        )}
        </section>
    </>
  )
}

export default SavedHikesPage