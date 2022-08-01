import { OpenWeatherDataType, OpenWeatherForecastDataType, OpenWeatherForecastListDataType } from "@openWeather/types";
import { Dispatch, SetStateAction } from "react";

export type PositionType = {
	readonly accuracy: number;
	readonly latitude: number;
	readonly longitude: number;
}

export type DaytimeTypeNight = 0 | 3;
export type DaytimeTypeMorning = 6 | 9;
export type DaytimeTypeDay = 12 | 15;
export type DaytimeTypeAfternoon = 18 | 21;

export type DaytimeType = {
	night: {
		[key in DaytimeTypeNight]: OpenWeatherForecastListDataType | null;
	},
	morning: {
		[key in DaytimeTypeMorning]: OpenWeatherForecastListDataType | null;
	}, day: {
		[key in DaytimeTypeDay]: OpenWeatherForecastListDataType | null;
	}, afternoon: {
		[key in DaytimeTypeAfternoon]: OpenWeatherForecastListDataType | null;
	}
};

export type Props = {
	latitude?: number;
	longitude?: number;
	children?: React.ReactNode;
}

export type ContextProps = {
	weather?: OpenWeatherDataType;
	forecast?: OpenWeatherForecastDataType;
	selectedDate: Date;
	loading: boolean;
	setSelectedDate: Dispatch<SetStateAction<Date>>;
	getWeatherByDay: (day: number) => ({
		daytime: DaytimeType;
		chartData: Array<OpenWeatherForecastListDataType>;
	} | undefined);
	getDaysWeather: () => Array<OpenWeatherForecastListDataType> | undefined;
	refreshWeather: (latitude: number, longitude: number) => Promise<OpenWeatherDataType | undefined>;
	softRefreshWeather: (latitude: number, longitude: number) => Promise<OpenWeatherDataType | undefined>;
	refreshForecast: (latitude: number, longitude: number) => Promise<OpenWeatherForecastDataType | undefined>;
	softRefreshForecast: (latitude: number, longitude: number) => Promise<OpenWeatherForecastDataType | undefined>;
}