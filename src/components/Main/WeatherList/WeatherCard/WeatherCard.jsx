import React from "react";

const WeatherCard = ({ weatherData }) => {
    // Validar que weatherData existe y tiene las propiedades esperadas
    if (!weatherData || !weatherData.dt_txt || !weatherData.main || !weatherData.weather) {
        console.warn("WeatherCard: Datos inválidos:", weatherData);
        return <div className="weather-item">Datos no disponibles</div>;
    }

    const { dt_txt, main, weather } = weatherData;

    return (
        <div className="weather-item">
            <p><strong>Fecha y hora:</strong> {dt_txt}</p>
            <p><strong>Temperatura:</strong> {main.temp} °C</p>
            <p><strong>Descripción:</strong> {weather[0]?.description || "Sin descripción disponible"}</p>
        </div>
    );
};

export default WeatherCard;
