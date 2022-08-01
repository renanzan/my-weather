import { NextComponentType } from "next";
import clsx from "clsx";
import { format } from "date-fns";
import { AreaChart, Area, YAxis, ResponsiveContainer } from 'recharts';

import { DaytimeType } from "context/useWeather/types";
import { OpenWeatherForecastListDataType } from "@openWeather/types";
import WeatherAnimation, { WeatherAnimationDataType } from "components/Animation/WeatherAnimation";
import { useWeather } from "context/useWeather";
import { ChartSkeleton } from "components/Skeleton";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

const daytimeLabel: { [key in keyof DaytimeType]: string } = {
	night: "Noite",
	morning: "Manhã",
	day: "Dia",
	afternoon: "Tarde"
}

const TodayChart: NextComponentType<{}, {}, Props> = ({ className, ...rest }) => {
	const { getWeatherByDay, selectedDate, loading } = useWeather();

	const data = getWeatherByDay(selectedDate.getDate());

	if (loading)
		return (
			<div className="w-[500px] h-[220px] mt-10 p-4 bg-white/[20%] opacity-50 backdrop-blur-md rounded-md">
				<ChartSkeleton />
			</div>
		);

	if (!data)
		return (
			<div className="relative w-[500px] h-[220px] mt-10 p-4">
				<div className="bg-gray-200 opacity-30 w-full h-full rounded-md" />

				<div className="absolute flex items-center justify-center inset-0 bg-black/[50%] backdrop-blur-md rounded-md font-medium text-sm text-red-400">
					Falha ao carregar dados do clima
				</div>
			</div>
		);

	const { daytime, chartData } = data;

	const constantChartData = [{ main: { temp: 20 } }, { main: { temp: 20 } }];

	return (
		<div className={clsx("bg-white/[10%] backdrop-blur-md rounded-md w-fit max-w-full overflow-y-hidden overflow-x-auto custom-scroolbar", className)} {...rest}>
			<div className="relative w-fit h-fit p-6 select-none">
				<ul
					className="relative z-10 grid gap-4"
					style={{
						gridTemplateColumns: `repeat(4, 1fr)`
					}}>
					{Object.keys(daytime).map((daytimeKey, key) => (
						<li key={key}>
							<span className="uppercase opacity-40">
								{daytimeLabel[daytimeKey as keyof DaytimeType]}
							</span>

							<ul className="flex gap-4 mt-4">
								{Object.values(daytime[daytimeKey as keyof DaytimeType])?.map((weather, key) => (
									<li
										key={key}
										className="flex flex-col gap-[48px]">

										<div className="w-[40px] aspect-square">
											{weather ? (
												<WeatherAnimation animationData={weather.weather[0].icon as WeatherAnimationDataType} />
											) : (
												<div className="bg-gray-200/[50%] h-max aspect-square rounded-full m-1" />
											)}
										</div>

										<div className="flex flex-col">
											{weather ? (
												<strong className="mt-1 font-semibold">
													{(weather.main.temp > 0) && "+"}{weather.main.temp.toFixed(0)}º
												</strong>
											) : (
												<strong className="mt-1 font-semibold">-</strong>
											)}

											<span className="text-sm opacity-80">
												{format(
													new Date(0, 0, 0,
														Number(Object.keys(daytime[daytimeKey as keyof DaytimeType])[key])
													), "HH:mm"
												)}
											</span>
										</div>
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>

				<div className="absolute inset-x-0 h-[120px] overflow-hidden z-0 top-[110px] opacity-60">
					<div className="absolute -inset-x-1 h-[120px] z-0">
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
		</div>
	);
}

export default TodayChart;