import { useState } from 'react'
import WeatherList from './components/Main/WeatherList';
import WeatherCard from './components/Main/WeatherList/WeatherCard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <WeatherList/>
        <WeatherCard/>
    </>
  )
}

export default App
