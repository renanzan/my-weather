export const ChartSkeleton = () => (
	<div role="status" className="relative h-[400px] bg-gray-100 rounded animate-pulse">
		<div className="absolute inset-4 bottom-8 left-10 px-2 grid grid-cols-[repeat(12,_minmax(0,1fr))] gap-4 items-end">
			{[65, 82, 42, 33, 72, 54, 62, 84, 92, 67, 37, 44].map((height, key) => (
				<div key={key}
					className="relative z-10 bg-gray-200 rounded-t-sm"
					style={{ height: height + "%" }} />
			))}

			<div className="absolute grid grid-rows-[repeat(12,_1fr)] inset-0">
				{[...Array(12)].map((_, key) => (
					<span key={key} className="bg-gray-200 h-[1px] w-full" />
				))}
			</div>

			<div className="absolute inset-x-0 bottom-0 translate-y-[100%] grid grid-cols-[repeat(12,_1fr)] gap-4 border-t-[1px] border-solid border-gray-200 pt-2 px-2">
				{[...Array(12)].map((_, key) => (
					<span key={key} className="bg-gray-200 h-3 rounded-sm" />
				))}
			</div>

			<div className="absolute inset-y-0 top-[-5px] -left-6 grid grid-row-[repeat(12,_1fr)] border-solid border-gray-200">
				{[...Array(12)].map((_, key) => (
					<span key={key} className="bg-gray-200 w-4 h-3 rounded-sm" />
				))}
			</div>
		</div>

		<span className="sr-only">Loading...</span>
	</div>
);