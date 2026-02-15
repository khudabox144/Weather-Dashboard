import { useContext, useEffect, useState } from 'react';
import Header from './Components/Header';
import WeatherBoard from './Components/WeatherBoard';
import { weatherContext } from './context';


const Page = () => {
    const {weatherData, loading, error, } = useContext(weatherContext);

    const [climateImage, setClimateImage] = useState("");

    function getBackgroundImage(climate) {
        switch (climate) {
            case "Rain":
                return "/assets/backgrounds/rainy-day.jpg";
            case "Clouds":
                return "/assets/backgrounds/scattered-clouds.jpg";
            case "Clear":
                return "/assets/backgrounds/clear-sky.jpg";
            case "Snow":
                return "/assets/backgrounds/snow.jpg";
            case "Thunder":
                return "/assets/backgrounds/thunderstorm.jpg";
            case "Fog":
                return "/assets/backgrounds/winter.jpg";
            case "Haze":
                return "/assets/backgrounds/few-clouds.jpg";
            case "Mist":
                return "/assets/backgrounds/mist.jpeg";
            default:
                return "/assets/backgrounds/clear-sky.jpg";
        }
    }

    useEffect(() => {
        const bgImage = getBackgroundImage(weatherData.climate);
        setClimateImage(bgImage);
    }, [weatherData.climate]);

    if (loading.state) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
                <div className="text-center animate-fade-in-up">
                    <div className="relative">
                        <div className="w-20 h-20 mx-auto rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
                        <img src="/assets/cloud.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 animate-pulse-slow" />
                    </div>
                    <p className="text-white/80 mt-6 text-lg font-medium">{loading.message}</p>
                    <p className="text-white/40 mt-1 text-sm">Please wait...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 px-4">
                <div className="text-center glass-card p-8 md:p-10 max-w-md w-full animate-fade-in-up border-red-500/20">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-red-300 text-xl font-bold mb-2">Something went wrong</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-8 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 text-sm font-medium border border-white/10 hover:border-white/20 active:scale-95"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat bg-transition relative"
            style={{ backgroundImage: `url('${climateImage}')` }}
        >
            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none" />

            <div className="relative z-10">
                <Header />

                <main className="pt-28 md:pt-32 pb-8 md:pb-12 px-4">
                    <WeatherBoard />
                </main>

                {/* Footer */}
                <footer className="text-center py-4 text-white/30 text-xs">
                    <p>Powered by OpenWeatherMap &bull; Built with React</p>
                </footer>
            </div>
        </div>
    );
};

export default Page;