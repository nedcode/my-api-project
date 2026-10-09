module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  transform: {
    '^.+\.ts$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }]
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts'
  ]
};
