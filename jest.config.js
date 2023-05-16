module.exports = {
  collectCoverage: true,
  verbose: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/emptyModule.js',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.css$',
    '\\.scss$',
    '\\.module.scss$',
    '\\.module.css$',
  ],
  testMatch: ['<rootDir>/src/tests/*.test.[jt]s?(x)', '<rootDir>/src/tests/*.spec.[jt]s?(x)'],
  coverageReporters: ['lcov', 'text-summary'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
