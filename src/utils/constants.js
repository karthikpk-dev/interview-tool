/**
 * Application Constants
 * Shared constants used across the application
 */

export const CONSOLE_TYPES = {
  LOG: 'log',
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
}

export const CONSOLE_PREFIXES = {
  [CONSOLE_TYPES.ERROR]: '❌ Error: ',
  [CONSOLE_TYPES.WARN]: '⚠️  Warning: ',
  [CONSOLE_TYPES.INFO]: 'ℹ️  Info: ',
}

export const EXECUTION_TYPES = {
  BROWSER: 'browser',
  JDOODLE: 'jdoodle',
}

