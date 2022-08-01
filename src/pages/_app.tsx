import { Fragment } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import GeolocationContextWapper from "context/useGeolocation";
import WeatherContextWapper from "context/useWeather";

import "react-toastify/dist/ReactToastify.css";
import "styles/global.css";

function App({ Component, pageProps }: AppProps) {
	return (
		<Fragment>
			<Head>
				<title>My Weather</title>
			</Head>

			<GeolocationContextWapper>
				<WeatherContextWapper>
					<Component {...pageProps} />
				</WeatherContextWapper>
			</GeolocationContextWapper>

			<ToastContainer position="bottom-right" />
		</Fragment>
	);
}

export default App;
