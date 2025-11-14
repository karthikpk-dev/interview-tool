/**
 * Editor Panel Component
 * Displays Monaco Editor for code editing
 */

import Editor from '@monaco-editor/react'
import { LANGUAGES } from '../config/languages'

export default function EditorPanel({ language, code, onCodeChange }) {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <div className="px-4 py-2.5 bg-white border-b border-gray-200 shadow-sm">
        <h2 className="m-0 text-sm font-semibold text-gray-700">✏️ Editor</h2>
      </div>
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={LANGUAGES[language]?.monaco || 'javascript'}
          value={code}
          onChange={(value) => onCodeChange(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  )
}

