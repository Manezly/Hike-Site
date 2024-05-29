import React from 'react'
import Image from 'next/image';
import '@/assets/styles/weather.css';

const WeatherDetails = ({weather, selectedDay}) => {
    const sunriseTime = new Date(weather.sys.sunrise * 1000);
    const sunsetTime = new Date(weather.sys.sunset * 1000);
    const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // Handle midnight (0 hours)
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    };
    const formattedSunrise = formatTime(sunriseTime);
    const formattedSunset = formatTime(sunsetTime);

    const weather_info_array = weather.weather[0];
    const description = weather_info_array.description;

    console.log(weather);

    // const selectedWeather = weather[selectedDay];
    // console.log(selectedDay);

  return (
    <section className="container weather section">
      <h2>Current Weather</h2>
      <div className='weather__top'>
        <div className="weather__top-left">
            <Image 
                src={`http://openweathermap.org/img/wn/${weather_info_array.icon}.png`} 
                alt={description}
                width={70}
                height={70} 
                className='weather_icon'
            />
            <div>
                <span className='main_temp'>{weather.main.temp}°C</span>
                <span><strong>Min:</strong> {weather.main.temp_min}°C</span>
                <span><strong>Max:</strong> {weather.main.temp_max}°C</span>
            </div>
        </div>
        <div className="weather__top-right">
            <ul>
                <li><strong>Humidity:</strong> {weather.main.humidity}%</li>
                <li><strong>Wind Speed:</strong> {weather.wind.speed} km/h</li>
                <li><strong>Sunset:</strong> {formattedSunset}</li>
                <li><strong>Sunrise:</strong> {formattedSunrise}</li>
            </ul>
        </div>
      </div>
      
    </section>
  )
}

export default WeatherDetails