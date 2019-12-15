const esModules = ['@ionic'].join('|');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '!**/src/*',
    '!**/src/**/*.module.ts',
    '!**/src/shared/**/index.ts',
    '!**/assets/**',
    '!**/src/main.ts',
    '!**/src/environments/**',
    '!**/src/shared/models/**',
    '!**/src/shared/enums/**',
    '!**/src/test-base-ext/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov'],
  globals: {
    'ts-jest': {
      babelConfig: {
        presets: [['@babel/preset-env', { targets: { node: true }, modules: 'commonjs' }]],
        plugins: ['@babel/plugin-syntax-dynamic-import']
      }, stringifyContentPathRegex: '\\.html$', tsConfig: '<rootDir>/src/tsconfig.spec.json'
    }
  },
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'jest-preset-angular',
  reporters: [
    "default",
    [
      "jest-trx-results-processor",
      {
        "outputFile": "results.trx"
      }
    ]
  ],
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupJest.ts',
    '<rootDir>/node_modules/@angular-builders/jest/dist/jest-config/setup.js'
  ],
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ],
  testURL: 'http://localhost',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/www',
    '<rootDir>/src/environments/environment.dev.ts',
    '<rootDir>/src/environments/environment.test.ts',
    '<rootDir>/src/app/*.{js}'
  ],
  transform: {
    '^.+\\.ts?$': '<rootDir>/node_modules/ts-jest'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@angular|@ionic|@ionic-native)',
    `<rootDir>/node_modules/(?!${esModules})`
  ],
  verbose: true
};
