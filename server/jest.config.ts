import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  silent: true,
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  testPathIgnorePatterns: ['dist/']
}

export default config
