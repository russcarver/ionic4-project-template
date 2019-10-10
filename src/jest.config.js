const esModules = ['@ionic'].join('|');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '!**/src/*',
    '!**/src/**/*.module.ts',
    '!**/src/shared/**/index.ts',
    '!**/main.ts',
    '!**/assets/**',
    '!**/src/environments/environment.*',
    '!**/src/test-base-ext/**'
  ],
  coverageDirectory: 'coverage',
  globals: {
    'ts-jest': {
      astTransformers: [require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer')],
      stringifyContentPathRegex: '\\.html$',
      tsConfig: '<rootDir>/src/tsconfig.spec.json'
    }
  },
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'jest-preset-angular',
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
    '<rootDir/www',
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
