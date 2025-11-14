/**
 * Header Component
 * Displays app title, language selector, and action buttons
 */

import { LANGUAGES } from '../config/languages'

export default function Header({ language, onLanguageChange, onRunCode, onClearOutput, isLoading }) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4 gap-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg z-10">
      <h1 className="m-0 text-xl md:text-2xl font-semibold">Code Runner</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
          <label htmlFor="language-select" className="text-sm font-medium whitespace-nowrap">
            Language:
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="px-3 py-2 rounded-md text-sm font-medium bg-white/20 text-white cursor-pointer transition-all duration-200 backdrop-blur-sm hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent flex-1 md:flex-initial max-w-[200px] md:max-w-none"
          >
            {Object.entries(LANGUAGES).map(([key, lang]) => (
              <option key={key} value={key} className="bg-indigo-500 text-white">
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 w-full md:w-auto justify-center">
          <button
            onClick={onRunCode}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-md text-sm font-medium bg-emerald-500 text-white cursor-pointer transition-all duration-200 shadow-md hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Running...
              </>
            ) : (
              '▶️ Run Code'
            )}
          </button>
          <button
            onClick={onClearOutput}
            className="px-5 py-2.5 rounded-md text-sm font-medium bg-gray-500 text-white cursor-pointer transition-all duration-200 shadow-md hover:bg-gray-600 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
          >
            🗑️ Clear Output
          </button>
        </div>
      </div>
    </header>
  )
}

