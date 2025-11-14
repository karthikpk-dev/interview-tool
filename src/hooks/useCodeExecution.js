/**
 * Custom Hook for Code Execution
 * Handles all code execution logic (browser and JDoodle)
 */

import { useState } from 'react'
import { executeInBrowser, transpileTypeScript } from '../services/browserExecution'
import { executeCode as executeJDoodle, requiresJDoodle } from '../services/jdoodleService'
import { LANGUAGES } from '../config/languages'

export function useCodeExecution() {
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const executeCode = async (code, language) => {
    // Reset states
    setOutput('')
    setError('')
    setIsLoading(true)

    try {
      const currentLang = LANGUAGES[language]
      const needsJDoodle = currentLang?.execution === 'jdoodle' || requiresJDoodle(language)

      if (needsJDoodle) {
        // Execute via JDoodle API
        try {
          const result = await executeJDoodle(code, language, '')
          
          if (result.success) {
            // Format output with metadata
            const outputParts = []
            if (result.error) outputParts.push(result.error)
            if (result.output) outputParts.push(result.output)
            
            const metadata = []
            if (result.cpuTime) metadata.push(`⏱️  CPU Time: ${result.cpuTime}s`)
            if (result.memory) metadata.push(`💾 Memory: ${result.memory} KB`)
            
            let outputText = outputParts.join('\n') || 'Code executed successfully (no output)'
            if (metadata.length > 0) {
              outputText += '\n\n' + metadata.join(' | ')
            }
            
            setOutput(outputText)
          } else {
            setError(result.error || 'Execution failed')
          }
        } catch (jdoodleError) {
          setError(`JDoodle API Error: ${jdoodleError.message}`)
        } finally {
          setIsLoading(false)
        }
        return
      }

      // Browser execution for JavaScript/TypeScript
      let codeToExecute = code
      if (language === 'typescript') {
        try {
          codeToExecute = transpileTypeScript(code)
        } catch (transpileError) {
          setError(`TypeScript Compilation Error: ${transpileError.message}`)
          setIsLoading(false)
          return
        }
      }

      // Execute in browser
      const result = executeInBrowser(codeToExecute)
      setOutput(result.output || 'Code executed successfully (no output)')
      setIsLoading(false)
    } catch (err) {
      setError(`Execution Error: ${err.message}\n${err.stack || ''}`)
      setIsLoading(false)
    }
  }

  const clearOutput = () => {
    setOutput('')
    setError('')
  }

  return {
    output,
    error,
    isLoading,
    executeCode,
    clearOutput,
  }
}

