import React, { useEffect, useState } from 'react';
import './styles.css';
import WeatherCard from './WeatherCard';

export default function Weather() {

    const [ searchValue, setSearchValue ] = useState("Delhi");
    const [tempInfo, setTempInfo ] = useState({});

    const getWeatherInfo = async () => {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=942355cb8b463fdbffc6e638e10a4918`;
            const res = await fetch(url);
            const data = await res.json();

            const {temp, humidity, pressure} = data.main;
            const {main: weathermood} = data.weather[0]; 
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;
            
            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };

            setTempInfo(myNewWeatherInfo);

        } catch(error) {
            console.log(error);
        }
    };

    // For the Very First Time, when Page is Loaded, then only this Function will work

    useEffect(() => {
        getWeatherInfo();
    }, []);

    return (
        <>

            <div className='wrap'>
                <div className='search'>
                    <input type="search"
                           placeholder='Search...'
                           autoFocus
                           id='search'
                           className='searchTerm'
                           value={searchValue}
                           onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button className='searchButton' type='button' onClick={getWeatherInfo}>
                        Search
                    </button>
                </div>
            </div>

            <WeatherCard tempInfo={tempInfo}/>

        </>
    );
}
                 {/* 942355cb8b463fdbffc6e638e10a4918 My API ID*/
                /*api.openweathermap.org/data/2.5/weather?q=delhi&appid=942355cb8b463fdbffc6e638e10a4918 */}