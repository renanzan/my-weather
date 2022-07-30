import { OpenWeatherForecastListDataType, OpenWeatherForecastDataType } from '@openWeather/types';
import { LineChart, Line, Tooltip, XAxis, YAxis, ResponsiveContainer, TooltipProps } from 'recharts';
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import ptBR from "date-fns/locale/pt-BR";
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

import WeatherAnimation, { WeatherAnimationDataType } from 'components/WeatherAnimation';

type CustomPayloadProps = TooltipProps<ValueType, NameType> | Readonly<TooltipProps<ValueType, NameType>>;

const CustomPayload: React.FC<CustomPayloadProps> = ({ active, label, payload: [payload] = [] }) => {
	const data = payload?.payload as OpenWeatherForecastListDataType;

	return (
		<AnimatePresence initial>
			{(active && data) && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="flex flex-col p-4 rounded-md shadow-md bg-gray-800 text-xs text-gray-400 text-center">
					<strong className="text-sm">{format(new Date(data.dt_txt), "dd' de 'MMM' de 'yyyy' - 'hh'h'", { locale: ptBR })}</strong>

					<div className="flex flex-col items-center my-2 text-lg text-gray-200 font-semibold">
						<div className="w-[50px] aspect-square">
							<WeatherAnimation animationData={data.weather[0].icon as WeatherAnimationDataType} />
						</div>

						<span>{data.main.temp.toFixed(0)} ºC</span>
					</div>

					<span className="capitalize">{data.weather[0].description}</span>
					<span>Sensação térmica {data.main.feels_like.toFixed(0)}º</span>
					<span>Min {data.main.temp_min.toFixed(0)}º | Max {data.main.temp_max.toFixed(0)}º</span>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

type Props = {
	forecast?: OpenWeatherForecastDataType;
	perDay?: boolean;
}

export default function TemperatureChart({ forecast, perDay }: Props) {

	if (!forecast)
		return (
			<span>Empty data!</span>
		);

	return (
		<ResponsiveContainer width="100%" height={400}>
			<LineChart data={forecast.list.filter(x => (!perDay) || new Date(x.dt_txt).getHours() === 0)}>
				<Line type="monotone" dataKey="main.temp" stroke="#8884d8" />

				<YAxis
					dataKey="main.temp"
					tickFormatter={temp => `${Number(temp).toFixed(0)} ºC`}
					tick={{ fontSize: "12px" }}
					domain={["dataMin-0.5", "dataMax+0.5"]}
					offset="1" />

				<XAxis
					dataKey="dt_txt"
					interval="preserveStartEnd"
					tickFormatter={date => format(new Date(date), "dd/MM/yyyy")}
					tick={{ fontSize: "12px" }} />

				<Tooltip content={CustomPayload} />
			</LineChart>
		</ResponsiveContainer>
	);
}