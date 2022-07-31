import { NextComponentType } from "next";
import clsx from "clsx";
import { format } from "date-fns";
import { AreaChart, Area, YAxis, ResponsiveContainer } from 'recharts';

import { DaytimeType } from "hooks/useWeather";
import { OpenWeatherForecastListDataType } from "@openWeather/types";
import WeatherAnimation, { WeatherAnimationDataType } from "components/WeatherAnimation";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	data?: { [key in DaytimeType]?: Array<OpenWeatherForecastListDataType> };
}

const daytimeLabel: { [key in DaytimeType]: string } = {
	night: "Noite",
	morning: "Manhã",
	day: "Dia",
	afternoon: "Tarde"
}

const TodayChart: NextComponentType<{}, {}, Props> = ({ data, className, ...rest }) => {
	if (!data)
		return (
			<div>
				Não foi possível carregar os dados
			</div>
		);

	const chartData = ([] as Array<OpenWeatherForecastListDataType>).concat.apply([], Object.values(data));
	const constantChartData = [{ main: { temp: 20 } }, { main: { temp: 20 } }];

	return (
		<div className={clsx("bg-white/[10%] backdrop-blur-md rounded-md w-fit max-w-full overflow-y-hidden overflow-x-auto custom-scroolbar", className)} {...rest}>
			<div className="relative w-fit h-fit p-6">
				<ul
					className="relative z-10 grid gap-4"
					style={{
						gridTemplateColumns: `repeat(${Object.keys(data).length}, 1fr)`
					}}>
					{Object.keys(data).map((weatherKey, key) => (
						<li key={key}>
							<span className="uppercase opacity-40">
								{daytimeLabel[weatherKey as DaytimeType]}
							</span>

							<ul className="flex gap-4 mt-4">
								{data[weatherKey as DaytimeType]?.map((weather, key) => (
									<li
										key={key}
										className="flex flex-col gap-[48px]">
										<div className="w-[40px] aspect-square">
											<WeatherAnimation animationData={weather.weather[0].icon as WeatherAnimationDataType} />
										</div>

										<div className="flex flex-col">
											<strong className="mt-1 font-semibold">
												{(weather.main.temp > 0) && "+"}{weather.main.temp.toFixed(0)}º
											</strong>

											<span className="text-sm opacity-80">
												{format(new Date(weather.dt_txt), "HH:mm")}
											</span>
										</div>
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>

				<div className="absolute z-0 top-[110px] -inset-x-1 opacity-60">
					<ResponsiveContainer width="100%" height={120}>
						<AreaChart data={(chartData.length > 1) ? chartData : constantChartData}>
							<defs>
								<linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#7760B9" stopOpacity={0.8} />
									<stop offset="95%" stopColor="#7760B9" stopOpacity={0} />
								</linearGradient>
							</defs>

							<Area
								type="monotone"
								dataKey="main.temp"
								stroke="#8884d8"
								fillOpacity={1}
								fill="url(#chartColor)" />

							<YAxis domain={["dataMin-35", "dataMax"]} hide />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}

export default TodayChart;