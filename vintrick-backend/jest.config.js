// vintrick-backend/jest.config.js

/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  transform: {}, // ESM mode: disable Babel/transpile unless needed
  extensionsToTreatAsEsm: ['.js'],
  moduleNameMapper: {
    "^(\.{1,2}/.*)\.js$": "$1"
  }
};
