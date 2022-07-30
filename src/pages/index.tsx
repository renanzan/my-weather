import type { NextPage } from "next";
import dynamic from "next/dynamic";

import useGeolocation from "hooks/useGeolocation";
import useWeather from "hooks/useWeather";
import { ChartSkeleton } from "components/Skeleton";
import WeatherAnimation, { WeatherAnimationDataType } from "components/WeatherAnimation";

const DynamicChart = dynamic(
	import('../components/Charts/TemperatureChart'),
	{
		loading: ChartSkeleton,
		ssr: false
	},
);

const Home: NextPage = () => {
	const { position, geoData, status } = useGeolocation();
	const { weather, forecast, refreshForecast, refreshWeather } = useWeather({ latitude: position?.latitude, longitude: position?.longitude });

	function handleRefresh() {
		if (!position)
			return;

		refreshForecast(position.latitude, position.longitude);
		refreshWeather(position.latitude, position.longitude);
	}

	// console.log({ forecast });

	return (
		<div className="absolute inset-0 flex flex-col gap-5 items-center bg-gray-200 py-[60px] min-h-screen h-[fit-content]">
			<button
				className="bg-gray-300 w-full max-w-[600px] hover:bg-gray-400"
				onClick={handleRefresh}>
				Refresh
			</button>

			<div className="bg-white p-4 pl-0 rounded-sm shadow-sm w-full max-w-[600px]">
				<DynamicChart forecast={forecast} perDay={false} />
			</div>

			<div className="bg-white p-4 rounded-sm shadow-sm w-full max-w-[600px]">
				{forecast && (
					<ul>
						<li><strong>População da cidade:</strong> {forecast.city.population} habitantes</li>
					</ul>
				)}
			</div>

			{weather && (
				<div className="flex flex-col gap-4 bg-white p-4 rounded-sm shadow-sm w-full max-w-[600px]">
					<span>{weather.name}</span>

					<div className="flex flex-col gap-2">
						<div className="flex flex-col">
							<strong>{Number(weather.main.temp).toFixed(0)} ºC</strong>

							<span className="text-sm text-gray-500">
								Sensação térmica {Number(weather.main.feels_like).toFixed(0)}º
							</span>
						</div>

						<span className="flex items-center gap-1">
							<h2 className="capitalize">{weather.weather[0].description}</h2>

							<div className="h-[50px] aspect-square">
								<WeatherAnimation
									animationData={weather.weather[0].icon as WeatherAnimationDataType} />
							</div>
						</span>
					</div>

					<ul className="list-disc pl-4">
						<li><strong>Umidade: </strong> {weather.main.humidity}%</li>
						<li><strong>Velocidade do vento: </strong> {(Number(weather.wind.speed) * 3.6).toFixed(0)} km/h</li>
						<li><strong>Direção do vento: </strong> {weather.wind.deg} deg</li>
						<li><strong>Nascer do sol: </strong> {new Date(Number(weather.sys.sunrise) * 1000).toTimeString()}</li>
						<li><strong>Pôr do sol: </strong> {new Date(Number(weather.sys.sunset) * 1000).toTimeString()}</li>
					</ul>
				</div>
			)}
		</div >
	)
}

export default Home;