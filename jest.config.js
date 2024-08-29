module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest-setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/android/",
    "/ios/",
    "/web/"
  ],
};
