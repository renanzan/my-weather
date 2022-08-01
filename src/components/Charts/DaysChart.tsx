import { NextComponentType } from "next";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import clsx from "clsx";

import { OpenWeatherForecastListDataType } from "@openWeather/types";
import WeatherIcon, { WeatherIconDataType } from "components/WeatherIcon";

type Props = {
	data?: Array<OpenWeatherForecastListDataType>;
	current: number;
	onClick: (date: Date) => void;
}

type DayItemProps = {
	weather: OpenWeatherForecastListDataType;
	current: number;
	onClick: (date: Date) => void;
}

function DayItem({ weather, current, onClick }: DayItemProps) {
	const date = new Date(weather.dt_txt);

	const handleOnClick = (date: Date) => () => {
		if (typeof onClick === "function")
			onClick(date);
	}

	return (
		<li>
			<button
				className={clsx("flex flex-col gap-2 w-full h-full text-start text-sm rounded-md p-2 min-h-[200px] transition", {
					["bg-white/[10%] backdrop-blur-md"]: (current === date.getDate()),
					["hover:bg-white/[5%] hover:backdrop-blur-md"]: (current !== date.getDate())
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
			</button>
		</li>
	);
}

const DaysChart: NextComponentType<{}, {}, Props> = ({ data, current, onClick }) => {
	if (!data)
		return (
			<div>
				Não foi possível carregar os dados
			</div>
		);

	return (
		<ul
			className="grid gap-[88px] w-fit mt-8"
			style={{ gridTemplateColumns: `repeat(${data.length}, 150px)` }}>
			{data.map((weather, key) => (
				<DayItem key={key} weather={weather} current={current} onClick={onClick} />
			))}
		</ul>
	);
}

export default DaysChart;