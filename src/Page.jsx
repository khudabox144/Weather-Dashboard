import React, { useContext, useEffect, useState } from 'react';
import Header from './Components/Header';
import WeatherBoard from './Components/WeatherBoard';
import { weatherContext } from './context';

import ClearSkyImage from "/public/assets/backgrounds/clear-sky.jpg";
import FewCloudsImage from "/public/assets/backgrounds/few-clouds.jpg";
import MistImage from "/public/assets/backgrounds/mist.jpeg";
import RainyDayImage from "/public/assets/backgrounds/rainy-day.jpg";
import ScatterdCloudsImage from "/public/assets/backgrounds/scattered-clouds.jpg";
import SnowImage from "/public/assets/backgrounds/sunny.jpg";
import ThunderStormImage from "/public/assets/backgrounds/thunderstorm.jpg";
import WinterImage from "/public/assets/backgrounds/winter.jpg";


const Page = () => {
    const {weatherData, loading, error, } = useContext(weatherContext);

    const [climateImage, setClimateImage] = useState("");

    function getBackgroundImage(climate) {
        switch (climate) {
            case "Rain":
                return RainyDayImage;
            case "Clouds":
                return ScatterdCloudsImage;
            case "Clear":
                return ClearSkyImage;
            case "Snow":
                return SnowImage;
            case "Thunder":
                return ThunderStormImage;
            case "Fog":
                return WinterImage;
            case "Haze":
                return FewCloudsImage;
            case "Mist":
                return MistImage;
            default:
                return ClearSkyImage;
        }
    }

    useEffect(() => {
        const bgImage = getBackgroundImage(weatherData.climate);
        setClimateImage(bgImage);
    }, [weatherData.climate]);



    if (loading.state) return (<span className="loading loading-bars ml-20 mt-20  w-1/12  h-1/12 ">{loading.message}</span>)
    if (error) return (<li>{error}</li>)
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${climateImage}')` }}
        >
            <header>
                <Header climateImage={climateImage} />
            </header>

            <main className="mt-32">
                <WeatherBoard />
            </main>
        </div>
    );
};

export default Page;