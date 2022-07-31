import { NextComponentType } from "next";

import DayClearSky from "@public/assets/icons/weather/day/clear-sky.svg";
import DayFewCloudsSky from "@public/assets/icons/weather/day/few-clouds.svg";
import DayScatteredCloudsSky from "@public/assets/icons/weather/day/scattered-clouds.svg";
import DayBrokenClouds from "@public/assets/icons/weather/day/broken-clouds.svg";
import DayShowerRains from "@public/assets/icons/weather/day/shower-rains.svg";
import DayRain from "@public/assets/icons/weather/day/rain.svg";
import DayThunderstorm from "@public/assets/icons/weather/day/thunderstorm.svg";
import DaySnow from "@public/assets/icons/weather/day/snow.svg";
import DayMist from "@public/assets/icons/weather/day/mist.svg";

import NightClearSky from "@public/assets/icons/weather/night/clear-sky.svg";
import NightFewCloudsSky from "@public/assets/icons/weather/night/few-clouds.svg";
import NightScatteredCloudSky from "@public/assets/icons/weather/night/scattered-clouds.svg";
import NightBrokenClouds from "@public/assets/icons/weather/night/broken-clouds.svg";
import NightShowerRains from "@public/assets/icons/weather/night/shower-rains.svg";
import NightRain from "@public/assets/icons/weather/night/rain.svg";
import NightThunderstorm from "@public/assets/icons/weather/night/thunderstorm.svg";
import NightSnow from "@public/assets/icons/weather/night/snow.svg";
import NightMist from "@public/assets/icons/weather/night/mist.svg";

export const WeatherIcons = {
	"01d": DayClearSky,
	"02d": DayFewCloudsSky,
	"03d": DayScatteredCloudsSky,
	"04d": DayBrokenClouds,
	"09d": DayShowerRains,
	"10d": DayRain,
	"11d": DayThunderstorm,
	"13d": DaySnow,
	"50d": DayMist,
	"01n": NightClearSky,
	"02n": NightFewCloudsSky,
	"03n": NightScatteredCloudSky,
	"04n": NightBrokenClouds,
	"09n": NightShowerRains,
	"10n": NightRain,
	"11n": NightThunderstorm,
	"12n": NightSnow,
	"50n": NightMist
}

export type WeatherIconDataType = keyof typeof WeatherIcons;

interface Props extends React.HTMLAttributes<HTMLOrSVGElement> {
	icon: WeatherIconDataType;
}

const WeatherIcon: NextComponentType<{}, {}, Props> = ({ icon, ...rest }) => {
	const Icon = WeatherIcons[icon];

	return <Icon {...rest} />;
};

export default WeatherIcon;