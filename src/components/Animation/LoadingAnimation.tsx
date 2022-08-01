import { NextComponentType } from "next";
import React from "react";
import Lottie from "react-lottie";

import * as animationData from "@public/assets/animations/loading.json";

const LoadingAnimation: NextComponentType = () => (
	<Lottie
		isClickToPauseDisabled
		style={{ cursor: "default" }}
		options={{
			loop: true,
			autoplay: true,
			animationData,
			rendererSettings: {
				preserveAspectRatio: "xMidYMid slice"
			}
		}} />
);

export default LoadingAnimation;