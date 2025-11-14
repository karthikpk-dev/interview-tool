/**
 * Language Configuration
 * Defines all supported languages with their properties
 */

export const LANGUAGES = {
  javascript: {
    name: 'JavaScript',
    monaco: 'javascript',
    execution: 'browser',
    defaultCode: ''
  },
  typescript: {
    name: 'TypeScript',
    monaco: 'typescript',
    execution: 'browser',
    defaultCode: ''
  },
  python: {
    name: 'Python',
    monaco: 'python',
    execution: 'jdoodle',
    defaultCode: ''
  },
  java: {
    name: 'Java',
    monaco: 'java',
    execution: 'jdoodle',
    defaultCode: ''
  },
  cpp: {
    name: 'C++',
    monaco: 'cpp',
    execution: 'jdoodle',
    defaultCode: ''
  }
}

/**
 * Get default question content
 */
export const getDefaultQuestion = () => {
  return `# Sample Coding Question

## Problem Statement

Write a function that takes an array of numbers and returns the sum of all even numbers.

## Example

\`\`\`javascript
sumEvenNumbers([1, 2, 3, 4, 5, 6])
// Expected output: 12 (2 + 4 + 6)
\`\`\`

## Constraints

- The array can contain positive and negative integers
- Return 0 if there are no even numbers

## Instructions

1. Write your solution in the Editor tab
2. Test your code using the Run Code button
3. Check the Output tab to see the results

Good luck! 🚀`
}

