import { NextComponentType } from "next";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import clsx from "clsx";
import { motion } from "framer-motion";

import { OpenWeatherForecastListDataType } from "@openWeather/types";
import WeatherIcon, { WeatherIconDataType } from "components/WeatherIcon";
import { useWeather } from "context/useWeather";

type DayItemProps = {
	weather: OpenWeatherForecastListDataType;
	index: number;
}

function DayItem({ weather, index }: DayItemProps) {
	const { selectedDate, setSelectedDate } = useWeather();
	const date = new Date(weather.dt_txt);

	const handleOnClick = (date: Date) => () => {
		setSelectedDate(date);
	}

	return (
		<li>
			<motion.button
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.5 + (index / 10) }}
				className={clsx("flex flex-col gap-2 w-full h-full text-start text-sm rounded-md p-2 min-h-[200px] select-none transition", {
					["bg-white/[10%] backdrop-blur-md"]: (selectedDate.getDate() === date.getDate()),
					["hover:bg-white/[5%] hover:backdrop-blur-md"]: (selectedDate.getDate() !== date.getDate())
				})}
				onClick={handleOnClick(date)}>
				<div className="flex flex-col">
					<span className="uppercase font-medium text-base">
						{format(date, "E", { locale: ptBR })}
					</span>

					<span className="capitalize opacity-40">
						{format(date, "dd MMM", { locale: ptBR })}
					</span>
				</div>

				<div className="flex-1 flex flex-col">
					<span>
						<span className="opacity-40">min. </span>
						<span>{(weather.main.temp_min > 0) && "+"}{weather.main.temp_min.toFixed(0)}º</span>
					</span>

					<span>
						<span className="opacity-40">máx. </span>
						<span>{(weather.main.temp_max > 0) && "+"}{weather.main.temp_max.toFixed(0)}º</span>
					</span>
				</div>

				<div className="flex flex-col gap-2">
					<div className="w-[32px] aspect-square">
						<WeatherIcon
							icon={weather.weather[0].icon as WeatherIconDataType}
							className="h-[32px] max-w-[32px]" />
					</div>

					<span className="opacity-40 capitalize">
						{weather.weather[0].description}
					</span>
				</div>
			</motion.button>
		</li>
	);
}

const TimelineDays: NextComponentType = () => {
	const { getDaysWeather, loading } = useWeather();
	const data = getDaysWeather();

	if (loading)
		return (
			<ul
				data-testid="no-data-fallback"
				className="relative grid grid-cols-[repeat(6,_150px)] gap-[88px] w-fit mt-8">
				{[...Array(6)].map((_, key) => (
					<div key={key} className="opacity-10">
						<div className="bg-gray-200 h-[200px] rounded-md animate-pulse" />
					</div>
				))}
			</ul>
		);

	if (!data)
		return (
			<ul
				data-testid="no-data-fallback"
				className="relative grid grid-cols-[repeat(6,_150px)] gap-[88px] w-fit mt-8 p-4">
				{[...Array(6)].map((_, key) => (
					<div key={key} className="bg-gray-200 h-[200px] rounded-md opacity-30" />
				))}

				<div className="absolute flex items-center justify-center inset-0 bg-black/[50%] backdrop-blur-md rounded-md text-red-400 font-medium text-sm">
					Falha ao carregar dados do clima
				</div>
			</ul>
		);

	return (
		<ul
			className="grid gap-[88px] w-fit mt-8"
			style={{ gridTemplateColumns: `repeat(${data.length}, 150px)` }}>
			{data.map((weather, key) => (
				<DayItem key={key} weather={weather} index={key} />
			))}
		</ul>
	);
}

export default TimelineDays;