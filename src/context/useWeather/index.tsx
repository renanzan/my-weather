import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { add } from "date-fns";

import { getForecast, getWeatherNow } from "@openWeather";
import { OpenWeatherDataType, OpenWeatherForecastDataType, OpenWeatherForecastListDataType } from "@openWeather/types";

import * as T from "./types";
import { NextComponentType } from "next";
import { useGeolocation } from "context/useGeolocation";

export const LOCALSTORAGE_WEATHER_KEY = "@my-weather/weather-data";
export const LOCALSTORAGE_WEATHER_REQUEST_TIME_KEY = "@my-weather/weather-data-request-time";
export const LOCALSTORAGE_FORECAST_KEY = "@my-weather/forecast-data";
export const LOCALSTORAGE_FORECAST_REQUEST_TIME_KEY = "@my-weather/forecast-data-request-time";

const WeatherContext = createContext<T.ContextProps>({} as T.ContextProps);
export const useWeather = () => useContext(WeatherContext);

const WeatherContextWapper: NextComponentType<{}, {}, T.Props> = ({ children }) => {
	const { position } = useGeolocation();

	const [weather, setWeather] = useState<OpenWeatherDataType | undefined>(undefined);
	const [forecast, setForecast] = useState<OpenWeatherForecastDataType | undefined>(undefined);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	async function refreshWeather(latitude: number, longitude: number): Promise<OpenWeatherDataType | undefined> {
		try {
			const { data } = await getWeatherNow(latitude, longitude);
			const now = new Date();

			setWeather(data);
			localStorage.setItem(LOCALSTORAGE_WEATHER_KEY, JSON.stringify(data));
			localStorage.setItem(LOCALSTORAGE_WEATHER_REQUEST_TIME_KEY, now.toISOString());

			return data;
		} catch (err) {
			console.error(err);
			toast.error("Falha ao coletar dados meteorológicos atuais.");
		}
	}

	async function refreshForecast(latitude: number, longitude: number): Promise<OpenWeatherForecastDataType | undefined> {
		try {
			const { data } = await getForecast(latitude, longitude);
			const now = new Date();

			setForecast(data);
			localStorage.setItem(LOCALSTORAGE_FORECAST_KEY, JSON.stringify(data));
			localStorage.setItem(LOCALSTORAGE_FORECAST_REQUEST_TIME_KEY, now.toISOString());

			return data;
		} catch (err) {
			console.error(err);
			toast.error("Falha ao coletar dados meteorológicos do período.");
		}
	}

	async function softRefreshWeather(latitude: number, longitude: number): Promise<OpenWeatherDataType | undefined> {
		const lsWeather = localStorage.getItem(LOCALSTORAGE_WEATHER_KEY);
		const lsWeatherRequestTime = localStorage.getItem(LOCALSTORAGE_WEATHER_REQUEST_TIME_KEY);

		if (lsWeather && lsWeatherRequestTime) {
			const now = new Date();
			const timeout = add(new Date(lsWeatherRequestTime), { minutes: 5 });

			if (now < timeout) {
				setWeather(JSON.parse(lsWeather));
				return JSON.parse(lsWeather);
			}
		}

		return refreshWeather(latitude, longitude);
	}

	async function softRefreshForecast(latitude: number, longitude: number): Promise<OpenWeatherForecastDataType | undefined> {
		const lsForecast = localStorage.getItem(LOCALSTORAGE_FORECAST_KEY);
		const lsForecastRequestTime = localStorage.getItem(LOCALSTORAGE_FORECAST_REQUEST_TIME_KEY);

		if (lsForecast && lsForecastRequestTime) {
			const now = new Date();
			const timeout = add(new Date(lsForecastRequestTime), { minutes: 15 });

			if (now < timeout) {
				setForecast(JSON.parse(lsForecast));
				return JSON.parse(lsForecast);
			}
		}

		return refreshForecast(latitude, longitude);
	}

	function getWeatherByDay(day: number) {
		const daytime: T.DaytimeType = {
			night: {
				0: null,
				3: null
			},
			morning: {
				6: null,
				9: null
			},
			day: {
				12: null,
				15: null
			},
			afternoon: {
				18: null,
				21: null
			}
		};

		const chartData: Array<OpenWeatherForecastListDataType> = [];

		if (!forecast)
			return;

		forecast.list.map(x => {
			const date = new Date(x.dt_txt);
			const hours = date.getHours();

			if (day !== date.getDate())
				return;

			chartData.push(x);

			if (hours >= 0 && hours < 6)
				return daytime.night[hours as T.DaytimeTypeNight] = x;

			if (hours >= 6 && hours < 12)
				return daytime.morning[hours as T.DaytimeTypeMorning] = x;

			if (hours >= 12 && hours < 18)
				return daytime.day[hours as T.DaytimeTypeDay] = x;

			return daytime.afternoon[hours as T.DaytimeTypeAfternoon] = x;
		});

		return {
			daytime,
			chartData
		};
	}

	function getDaysWeather() {
		const blackList: Array<Number> = [];
		const days: Array<OpenWeatherForecastListDataType> = [];

		if (!forecast)
			return;

		forecast.list.map(x => {
			const date = new Date(x.dt_txt).getDate();

			if (!blackList.includes(date)) {
				blackList.push(date);
				days.push(x);
			}
		});

		return days;
	}

	useEffect(() => {
		if (!position?.latitude || !position?.longitude)
			return;

		const { latitude, longitude } = position;

		softRefreshWeather(latitude, longitude);
		softRefreshForecast(latitude, longitude);
	}, [position]);

	const value: T.ContextProps = {
		weather,
		forecast,
		selectedDate,
		setSelectedDate,
		getWeatherByDay,
		getDaysWeather,
		refreshWeather,
		softRefreshWeather,
		refreshForecast,
		softRefreshForecast
	};

	return (
		<WeatherContext.Provider value={value}>
			{children}
		</WeatherContext.Provider>
	);
}

export default WeatherContextWapper;