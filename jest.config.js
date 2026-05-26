module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/unit/**/*.test.ts"],
  moduleDirectories: ["node_modules", "<rootDir>"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/tests/e2e/",
    "/tests/.*\\.spec\\.ts$",
  ],
};
