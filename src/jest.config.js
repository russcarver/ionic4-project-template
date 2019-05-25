const esModules = ['@ionic'].join('|');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts', '!**/src/*', '!**/src/**/*.module.ts', '!**/src/shared/**/index.ts', '!**/app/main.ts', '!**/assets/**', '!**/src/environments/environment.*'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov'],
  globals: {
    'ts-jest': {
      babelConfig: {
        presets: [['@babel/preset-env', { targets: { node: true }, modules: 'commonjs' }]], plugins: ['@babel/plugin-syntax-dynamic-import']
      }
    }
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts'],
  testURL: 'http://localhost',
  testPathIgnorePatterns: ['<rootDir>/src/environments/environment.test.ts'],
  transform: {
    '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@angular|@ionic|@ionic-native)', `<rootDir>/node_modules/(?!${esModules})`],
  verbose: true
};
