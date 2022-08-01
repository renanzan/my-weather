module.exports = {
	presets: ["next/babel"],
	env: {
		production: {
			plugins: [
				["react-remove-properties", { properties: ["data-testid"] }],
				["transform-remove-console", { exclude: ["error", "warn"] }]
			]
		}
	}
};