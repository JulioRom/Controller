import * as EnvironmentGuard from "./EnvionmentGuard"

export const NODE_ENV = EnvironmentGuard.NODE_ENV(process.env.NODE_ENV)
export const isDevelopment = NODE_ENV === 'development'
export const isProduction = NODE_ENV === 'production'

