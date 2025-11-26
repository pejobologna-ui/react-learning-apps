'use client'

import { useState } from 'react'

export default function WeatherApp() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const cities = {
    'London': { lat: 51.5074, lon: -0.1278 },
    'New York': { lat: 40.7128, lon: -74.0060 },
    'Tokyo': { lat: 35.6762, lon: 139.6503 },
    'Paris': { lat: 48.8566, lon: 2.3522 },
    'Sydney': { lat: -33.8688, lon: 151.2093 }
  }

  const fetchWeather = async (lat, lon, cityName) => {
    setLoading(true)
    setCity(cityName)

    try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max`
        )
        
        const data = await response.json()
        setWeather(data)
        setLoading(false)
      } catch (error) {
        console.error('Error:', error)
        alert('Failed to fetch weather')
        setLoading(false)
      }
    }

    const searchCity = () => {
        const cityData = cities[searchInput]
        if (cityData) {
            fetchWeather(cityData.lat, cityData.lon, searchInput)
        } else {
            alert('City not found. Try: London, New York, Tokyo, Paris, or Sydney')
        }
    }

    return (
    <div className="p-8 max-w-2xl mx-auto bg-gradient-to-br from-blue-400 to-blue-600 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">
        🌤️ Weather App
        </h1>

        <div className="flex gap-2 mb-8">
        <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchCity()}
            placeholder="Enter city name"
            className="flex-1 border-2 rounded-lg px-4 py-3 text-lg text-blue"
        />
        <button
            onClick={searchCity}
            className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-100"
        >
            Search
        </button>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap justify-center text-blue">
        {Object.keys(cities).map(cityName => (
            <button
            key={cityName}
            onClick={() => {
                setSearchInput(cityName)
                fetchWeather(cities[cityName].lat, cities[cityName].lon, cityName)
            }}
            className="bg-white bg-opacity-20 text-black px-4 py-2 rounded-lg hover:bg-opacity-30"
            >
            {cityName}
            </button>
        ))}
        </div>

        {loading ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl">Loading weather data...</p>
        </div>
        ) : weather && city ? (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-600">{city}</h2>
            
            <div className="text-center mb-6">
            <p className="text-7xl font-bold text-gray-500 mb-2">
                {Math.round(weather.current.temperature_2m)}°C
            </p>
            <p className="text-2xl text-gray-600">
                💨 Wind: {weather.current.wind_speed_10m} km/h
                💧 Precipitation: {weather.daily.precipitation_probability_max[0]}%
            </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">Max Today</p>
                <p className="text-3xl font-bold text-red-500">
                {Math.round(weather.daily.temperature_2m_max[0])}°C
                </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">Min Today</p>
                <p className="text-3xl font-bold text-blue-500">
                {Math.round(weather.daily.temperature_2m_min[0])}°C
                </p>
            </div>
            </div>
        </div>
        ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-xl text-gray-600">
            Click a city or search above!
            </p>
        </div>
        )}
    </div>
    )
}    