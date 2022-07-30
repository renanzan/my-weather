import type { NextPage } from "next";

import useGeolocation from "hooks/useGeolocation";

const Home: NextPage = () => {
	const { position, geoData, status } = useGeolocation();

	return (
		<div>
			Hello World<br /><br />

			<strong>{JSON.stringify(geoData)}</strong>
		</div>
	)
}

export default Home;