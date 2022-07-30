import axios, { AxiosResponse } from "axios";

import { OpenWeatherDataType, OpenWeatherForecastDataType } from "./types";

const api = axios.create({
	baseURL: "https://api.openweathermap.org/data/2.5/",
	params: {
		appid: process.env.NEXT_PUBLIC_OPENWEATHER_APPID,
		lang: "pt_br",
		units: "metric"
	}
});

export function getWeatherNow(latitude: number, longitude: number): Promise<AxiosResponse<OpenWeatherDataType>> {
	return api.get("weather", {
		params: {
			lat: latitude,
			lon: longitude
		}
	});
}

export function getForecast(latitude: number, longitude: number): Promise<AxiosResponse<OpenWeatherForecastDataType>> {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await api.get("forecast", {
				params: {
					lat: latitude,
					lon: longitude
				}
			});

			if (res.data?.cod !== "200")
				return reject(res);

			return resolve(res);
		} catch (err) {
			reject(err);
		}
	});
}