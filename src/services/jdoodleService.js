/**
 * JDoodle API Service
 * Handles code execution via JDoodle API
 * 
 * ⚠️ SECURITY NOTE: For testing only!
 * In production, move credentials to backend
 */

// Use Vite proxy to avoid CORS issues in development
// In production, you'll need a backend proxy
const JDoodle_API_URL = import.meta.env.DEV 
  ? '/api/jdoodle'  // Use Vite proxy in development
  : 'https://api.jdoodle.com/v1/execute'  // Direct call (will fail due to CORS - needs backend)

// Get credentials from environment variables
// These will be exposed in the frontend bundle - OK for testing only!
const CLIENT_ID = import.meta.env.VITE_JDoodle_CLIENT_ID || ''
const CLIENT_SECRET = import.meta.env.VITE_JDoodle_CLIENT_SECRET || ''

// JDoodle language code mapping
const JDoodle_LANGUAGE_MAP = {
  python: { code: 'python3', versionIndex: '3' },
  java: { code: 'java', versionIndex: '3' },
  cpp: { code: 'cpp', versionIndex: '3' },
  c: { code: 'c', versionIndex: '3' },
  go: { code: 'go', versionIndex: '3' },
  rust: { code: 'rust', versionIndex: '3' },
  php: { code: 'php', versionIndex: '3' },
  ruby: { code: 'ruby', versionIndex: '3' },
  swift: { code: 'swift', versionIndex: '3' },
  kotlin: { code: 'kotlin', versionIndex: '3' },
}

/**
 * Execute code using JDoodle API
 * @param {string} code - Source code to execute
 * @param {string} language - Language key (e.g., 'python', 'java', 'cpp')
 * @param {string} stdin - Standard input (optional)
 * @returns {Promise<Object>} Execution result
 */
export const executeCode = async (code, language, stdin = '') => {
  // Check if credentials are set
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(
      'JDoodle credentials not found. Please set VITE_JDoodle_CLIENT_ID and VITE_JDoodle_CLIENT_SECRET in your .env file'
    )
  }

  // Get JDoodle language configuration
  const langConfig = JDoodle_LANGUAGE_MAP[language]
  if (!langConfig) {
    throw new Error(`Language ${language} is not supported by JDoodle`)
  }

  try {
    const response = await fetch(JDoodle_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        script: code,
        language: langConfig.code,
        versionIndex: langConfig.versionIndex,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        stdin: stdin,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      )
    }

    const result = await response.json()

    // Handle JDoodle error responses
    if (result.statusCode && result.statusCode !== 200) {
      return {
        success: false,
        output: '',
        error: result.error || 'Execution failed',
        statusCode: result.statusCode,
        memory: result.memory || '',
        cpuTime: result.cpuTime || '',
      }
    }

    return {
      success: true,
      output: result.output || '',
      error: result.error || '',
      statusCode: result.statusCode || 200,
      memory: result.memory || '',
      cpuTime: result.cpuTime || '',
    }
  } catch (error) {
    // Handle network errors and CORS errors
    if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
      const errorMsg = import.meta.env.DEV
        ? 'Network/CORS error: Make sure the dev server is running and the proxy is configured in vite.config.js'
        : 'CORS error: JDoodle API cannot be called directly from browser. You need a backend proxy for production.'
      throw new Error(errorMsg)
    }
    throw error
  }
}

/**
 * Check if a language requires JDoodle API
 * @param {string} language - Language key
 * @returns {boolean}
 */
export const requiresJDoodle = (language) => {
  return language in JDoodle_LANGUAGE_MAP
}

/**
 * Check if JDoodle credentials are configured
 * @returns {boolean}
 */
export const isConfigured = () => {
  return !!(CLIENT_ID && CLIENT_SECRET)
}
