import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard/WeatherCard';
import {v4 as uuidv4} from 'uuid' 

const WeatherList = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;  // Importo de .env la api_key

  const [city, setCity] = useState('madrid');  // El estado inicial de city es madrid
  const [forecast, setForecast] = useState([]); // el estado inicial de forecast es un array vacio

  useEffect(() => {
    async function fetchData() {
      try{
        // Petición HTTP
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
        const json = res.data.list;  // Los datos que me interesan estan en esta parte del objeto
        setForecast(json)  // Actualizo el estado de forecast con el valor de la respuesta a la api


      }catch(err){
        console.log(err)
        setForecast([]);  // Si no hay conexion a la api, vuelve a dejar el estado de forecast en un array vacio
      }
    }

    fetchData(); // Llamada a la funcion para extraer datos
  }, [city]);   // Este city hace referencia a que se realiza esta funcion cada vez que el estado de city es actualizado


  const handleSubmit = e => {  // Funcion que se llama en el boton de submit
    e.preventDefault();
    const datoActualizado = e.target.city.value  // Recojo el valor del imput
    setCity(datoActualizado) // Modificando el estado de city con los datos recogidos del imput
  };



  return    <section className="formulario">
              <h1>El tiempo</h1>
              <form onSubmit={handleSubmit}> 
                {/* llamada a la funcion handleSubmit */}
                <input name="city" />
                <button>Buscar</button>
              </form>
              <div className="weather-list">
              {/* a forecast, que su estado fue modificado y dentro tiene un json, le hago un map para que me devuelva uno a uno cada objeto del array de 40
              que hay en el json. Con un uuid unico, y se lo envio por promp en esta linea weatherData={item}. WeatherCard es el componente al que se lo envio */}
				{
					forecast.map(item => (
						<WeatherCard key={uuidv4()} weatherData={item} />
					))
				}
			</div>

            </section>
};

export default WeatherList;