import { OpenCageGeolocationDataType } from "services/openCage/types";

export type PositionType = {
	readonly accuracy: number;
	readonly latitude: number;
	readonly longitude: number;
}

export type DayPeriodType = "day" | "night";

export type ContextProps = {
	position?: PositionType;
	geoData?: OpenCageGeolocationDataType;
	status?: PermissionState;
	dayPeriod: DayPeriodType;
	checkGeolocationAvailable: () => boolean;
	getPosition: () => Promise<PositionType>;
}

export type Props = {
	fallbackAvailable?: () => void;
	children: React.ReactNode;
}