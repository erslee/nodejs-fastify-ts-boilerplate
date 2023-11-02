import 'dotenv-safe/config'

export function getConfigValue(value: string, defaultValue?: string) {
  const configValue = process.env[value]

  if (configValue) return configValue
  if (defaultValue) return defaultValue

  throw new Error(`Config value ${value} is not defined`)
}

export const environment = getConfigValue('NODE_ENV', 'development')
