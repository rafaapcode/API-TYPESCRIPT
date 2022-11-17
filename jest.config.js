module.exports = {
  roots: ['<rootDir/src>'],
  collectCoverageFrom: ['<rootDir/src /**/*.ts / .js>'],
  coverageDirectory: 'coverage',
  testEnviroment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
