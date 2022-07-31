import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { add } from "date-fns";

import { OpenCageGeolocationDataType } from "services/openCage/types";
import { getGeolocationData } from "services/openCage";

export type PositionType = {
	readonly accuracy: number;
	readonly latitude: number;
	readonly longitude: number;
}

interface Props {
	fallbackAvailable?: () => void;
}

export type DayPeriodType = "day" | "night";

export const LOCALSTORAGE_POSITION_KEY = "@my-weather/position";
export const LOCALSTORAGE_GEOLOCATION_DATA_KEY = "@my-weather/geolocation-data";
export const LOCALSTORAGE_GEOLOCATION_REQUEST_TIME_KEY = "@my-weather/geolocation-data-request-time";

const useGeolocation = (props?: Props) => {
	const {
		fallbackAvailable
	} = props || {};

	const [now, setNow] = useState(new Date());
	const [dayPeriod, setDayPeriod] = useState<DayPeriodType>((now.getHours() >= 6 && now.getHours() < 18) ? "day" : "night");
	const [status, setStatus] = useState<PermissionState | undefined>(undefined);
	const [position, setPosition] = useState<PositionType | undefined>(undefined);
	const [geoData, setGeoData] = useState<OpenCageGeolocationDataType | undefined>(undefined);

	const checkGeolocationAvailable = () => "geolocation" in navigator;

	const getPosition = (): Promise<PositionType> => new Promise((resolve) => {
		navigator.geolocation.getCurrentPosition(({ coords: { accuracy, latitude, longitude } }: GeolocationPosition) => {
			const currentPosition = { accuracy, latitude, longitude };

			resolve({ accuracy, latitude, longitude });

			localStorage.setItem(LOCALSTORAGE_POSITION_KEY, JSON.stringify(currentPosition));
		});
	});

	useEffect(() => {
		if (!checkGeolocationAvailable()) {
			if (typeof fallbackAvailable === "function")
				fallbackAvailable();

			return;
		}

		navigator.permissions.query({ name: 'geolocation' }).then(async ({ state, onchange }) => {
			setStatus(state);

			if (state === "granted")
				setPosition(await getPosition());

			onchange = async () => {
				setStatus(state);

				if (state === "granted")
					return setPosition(await getPosition());

				setPosition(undefined);
			}
		});
	}, []);

	useEffect(() => {
		async function updateGeolocationData() {
			if (!position)
				return;

			const lsPosition = localStorage.getItem(LOCALSTORAGE_POSITION_KEY);
			const lsGeolocationData = localStorage.getItem(LOCALSTORAGE_GEOLOCATION_DATA_KEY);
			const lsRequestTime = localStorage.getItem(LOCALSTORAGE_GEOLOCATION_REQUEST_TIME_KEY);

			// Checa se geolocalização não mudou e se os dados para a posição já exisem
			//	Objetivo: Poupar chamadas desnecessárias na api
			if (JSON.stringify(position) === lsPosition && lsGeolocationData)
				return setGeoData(JSON.parse(lsGeolocationData));

			// Limitação de tempo para evitar chamadas desnecessárias na api
			if (lsRequestTime && lsGeolocationData) {
				const now = new Date();
				const timeout = add(new Date(lsRequestTime), { hours: 1 });

				if (now < timeout)
					return setGeoData(JSON.parse(lsGeolocationData));
			}

			try {
				const { data } = await getGeolocationData(position.latitude, position.longitude);
				const now = new Date();

				setGeoData(data);
				localStorage.setItem(LOCALSTORAGE_GEOLOCATION_DATA_KEY, JSON.stringify(data));
				localStorage.setItem(LOCALSTORAGE_GEOLOCATION_REQUEST_TIME_KEY, now.toISOString());
			} catch (err) {
				console.error(err);
				toast.error("Falha ao coletar dados da sua geolocalização atual.");
			}
		};

		updateGeolocationData();
	}, [position]);

	return {
		position,
		geoData,
		status,
		now,
		dayPeriod,
		checkGeolocationAvailable,
		getPosition
	};
}

export default useGeolocation;