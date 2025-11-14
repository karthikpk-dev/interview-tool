/**
 * Output Panel Component
 * Displays code execution results, errors, and output
 */

import { LANGUAGES } from '../config/languages'

export default function OutputPanel({ output, error, language }) {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      <div className="px-4 py-2.5 bg-white border-b border-gray-200 shadow-sm">
        <h2 className="m-0 text-sm font-semibold text-gray-700">📊 Output</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto font-mono">
        {error ? (
          <pre className="m-0 p-0 whitespace-pre-wrap break-words text-red-600 leading-relaxed text-xs bg-red-50 p-3 rounded-md border-l-4 border-red-600">
            {error}
          </pre>
        ) : output ? (
          <pre className="m-0 p-0 whitespace-pre-wrap break-words text-gray-800 leading-relaxed text-xs">
            {output}
          </pre>
        ) : (
          <div className="flex flex-col justify-center items-center h-full text-gray-400 text-center px-4">
            <p className="my-2 text-sm">Output will appear here after running your code.</p>
            <p className="text-xs italic">
              Click "Run Code" to execute your {LANGUAGES[language]?.name || 'code'}.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

