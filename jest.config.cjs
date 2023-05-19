module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.css$',
    '\\.scss$',
    '\\.module.scss$',
    '\\.module.css$',
  ],
  testMatch: ['<rootDir>/src/tests/**/*.test.(ts|tsx)', '<rootDir>/src/tests/**/*.spec.(ts|tsx)'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
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
