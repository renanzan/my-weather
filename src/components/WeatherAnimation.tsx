import { NextComponentType } from "next";
import React from "react";
import Lottie from "react-lottie";

// Animações por Adriana Mandjarova
// https://lottiefiles.com/d264bhmrid6j0w1s

export const weatherAnimationData = {
	"01d": require("@public/assets/animations/weather/day/clear-sky.json"),
	"02d": require("@public/assets/animations/weather/day/few-clouds.json"),
	"03d": require("@public/assets/animations/weather/day/scattered-clouds.json"),
	"04d": require("@public/assets/animations/weather/day/broken-clouds.json"),
	"09d": require("@public/assets/animations/weather/day/shower-rains.json"),
	"10d": require("@public/assets/animations/weather/day/rain.json"),
	"11d": require("@public/assets/animations/weather/day/thunderstorm.json"),
	"13d": require("@public/assets/animations/weather/day/snow.json"),
	"50d": require("@public/assets/animations/weather/day/mist.json"),
	"01n": require("@public/assets/animations/weather/night/clear-sky.json"),
	"02n": require("@public/assets/animations/weather/night/few-clouds.json"),
	"03n": require("@public/assets/animations/weather/night/scattered-clouds.json"),
	"04n": require("@public/assets/animations/weather/night/broken-clouds.json"),
	"09n": require("@public/assets/animations/weather/night/shower-rains.json"),
	"10n": require("@public/assets/animations/weather/night/rain.json"),
	"11n": require("@public/assets/animations/weather/night/thunderstorm.json"),
	"12n": require("@public/assets/animations/weather/night/snow.json"),
	"50n": require("@public/assets/animations/weather/night/mist.json"),
}

export type WeatherAnimationDataType = keyof typeof weatherAnimationData;

type Props = {
	animationData: WeatherAnimationDataType;
}

const WeatherAnimation: NextComponentType<{}, {}, Props> = ({ animationData }: Props) => (
	<Lottie
		isClickToPauseDisabled
		style={{ cursor: "default" }}
		options={{
			loop: true,
			autoplay: true,
			animationData: weatherAnimationData[animationData],
			rendererSettings: {
				preserveAspectRatio: "xMidYMid slice"
			}
		}} />
);

export default WeatherAnimation;