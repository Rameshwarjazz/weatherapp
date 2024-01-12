import axios from 'axios'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { TiWeatherSunny, TiWeatherShower, TiWeatherCloudy, TiWeatherWindyCloudy, TiWeatherSnow, TiWeatherStormy } from 'react-icons/ti';

const Weather = () => {
    const [city,setCity]= useState('')
    const [currentWeather,setCurrentWeather]=useState(null)
    const [unit, setUnit] = useState('metric')
    const [forecastData, setForecastData] = useState(null)


    const API_KEY='0563c8f69d0ad320ff59c131904a3904'

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const currentWeatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
              );
              setCurrentWeather(currentWeatherResponse.data);
              const forecastResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
              );
              setForecastData(forecastResponse.data.list);
            } catch (error) {
              console.error('Error fetching weather data:', error);
            }
            }
            if (city) {
                fetchData();
              }
    },[city,unit])

    const handleUnitToggle = () => {
        console.log('Toggling unit...')
        setUnit(unit === 'metric' ? 'imperial' : 'metric');
      }
      const getWeatherIcon = (code) => {
    switch (code) {
      case '01d':
        return <TiWeatherSunny />;
      case '01n':
        return <TiWeatherSunny />;
      case '02d':
        return <TiWeatherSunny />;
      case '02n':
        return <TiWeatherSunny />;
      case '03d':
      case '03n':
        return <TiWeatherCloudy />;
      case '04d':
      case '04n':
        return <TiWeatherCloudy />;
      case '09d':
      case '09n':
        return <TiWeatherShower />;
      case '10d':
      case '10n':
          return <TiWeatherRain />;
      case '11d':
      case '11n':
        return <TiWeatherStormy />;
      case '13d':
      case '13n':
        return <TiWeatherSnow />;
      case '50d':
      case '50n':
        return <TiWeatherWindyCloudy />;
      default:
        return null;
    }
  };

      return (
        <div className="bg-gradient-to-l from-blue-400 to-white min-h-screen ">
          <header className="text-xl z-10 shadow-md shadow-white text-center bg-gradient-to-l from-blue-500 to-purple-500 ">Weather Forecast App</header>
          <div className="m-2 h- p-2">
            <div className="flex flex-col items-center">
              <label className="text-lg mb-2 text-violet-600">Enter Location:</label>
              <input
                type="text"
                value={city}
                className="bg-gray-200 border-2 w-1/2 capitalize hover:bg-gray-300 outline-none rounded-xl p-2"
                placeholder="Enter Location"
                onChange={(e) => setCity(e.target.value)}
              />
              <button onClick={handleUnitToggle} className="bg-blue-600 hover:bg-blue-400 rounded-lg mt-2 p-2">
                Toggle Unit
              </button>
              {currentWeather && (
                <div className=" bg-gradient-to-l from-blue-500 to-purple-500 w-1/2 p-4 border-2 mt-4 rounded-md">
                  <h2 className="text-2xl mb-2">Current Weather Details</h2>
                  <p className='text-xl'>Temperature: {currentWeather.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
                  <p className=''>Min Temperature: {currentWeather.main.temp_min}°{unit === 'metric' ? 'C' : 'F'}</p>
                  <p className=''>Max Temperature: {currentWeather.main.temp_max}°{unit === 'metric' ? 'C' : 'F'}</p>
                  <p className='text-right'>Humidity: {currentWeather.main.humidity}%</p>
                  <p className='text-right'>Wind Speed: {currentWeather.wind.speed} m/s</p>
                  <p className='text-right'>Wind Direction: {currentWeather.wind.deg}°</p>
                  <p>Description: {currentWeather.weather[0].description}</p>
                  <p className='text-orange-600'>Weather Icon: {getWeatherIcon(currentWeather.weather[0].icon)}</p>
                </div>
              )}
              {forecastData && (
            <div className=" bg-gradient-to-l from-purple-500 to-blue-500 w-1/2 p-4 border-2 mt-4 rounded-md">
                <h2 className="text-2xl mb-2">5-Day Forecast</h2>
                <br/>
                <ul>
                {forecastData.slice(0, 5).map((data, index) => (
                    <li key={index} className="mb-2 text-black text-center text-xl">
                    <p className='text-left text-green-900 p-2'>Date: {moment(data.dt_txt).format('YYYY-MM-DD')}</p>
                    <p>Average Temperature: {data.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
                    <p>Description: {data.weather[0].description}</p>
                    <p className='text-left text-orange-600 p-2'>Weather Icon: {getWeatherIcon(data.weather[0].icon)}</p>
                    </li>
                ))}
                </ul>
            </div>
            )}
            </div>
          </div>
          <nav className='text-center text-white'>@2024 Rameshwar Jaiswal</nav>
        </div>
      )
}

export default Weather
