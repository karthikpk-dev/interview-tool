/**
 * Question Panel Component
 * Displays and allows editing of coding questions
 */

export default function QuestionPanel({ question, onQuestionChange }) {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      <div className="px-4 py-2.5 bg-white border-b border-gray-200 shadow-sm">
        <h2 className="m-0 text-sm font-semibold text-gray-700">📋 Question</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <textarea
          className="w-full h-full p-4 border border-gray-200 rounded-lg text-sm leading-relaxed text-gray-700 bg-white resize-none outline-none transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 placeholder:text-gray-400"
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          placeholder="Enter your coding question here..."
        />
      </div>
    </div>
  )
}

