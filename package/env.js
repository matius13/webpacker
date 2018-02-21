const { resolve } = require('path')
const { safeLoad } = require('js-yaml')
const { readFileSync } = require('fs')

const configPath = resolve('config', 'webpacker.yml')
const DEFAULT_ENV = 'production'

const env = () => {
  const nodeEnv = process.env.NODE_ENV
  const config = safeLoad(readFileSync(configPath), 'utf8')
  const availableEnvironments = Object.keys(config).join('|')

  if (!nodeEnv) {
    throw new Error(`
    Using 'webpacker' requires that you specify 'NODE_ENV' environment variables.
    Valid values are ${availableEnvironments}. Instead, received: ${nodeEnv}`)
  }

  const regex = new RegExp(availableEnvironments, 'g')
  if (nodeEnv.match(regex)) return nodeEnv

  /* eslint no-console: 0 */
  console.warn(`${nodeEnv} environment is not defined in config/webpacker.yml, falling back to ${DEFAULT_ENV}`)
  return DEFAULT_ENV
}

module.exports = env()
