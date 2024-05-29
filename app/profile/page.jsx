'use client';
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import '@/assets/styles/profile.css';
import { useState, useEffect } from "react";
import {toast} from 'react-toastify'

const ProfilePage = () => {
    const {data:session} = useSession();
    const profileImage = session?.user?.image;
    const profileName = session?.user?.name;
    const profileEmail = session?.user?.email;

    const [hikes, setHikes] = useState([]);
    const [loadingHikes, setLoadingHikes] = useState(true);

    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);

    useEffect(() => {
        const fetchUserHikes = async (userId) => {
            if (!userId) {
                return;
            }

            try {
                const res = await fetch(`/api/hikes/user/${userId}`);

                if (res.status === 200) {
                    const data = await res.json();
                    setHikes(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingHikes(false);
            }
        }

        // Fetch user hike when session is available
        if (session?.user?.id) {
            fetchUserHikes(session.user.id);
        }
    }, [session])

    const handleDeleteHike = async (hikeId) => {
        const confirmed = window.confirm('Are you sure you want to delete this property?');

        if (!confirmed) return;

        try {
            const res = await fetch(`/api/hikes/${hikeId}`, {method: 'DELETE'});

            if (res.status === 200) {
                // Remove the hike from state
                const updatedHikes = hikes.filter((hike) => hike._id !== hikeId);

                setHikes(updatedHikes);

                toast.success('Hike deleted');
            } else {
                toast.error('Failed to delete hike');
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete hike');
        }
    }

  return (
    <section className="section container profile">
        <div className="profile__left">
            <Image
                src={profileImage}
                width={200}
                height={200}
                alt="User"
                priority
                className="profile__image"
            >
            </Image>
            <h3>
                <span>Name:</span>
                {profileName}
            </h3>
            <h3>
                <span>Email:</span>
                {profileEmail}
            </h3>

            <div className="profile_reviews">
                <h2>User Reviews:</h2>
                        <div>
                            <span>Date of post:</span>
                            <span>Rating: /5</span>
                            <span>Title: </span>
                            <span>Comment: </span>
                        </div>
            </div>
        </div>
        <div className="profile__right">
            <h2>Your Hikes</h2>
            {!loadingHikes && hikes.length === 0 && (
                <p>You have no hikes posted</p>
            )}
            {loadingHikes ? 'loading' : (
                hikes.map((hike) => (
                    <div key={hike._id} className="profile__card">
                        <Link
                            href={`/hikes/${hike._id}`}
                        >
                            <Image 
                                src={hike.images[0]}
                                alt=""
                                width={500}
                                height={100}
                                priority
                                className="profile__card-image"
                            ></Image>
                        </Link>
                        <h4>{hike.title}</h4>
                        <p>Created at: {new Date(hike.createdAt).toLocaleDateString()}</p>
                        <div className="profile__buttons">
                            <Link 
                                href={`/hikes/${hike._id}/edit`}
                                className="btn edit">Edit
                            </Link>
                            <button
                                onClick={() => handleDeleteHike(hike._id)}
                                className="btn delete"
                            >Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
            
        </div>
    </section>
  )
}

export default ProfilePage