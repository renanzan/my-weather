import { getWeatherNow } from "@openWeather";
import type { NextPage } from "next";

import useGeolocation from "hooks/useGeolocation";
import { useEffect } from "react";
import useWeather from "hooks/useWeather";

const Home: NextPage = () => {
	const { position, geoData, status } = useGeolocation();
	const { weather } = useWeather({ latitude: position?.latitude, longitude: position?.longitude });

	async function handleTeste() {
		console.log("handleTeste...");

		if (!position)
			return;

		console.log("get weather");

		const { data } = await getWeatherNow(position.latitude, position.longitude);

		console.log({ data });
	}

	return (
		<div>
			Hello World<br /><br />

			<button onClick={handleTeste}>
				Teste
			</button>

			<strong>{JSON.stringify(weather)}</strong>
		</div>
	)
}

export default Home;