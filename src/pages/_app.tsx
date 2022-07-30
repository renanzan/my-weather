import type { AppProps } from "next/app";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "styles/global.css";

function App({ Component, pageProps }: AppProps) {
	return (
		<Fragment>
			<Component {...pageProps} />

			<ToastContainer position="bottom-right" />
		</Fragment>
	);
}

export default App;
