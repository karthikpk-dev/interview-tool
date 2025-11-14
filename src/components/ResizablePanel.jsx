/**
 * Resizable Panel Component
 * Creates a resizable divider between panels
 */

import { useState, useRef, useEffect } from 'react'

export default function ResizablePanel({ 
  leftPanel, 
  rightPanel, 
  initialLeftWidth = 25, 
  minLeftWidth = 15,
  maxLeftWidth = 50 
}) {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth)
  const [isResizing, setIsResizing] = useState(false)
  const containerRef = useRef(null)
  const startXRef = useRef(0)
  const startWidthRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const deltaX = e.clientX - startXRef.current
      const deltaPercent = (deltaX / containerWidth) * 100
      const newLeftWidth = startWidthRef.current + deltaPercent

      // Constrain within min/max bounds
      const constrainedWidth = Math.max(
        minLeftWidth,
        Math.min(maxLeftWidth, newLeftWidth)
      )

      setLeftWidth(constrainedWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizing, minLeftWidth, maxLeftWidth])

  const handleMouseDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    startXRef.current = e.clientX
    startWidthRef.current = leftWidth
    setIsResizing(true)
  }

  return (
    <div ref={containerRef} className="flex flex-1 overflow-hidden relative h-full w-full">
      {/* Left Panel */}
      <div 
        className="flex-shrink-0 h-full overflow-hidden"
        style={{ width: `${leftWidth}%` }}
      >
        {leftPanel}
      </div>

      {/* Resizer */}
      <div
        onMouseDown={handleMouseDown}
        className={`bg-gray-300 hover:bg-indigo-500 cursor-col-resize transition-colors duration-200 flex-shrink-0 z-10 ${
          isResizing ? 'bg-indigo-500' : ''
        }`}
        style={{ width: '4px', minWidth: '4px' }}
        role="separator"
        aria-label="Resize panels"
      />

      {/* Right Panel */}
      <div 
        className="flex-1 h-full overflow-hidden"
        style={{ width: `${100 - leftWidth}%` }}
      >
        {rightPanel}
      </div>
    </div>
  )
}

