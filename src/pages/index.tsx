import type { NextPage } from "next";
import dynamic from "next/dynamic";

import Layout from "components/Layout";
import { useGeolocation } from "context/useGeolocation";
import { useWeather } from "context/useWeather";
import clsx from "clsx";
import { ChartSkeleton } from "components/Skeleton";
import DaysChart from "components/Charts/DaysChart";
import LoadingAnimation from "components/Animation/LoadingAnimation";
import WeatherInfo from "components/WeatherInfo";

const DynamicTodayChart = dynamic(
	import('../components/Charts/TodayChart'),
	{
		loading: () => (
			<div className="w-[500px] h-[220px] mt-10 p-4 bg-white/[20%] opacity-50 backdrop-blur-md rounded-md">
				<ChartSkeleton />
			</div>
		),
		ssr: false
	},
);

const Home: NextPage = () => {
	const { geoData, dayPeriod } = useGeolocation();
	const { weather } = useWeather();

	if (!weather || !geoData)
		return (
			<Layout>
				<div className="absolute flex items-center justify-center inset-0 pb-[250px]">
					<div className="h-[150px] aspect-square">
						<LoadingAnimation />
					</div>
				</div>
			</Layout>
		);

	return (
		<Layout
			className="px-4 flex flex-col md:justify-end md:h-full"
			bgImage={(dayPeriod === "day") ? "/assets/images/day-background.png" : "/assets/images/night-background.png"}>

			<div className="flex flex-col items-center lg:flex-row md:justify-center">
				<WeatherInfo />

				<DynamicTodayChart className="mt-10" />
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
							<DaysChart />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Home;