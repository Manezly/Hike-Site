'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchSingleHike } from '@/utils/request';
import SingleHikeHeaderImage from '@/components/SingleHikeHeaderImage';
import Link from 'next/link';
import SingleHikeDetails from '@/components/SingleHikeDetails';
import { fetchCoords, fetchWeather } from '@/utils/weather';
import WeatherDetails from '@/components/WeatherDetails';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButtons from '@/components/ShareButtons';
import HikeImages from '@/components/HikeImages';

const HikePage = () => {
  const {id} = useParams();

  const [hike, setHike] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);
  
  useEffect(() => {
    const fetchSingleHikeData = async () => {
      if (!id) {
        return;
      }

      try {
        const hike = await fetchSingleHike(id);
        setHike(hike);
      } catch (error) {
        console.error('Error fetching hike', error);
      } finally {
        setLoading(false);
      }
    }

    if (hike === null) {
      fetchSingleHikeData();
    }
  }, [id, hike]);

  useEffect(() => {
    const fetchWeatherData = async() => {
      if (!hike) {
        return;
      }

      try {
        // const location = `${hike.location.county}`;
        // const coords = await fetchCoords(location);
        // const weatherData = await fetchWeather(coords.lat, coords.lon);

        // Ahove is the method to auto generate long/lat coords using the geo api, but its unreliable
        const { latitude, longitude } = hike.location;
        const weatherData = await fetchWeather(latitude, longitude);
        setWeather(weatherData);
      } catch (error) {
        console.error('Error fetching weather data', error)
      } finally {
        setWeatherLoading(false);
      }
    };

    if(hike) {
      fetchWeatherData();
    }
  }, [hike]);

  if (!hike && !loading) {
    return (
      <h1>Hiking Route Wasn't Found</h1>
    )
  }

  return (
    <>
      {!loading && hike && (
        <>
          <SingleHikeHeaderImage image={hike.images[0]}/>
          {/* CSS in header.css */}
          <section className="container section actions">
            <Link
              href='/hikes'
              className='btn'
            >Back to All Hikes</Link>
            <BookmarkButton hike={hike} />
            <ShareButtons hike={hike} />
          </section>
          <SingleHikeDetails hike={hike}/>
          {!weatherLoading && weather && (
            <WeatherDetails weather={weather} selectedDay={selectedDay} />
          )}
          <HikeImages images={hike.images} />
        </>
      )}
    </>
  )
}

export default HikePage