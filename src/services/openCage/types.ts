export type OpenCageGeolocationAnnotationsDataType = {
	DMS: {
		lat: string;
		lng: string;
	},
	MGRS: string;
	Maidenhead: string;
	Mercator: {
		x: number;
		y: number;
	},
	OSM: {
		edit_url: string;
		note_url: string;
		url: string;
	},
	UN_M49: {
		regions: {
			AMERICAS: string;
			BR: string;
			LATIN_AMERICA: string;
			SOUTH_AMERICA: string;
			WORLD: string;
		},
		statistical_groupings: Array<string>;
	},
	callingcode: number;
	currency: {
		decimal_mark: string;
		html_entity: string;
		iso_code: string;
		iso_numeric: string;
		name: string;
		smallest_denomination: number;
		subunit: string;
		subunit_to_unit: number;
		symbol: string;
		symbol_first: number;
		thousands_separator: string;
	},
	flag: string;
	geohash: string;
	qibla: number;
	roadinfo: {
		drive_on: string;
		road: string;
		road_type: string;
		speed_in: string;
	},
	sun: {
		rise: {
			apparent: number;
			astronomical: number;
			civil: number;
			nautical: number;
		},
		set: {
			apparent: number;
			astronomical: number;
			civil: number;
			nautical: number;
		}
	},
	timezone: {
		name: string;
		now_in_dst: number;
		offset_sec: number;
		offset_string: string;
		short_name: string;
	},
	what3words: {
		words: string;
	}
};

export type OpenCageGeolocationComponentsDataType = {
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

export type OpenCageGeolocationDataType = {
	annotations: OpenCageGeolocationAnnotationsDataType;
	bounds: {
		northeast: { lat: number; lng: number; };
		southwest: { lat: number; lng: number; };
	};
	components: OpenCageGeolocationComponentsDataType;
	formatted: string;
	geometry: { lat: number; lng: number; };
}