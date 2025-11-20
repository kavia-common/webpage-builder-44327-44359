//
// Lightweight config that safely reads VITE_* envs and provides defaults
//
const env = import.meta?.env || {}

/**
 * PUBLIC_INTERFACE
 * getConfig
 * Returns current configuration for optional API integration. Never throws if envs are missing.
 */
export function getConfig() {
  return {
    // Optional backends/placeholders
    apiBase: env.VITE_API_BASE || env.VITE_BACKEND_URL || '',
    wsUrl: env.VITE_WS_URL || '',
    frontendUrl: env.VITE_FRONTEND_URL || '',
    nodeEnv: env.VITE_NODE_ENV || env.MODE || 'development',
    featureFlags: env.VITE_FEATURE_FLAGS || '',
    experimentsEnabled: env.VITE_EXPERIMENTS_ENABLED === 'true',
  }
}
