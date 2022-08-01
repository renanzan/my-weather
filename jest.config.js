module.exports = {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
	moduleDirectories: ["node_modules", "src"],
	moduleNameMapper: {
		"\\.svg$": "<rootDir>/src/__mocks__/svg.js",
	},
}