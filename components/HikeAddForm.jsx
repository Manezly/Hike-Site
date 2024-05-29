'use client'
import { useState, useEffect } from "react"
import '@/assets/styles/hikeAddForm.css'

const HikeAddForm = () => {
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
        images: '',
        isFeatured: false
    })

    useEffect(() => {
        setMounted(true);
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
    const handleImageChange = (e) => {
        const {files} = e.target;

        // Clone images array
        const updatedImages = [...fields.images];

        // Add new files to the array
        for (const file of files) {
            updatedImages.push(file);
        }

        // Update state with array of images
        setFields((prevFields) => ({
            ...prevFields,
            images: updatedImages,
        }));
    }

    

    return mounted && 

    <section className="section container add">
        <form action="/api/hikes" method="POST" encType="multipart/form-data">
            <h2>Add Hike</h2>
            <div className="input_container regular_container">
                <label htmlFor="title">Title </label>
                <input type="text" id="title" name="title" required value={fields.title} onChange={handleChange}/>
                <label htmlFor="title">Include significant destinations in the title</label>
            </div>
            <div className="type_container">
                <h5>Type</h5>
                <div className="checkbox_container">
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
            </div>
            <div className="regular_container">
                <label htmlFor="difficulty">Difficulty </label>
                <select name="difficulty" id="difficulty" value={fields.difficulty} onChange={handleChange} required>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                </select>
            </div>
            <div className="input_container summary">
                <label htmlFor="summary">Summary </label>
                <textarea placeholder="Give a brief summary of the trail" id="summary" name="summary" required value={fields.summary} onChange={handleChange}/>
                <label htmlFor="summary"> </label>
            </div>
            <div className="location_container">
                <h5>Location Data</h5>
                <div className="regular_container">
                    <label htmlFor="area">Area </label>
                    <input type="text" id="area" name="location.area" required value={fields.area} onChange={handleChange}/>
                </div>
                <div className="regular_container">
                    <label htmlFor="county">County </label>
                    <input type="text" id="county" name="location.county" required value={fields.county} onChange={handleChange}/>
                </div>
                <div className="regular_container">
                    <label htmlFor="latitude">Latitude </label>
                    <input type="number" id="latitude" name="location.latitude" required value={fields.location.latitude} onChange={handleChange}/>
                </div>
                <div className="regular_container">
                    <label htmlFor="longitude">Longitude </label>
                    <input type="number" id="longitude" name="location.longitude" required value={fields.location.longitude} onChange={handleChange}/>
                </div>
            </div>
            <div className="regular_container">
                <label htmlFor="elevation_gain">Elevation Gain in Metres </label>
                <input type="number" id="elevation_gain" name="elevation_gain" required value={fields.elevation_gain} onChange={handleChange}/>
            </div>
            <div className="regular_container"> 
                <label htmlFor="length">Length in km </label>
                <input type="number" id="length" name="length" required value={fields.length} onChange={handleChange}/>
            </div>
            <div className="regular_container">
                <label htmlFor="average_time">Average Time </label>
                <input type="text" id="average_time" name="average_time" required value={fields.average_time} onChange={handleChange}/>
                <label htmlFor="average_time"> e.g. (4 hr 5 mins)</label>
            </div>
            <div className="regular_container">
                <label htmlFor="trail_type">Trail Type </label>
                <select name="trail_type" id="trail_type" required value={fields.trail_type} onChange={handleChange}>
                    <option value="Circular">Circular</option>
                    <option value="Point-to-Point">Point-to-Point</option>
                </select>
            </div>
            <div className="input_container paragraph">
                <label htmlFor="text_body">Text Body </label>
                <textarea type="text" placeholder="Give a detailed description of the experience" id="text_body" name="text_body" required value={fields.text_body} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="images">Images </label>
                <input className="" type="file" id="images" name="images" accept="image/*" multiple onChange={handleImageChange} required/>
            </div>


        <button type="submit">Submit</button>
        </form>
    </section>
}

export default HikeAddForm