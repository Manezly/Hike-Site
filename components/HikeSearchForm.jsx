'use client'
import { useState } from "react"
import { useRouter } from "next/navigation";
import '@/assets/styles/searchBar.css';


const HikeSearchForm = () => {
    const [location, setLocation] = useState('');
    const [difficulty, setDifficulty] = useState('all');

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (location === '' && difficulty === 'all') {
            router.push('/hikes');
        } else {
            const query = `?location=${location}&difficulty=${difficulty}`;

            router.push(`/hikes/search-results${query}`);
        }
    }
  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="location"></label>
            <input 
                type="text"
                id="location" 
                placeholder="Search"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
        </div>
        <div className="difficulty">
            <label htmlFor="difficulty">Difficulty</label>
            <select 
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
            >
                <option value="all">all</option>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
            </select>
        </div>
        <button
            type="submit"
            className="btn"
        >Search</button>
    </form>
  )
}

export default HikeSearchForm