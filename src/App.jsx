/**
 * Main App Component
 * Orchestrates the code runner application
 */

import { useState } from 'react'
import { LANGUAGES, getDefaultQuestion } from './config/languages'
import { useCodeExecution } from './hooks/useCodeExecution'
import Header from './components/Header'
import QuestionPanel from './components/QuestionPanel'
import EditorPanel from './components/EditorPanel'
import OutputPanel from './components/OutputPanel'
import ResizablePanel from './components/ResizablePanel'

function App() {
  // State for selected language
  const [language, setLanguage] = useState('javascript')
  
  // State for question content
  const [question, setQuestion] = useState(getDefaultQuestion())
  
  // State for editor content
  const [code, setCode] = useState('')

  // Code execution hook
  const { output, error, isLoading, executeCode, clearOutput } = useCodeExecution()

  /**
   * Handles language change
   */
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage)
    setCode(LANGUAGES[newLanguage].defaultCode)
  }

  /**
   * Handles code execution
   */
  const handleRunCode = async () => {
    await executeCode(code, language)
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden font-sans antialiased">
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        onRunCode={handleRunCode}
        onClearOutput={clearOutput}
        isLoading={isLoading}
      />

      {/* Split-screen layout: Question | Editor | Output */}
      <div className="flex flex-1 overflow-hidden h-full">
        <ResizablePanel
          initialLeftWidth={25}
          minLeftWidth={15}
          maxLeftWidth={50}
          leftPanel={
            <div className="h-full border-r border-gray-200 flex flex-col">
              <QuestionPanel
                question={question}
                onQuestionChange={setQuestion}
              />
            </div>
          }
          rightPanel={
            <ResizablePanel
              initialLeftWidth={66.67}
              minLeftWidth={40}
              maxLeftWidth={85}
              leftPanel={
                <div className="h-full flex flex-col">
                  <EditorPanel
                    language={language}
                    code={code}
                    onCodeChange={setCode}
                  />
                </div>
              }
              rightPanel={
                <div className="h-full border-l border-gray-200 flex flex-col">
                  <OutputPanel
                    output={output}
                    error={error}
                    language={language}
                  />
                </div>
              }
            />
          }
        />
      </div>
    </div>
  )
}

export default App
