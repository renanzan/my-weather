import axios from "axios";

import { OpenCageGeolocationDataType } from "./types";

const api = axios.create({
	baseURL: "https://api.opencagedata.com/geocode/v1/",
	params: {
		key: process.env.NEXT_PUBLIC_OPENCAGE_KEY,
		pretty: 1,
		no_annotations: 1,
		language: "pt"
	}
});

export function getGeolocationData(latitude: number, longitude: number): Promise<{ data: OpenCageGeolocationDataType }> {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await api.get("json", {
				params: {
					q: `${latitude},${longitude}`
				}
			});

			if (data?.status?.code !== 200)
				return reject({ data });

			resolve({ data: data.results[0] });
		} catch (err) {
			reject(err);
		}
	});
}