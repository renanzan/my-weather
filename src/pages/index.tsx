import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { format } from "date-fns";
import { HiOutlineLocationMarker } from "react-icons/hi";
import ptBR from "date-fns/locale/pt-BR";

import Layout from "components/Layout";
import useGeolocation from "hooks/useGeolocation";
import useWeather from "hooks/useWeather";
import WeatherAnimation, { WeatherAnimationDataType } from "components/WeatherAnimation";
import clsx from "clsx";
import { ChartSkeleton } from "components/Skeleton";
import DaysChart from "components/Charts/DaysChart";
import { useState } from "react";

const DynamicTodayChart = dynamic(
	import('../components/Charts/TodayChart'),
	{
		loading: ChartSkeleton,
		ssr: false
	},
);

const Home: NextPage = () => {
	const { position, geoData, status, now, dayPeriod } = useGeolocation();
	const { weather, forecast, getWeatherByDay, getDaysWeather } = useWeather({ latitude: position?.latitude, longitude: position?.longitude });
	const [current, setCurrent] = useState(now.getDate());

	if (!weather || !geoData)
		return (
			<Layout>
				Carregando...
			</Layout>
		);

	return (
		<Layout
			className="px-4 flex flex-col justify-end md:h-full"
			bgImage={(dayPeriod === "day") ? "/assets/images/day-background.png" : "/assets/images/night-background.png"}>
			<div className="flex flex-col items-center lg:flex-row md:justify-center">
				<div className="flex items-center justify-center flex-wrap gap-10 px-10">
					<div className="flex flex-col items-center">
						<div className="flex flex-col items-center mb-4">
							<span className="flex gap-1 items-center text-sm opacity-80">
								<HiOutlineLocationMarker />

								<span>{geoData.components.state_code} / {weather.name}</span>
							</span>

							<strong className="capitalize">
								{format(now, "E, d MMM yy\'\' HH:mm", { locale: ptBR })}
							</strong>
						</div>

						<h2 className={clsx("text-center font-bold text-5xl mt-2", {
							["text-day"]: (dayPeriod === "day"),
							["text-night"]: (dayPeriod === "night")
						})}>
							{(weather.main.temp > 0) && "+"}{weather.main.temp.toFixed(0)} ºC
						</h2>

						<ul className="text-sm opacity-80 text-center">
							<li>Sensação térmica {weather.main.feels_like.toFixed(0)}º</li>
							<li className="capitalize">{weather.weather[0].description}</li>
						</ul>
					</div>

					<div className="flex flex-col items-center mt-8">
						<div className="w-[100px] aspect-square">
							<WeatherAnimation animationData={weather.weather[0].icon as WeatherAnimationDataType} />
						</div>

						<ul className="mt-1 text-xs text-center opacity-80">
							<li>Nascer do sol: {format(new Date(weather.sys.sunrise * 1000), "HH:mm")}</li>
							<li>Pôr do sol: {format(new Date(weather.sys.sunset * 1000), "HH:mm")}</li>
						</ul>
					</div>

					<div className="mt-10 opacity-80 text-center sm:text-start">
						<strong className="block uppercase mb-2">Mais detalhes:</strong>

						<ul className="flex flex-col gap-1 text-sm">
							<li>Velocidade do vento: <strong>{weather.wind.speed} m/s</strong></li>
							<li>Direção do vento: <strong>{weather.wind.deg} deg</strong></li>
							<li>Umidade do ar: <strong>{weather.main.humidity}%</strong></li>
							<li>Pressão atmosférica: <strong>{weather.main.pressure}mm</strong></li>
						</ul>
					</div>
				</div>

				<DynamicTodayChart
					data={getWeatherByDay(current)}
					className="mt-10" />
			</div>

			<div className="flex flex-col items-center">
				<div className="w-full overflow-x-auto mt-10 mb-[80px] custom-scroolbar">
					<div className="my-3 mx-auto w-fit pt-4">
						<span className="relative block px-[90px] h-px w-full bg-white/[50%]">
							<span className={clsx("absolute flex justify-center text-sm pb-1 border-[0px] border-b-[1px] border-b-solid w-[150px] bottom-0 uppercase", {
								["text-night border-night"]: (dayPeriod === "night"),
								["text-day border-day"]: (dayPeriod === "day")
							})}>
								<span>Hoje</span>

								<span className={clsx("border-[6px] border-solid border-transparent rounded-sm border-t-green-500 absolute bottom-0 translate-y-full block", {
									["border-t-night"]: (dayPeriod === "night"),
									["border-t-day"]: (dayPeriod === "day")
								})} />
							</span>
						</span>

						<div className="mx-[90px] w-full">
							<DaysChart
								data={getDaysWeather()}
								current={current}
								onClick={date => setCurrent(date)} />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Home;