import WeatherHeadline from "./WeatherHeadline";
import AddToFavourite from "./AddToFavourite";
import WeatherCondtion from "./WeatherCondtion";

const WeatherBoard = () => {
	return (
		<div className="container mx-auto max-w-5xl animate-fade-in-up">
			<div className="glass-card px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 lg:px-14 lg:py-12">
				{/* Top bar: favourite button */}
				<AddToFavourite />

				{/* Main content: headline + conditions */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-6">
					<WeatherHeadline />
					<WeatherCondtion />
				</div>
			</div>
		</div>
	);
};

export default WeatherBoard;
