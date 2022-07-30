export type OpenCageGeolocationDataType = {
	bounds: {
		northeast: { lat: number; lng: number; };
		southwest: { lat: number; lng: number; };
	};
	components: {
		continent: string;
		country: string;
		country_code: string;
		municipality: string;
		neighbourhood: string;
		postcode: string;
		region: string;
		road: string;
		road_reference: string;
		road_type: string;
		state: string;
		state_code: string;
		state_district: string;
		town: string;
	};
	formatted: string;
	geometry: { lat: number; lng: number; };
}