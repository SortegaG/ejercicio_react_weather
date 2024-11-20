import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard/WeatherCard';
import {v4 as uuidv4} from 'uuid' 

const WeatherList = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [city, setCity] = useState('madrid');
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try{
        // Petición HTTP
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
        const json = res.data.list;
        setForecast(json)


      }catch(err){
        console.log(err)
        setForecast([]);
      }
    }

    fetchData();
  }, [city]); 


  const handleSubmit = e => {
    e.preventDefault();
    const datoActualizado = e.target.city.value
    setCity(datoActualizado) // Modificando el estado de Value
  };



  return    <section className="formulario">
              <h1>El tiempo</h1>
              <form onSubmit={handleSubmit}>
                <input name="city" />
                <button>Buscar</button>
              </form>
              <div className="weather-list">
              
				{
          
					forecast.map(item => (
						<WeatherCard key={uuidv4()} weatherData={item} />
					))
				}
			</div>

            </section>
};

export default WeatherList;