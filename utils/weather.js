const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

const fetchCoords = async(location) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location},&limit=1&appid=${apiKey}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Failed to fetch co-ordinates!')
        }

        const data = await res.json();
        if (data.length === 0) {
            throw new Error('Unable to find co-ordinates for the given location')
        }

        return data[0];
    } catch (error) {
        console.error('Error fetching co-ordinates', error);
        throw error;
    } 
}   

const fetchWeather = async(lat, lon) => {
    try {
        // const url = `https://api.openweathermap.org/data/2.5/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${apiKey}`;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=7&units=metric&appid=${apiKey}`;

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Failed to fetch weather data');
        }

        return res.json();
    } catch (error) {
        console.error('Failed to fetch weather data', error);
        throw error;
    }
}

export { fetchCoords, fetchWeather };