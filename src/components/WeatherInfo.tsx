import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import clsx from "clsx";
import { HiOutlineLocationMarker } from "react-icons/hi";

import { useGeolocation } from "context/useGeolocation";
import { useWeather } from "context/useWeather";
import WeatherAnimation, { WeatherAnimationDataType } from "./Animation/WeatherAnimation";
import { NextComponentType } from "next";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

const WeatherInfo: NextComponentType<{}, {}, Props> = ({ className, ...rest }) => {
	const { geoData, dayPeriod } = useGeolocation();
	const { weather, selectedDate } = useWeather();

	if (!geoData || !weather)
		return (
			<div>
				Dados indisponíveis!
			</div>
		);

	return (
		<div className={clsx("flex items-center justify-center flex-wrap gap-10 px-10", className)} {...rest}>
			<div className="flex flex-col items-center">
				<div className="flex flex-col items-center mb-4">
					<span className="flex gap-1 items-center text-sm opacity-80">
						<HiOutlineLocationMarker />

						<span>{geoData.components.state_code} / {weather.name}</span>
					</span>

					<strong className="capitalize">
						{format(selectedDate, "E, d MMM yy\'\' HH:mm", { locale: ptBR })}
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
	);
}

export default WeatherInfo;