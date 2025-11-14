/**
 * Browser Code Execution Service
 * Handles execution of JavaScript/TypeScript code in the browser
 */

import * as ts from 'typescript'
import { CONSOLE_TYPES, CONSOLE_PREFIXES } from '../utils/constants'

/**
 * Transpiles TypeScript code to JavaScript
 * @param {string} tsCode - TypeScript source code
 * @returns {string} - Transpiled JavaScript code
 */
export const transpileTypeScript = (tsCode) => {
  try {
    const result = ts.transpile(tsCode, {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ES2020,
      jsx: ts.JsxEmit.React,
      esModuleInterop: true,
      skipLibCheck: true,
    })
    return result
  } catch (err) {
    throw new Error(`TypeScript compilation error: ${err.message}`)
  }
}

/**
 * Executes JavaScript code in the browser and captures console output
 * @param {string} code - JavaScript code to execute
 * @returns {{output: string, result: any}} - Output text and return value
 */
export const executeInBrowser = (code) => {
  const consoleOutput = []
  
  // Save original console methods
  const originalLog = console.log
  const originalError = console.error
  const originalWarn = console.warn
  const originalInfo = console.info

  /**
   * Helper function to format console arguments
   */
  const formatArgs = (args) => {
    return args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(' ')
  }

  /**
   * Helper function to create console override
   */
  const createConsoleOverride = (original, type) => {
    return (...args) => {
      const message = formatArgs(args)
      consoleOutput.push({ type, message })
      original.apply(console, args)
    }
  }

  // Override console methods to capture output
  console.log = createConsoleOverride(originalLog, CONSOLE_TYPES.LOG)
  console.error = createConsoleOverride(originalError, CONSOLE_TYPES.ERROR)
  console.warn = createConsoleOverride(originalWarn, CONSOLE_TYPES.WARN)
  console.info = createConsoleOverride(originalInfo, CONSOLE_TYPES.INFO)

  try {
    // Execute the code using Function constructor
    const func = new Function(code)
    const result = func()

    // Restore original console methods
    console.log = originalLog
    console.error = originalError
    console.warn = originalWarn
    console.info = originalInfo

    // Format and return output
    if (consoleOutput.length > 0) {
      const outputText = consoleOutput
        .map(item => {
          const prefix = CONSOLE_PREFIXES[item.type] || ''
          return `${prefix}${item.message}`
        })
        .join('\n')
      return { output: outputText, result }
    }

    return { output: result !== undefined ? String(result) : '', result }
  } catch (err) {
    // Restore console methods in case of error
    console.log = originalLog
    console.error = originalError
    console.warn = originalWarn
    console.info = originalInfo
    throw err
  }
}

