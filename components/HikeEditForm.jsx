'use client'
import { useState, useEffect } from "react"
import  { useRouter, useParams} from 'next/navigation';
import {toast} from 'react-toastify';
import { fetchSingleHike } from "@/utils/request";

const HikeEditForm = () => {
    const {id} = useParams();
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [fields, setFields] = useState({
        title: '',
        type: '',
        difficulty: '',
        summary: '',
        location: {
            area: '',
            county: '',
            latitude: '',
            longitude: ''
        },
        elevation_gain: '',
        length: '',
        average_time: '',
        trail_type: '',
        text_body: '',
        isFeatured: false
    })
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMounted(true);

        // Fetch hike data for form
        const fetchHikeData = async () => {
            try {
                const hikeData = await fetchSingleHike(id);

                setFields(hikeData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchHikeData();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check if nested
        if (name.includes('.')) {
            const [outerKey, innerKey] = name.split('.');
            
            setFields((prevFields) => ({
                ...prevFields,
                [outerKey]: {
                    ...prevFields[outerKey],
                    [innerKey]: value
                }
            }))
        } else {
            // Not nested
            setFields((prevFields) => ({
                ...prevFields,
                [name]: value
            }))
        }
    }
    const handleTypeChange = (e) => {
        const {value,checked} = e.target;

        // Clone the current array
        const updatedTypes = [...fields.type];

        if (checked) {
            // Add value to array
            updatedTypes.push(value);
        } else {
            // Remove value from array
            const index = updatedTypes.indexOf(value);

            if (index !== -1) {
                updatedTypes.splice(index, 1);
            }
        }

        // Update state with updated array
        setFields((prevFields) => ({
            ...prevFields,
            type: updatedTypes,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const res = await fetch(`/api/hikes/${id}`, {
                method: 'PUT',
                body: formData
            });

            if (res.status === 200) {
                router.push(`/hikes/${id}`);
            } else if (res.status === 401 || res.status === 403) {
                toast.error('Permission denied');
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return mounted && !loading &&

    <section className="section container add">
        <form onSubmit={handleSubmit}>
            <h2>Edit Hike</h2>
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" required value={fields.title} onChange={handleChange}/>
            </div>
            <div>
                <h5>Type</h5>
                <div>
                    <input type="checkbox" id="hike" name="type" value="Hike" checked={fields.type.includes('Hike')} onChange={handleTypeChange}/>
                    <label htmlFor="hike">Hike</label>
                </div>
                <div>
                    <input type="checkbox" id="walk" name="type" value="Walk" checked={fields.type.includes('Walk')} onChange={handleTypeChange}/>
                    <label htmlFor="walk">Walk</label>
                </div>
                <div>
                    <input type="checkbox" id="running" name="type" value="Running" checked={fields.type.includes('Running')} onChange={handleTypeChange}/>
                    <label htmlFor="running">Running</label>
                </div>
                <div>
                    <input type="checkbox" id="rocky" name="type" value="Rocky" checked={fields.type.includes('Rocky')} onChange={handleTypeChange}/>
                    <label htmlFor="rocky">Rocky</label>
                </div>
                <div>
                    <input type="checkbox" id="dog_on_lead" name="type" value="Dog On Lead" checked={fields.type.includes('Dog On Lead')} onChange={handleTypeChange}/>
                    <label htmlFor="dog_on_lead">Dog On Lead</label>
                </div>
                <div>
                    <input type="checkbox" id="cave" name="type" value="Cave" checked={fields.type.includes('Cave')} onChange={handleTypeChange}/>
                    <label htmlFor="cave">Cave</label>
                </div>
                <div>
                    <input type="checkbox" id="partially_paved" name="type" value="Partially Paved" checked={fields.type.includes('Partially Paved')} onChange={handleTypeChange}/>
                    <label htmlFor="partially_paved">Partially Paved</label>
                </div>
                <div>
                    <input type="checkbox" id="river" name="type" value="River" checked={fields.type.includes('River')} onChange={handleTypeChange}/>
                    <label htmlFor="river">River</label>
                </div>
                <div>
                    <input type="checkbox" id="historic" name="type" value="Historic" checked={fields.type.includes('Historic')} onChange={handleTypeChange}/>
                    <label htmlFor="historic">Historic</label>
                </div>
                <div>
                    <input type="checkbox" id="forest" name="type" value="Forest" checked={fields.type.includes('Forest')} onChange={handleTypeChange} />
                    <label htmlFor="forest">Forest</label>
                </div>
                <div>
                    <input type="checkbox" id="birds" name="type" value="Birds" checked={fields.type.includes('Birds')} onChange={handleTypeChange}/>
                    <label htmlFor="birds">Birds</label>
                </div>
                <div>
                    <input type="checkbox" id="waterfall" name="type" value="Waterfall" checked={fields.type.includes('Waterfall')} onChange={handleTypeChange}/>
                    <label htmlFor="waterfall">Waterfall</label>
                </div>
                <div>
                    <input type="checkbox" id="camping" name="type" value="Camping" checked={fields.type.includes('Camping')} onChange={handleTypeChange}/>
                    <label htmlFor="camping">Camping</label>
                </div>
            </div>
            <div>
                <label htmlFor="difficulty">Difficulty:</label>
                <select name="difficulty" id="difficulty" value={fields.difficulty} onChange={handleChange} required>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                </select>
            </div>
            <div>
                <h3>Location Data</h3>
                <div>
                    <label htmlFor="summary">Summary:</label>
                    <input type="text" id="summary" name="summary" required value={fields.summary} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="area">Area e.g. Peak District:</label>
                    <input type="text" id="area" name="location.area" required value={fields.location.area} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="county">County:</label>
                    <input type="text" id="county" name="location.county" required value={fields.location.county} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="latitude">Latitude:</label>
                    <input type="number" id="latitude" name="location.latitude" required value={fields.location.latitude} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="longitude">Longitude:</label>
                    <input type="number" id="longitude" name="location.longitude" required value={fields.location.longitude} onChange={handleChange}/>
                </div>
            </div>
            <div>
                <label htmlFor="elevation_gain">Elevation Gain in km:</label>
                <input type="number" id="elevation_gain" name="elevation_gain" required value={fields.elevation_gain} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="length">Length in km:</label>
                <input type="number" id="length" name="length" required value={fields.length} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="average_time">Average Time:</label>
                <input type="text" id="average_time" name="average_time" required value={fields.average_time} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="trail_type">Trail Type:</label>
                <select name="trail_type" id="trail_type" required value={fields.trail_type} onChange={handleChange}>
                    <option value="Circular">Circular</option>
                    <option value="Point-to-Point">Point-to-Point</option>
                </select>
            </div>
            <div>
                <label htmlFor="text_body">Text Body:</label>
                <input type="text" id="text_body" name="text_body" required value={fields.text_body} onChange={handleChange}/>
            </div>

        <button type="submit">Update</button>
        </form>
    </section>
}

export default HikeEditForm