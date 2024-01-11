import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Weather = () => {
    const [city,setCity]= useState('')
    const [currentWeather,setCurrentWeather]=useState(null)
    const [unit, setUnit] = useState('metric')


    const API_KEY='0563c8f69d0ad320ff59c131904a3904'

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const currentWeatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
              );
              setCurrentWeather(currentWeatherResponse.data);
            }catch (error) {
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

      return (
        <div className="bg-slate-900 h-screen">
          <header className="text-xl z-10 shadow-md shadow-white text-center bg-gradient-to-l from-blue-500 to-purple-500 ">Weather Forecast App</header>
          <div className="m-2 p-2">
            <div className="flex flex-col items-center">
              <label className="text-lg mb-2 text-violet-600">Enter Location:</label>
              <input
                type="text"
                value={city}
                className="bg-gray-200 border-2 capitalize hover:bg-gray-300 outline-none rounded-xl p-2"
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
                </div>
              )}
            </div>
            <div className="mt-4">Forecast</div>
          </div>
        </div>
      )
}

export default Weather
