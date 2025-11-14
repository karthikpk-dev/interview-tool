# Code Runner

A React application that integrates with Monaco Editor to provide a multi-language code execution environment with a clean, tabbed interface.

## Features

- ✨ Monaco Editor integration for a VS Code-like editing experience
- 🚀 Multi-language support: JavaScript, TypeScript, Python, Java, C++, and more
- ▶️ Execute code with a single click (browser execution for JS/TS, JDoodle API for other languages)
- 📊 Real-time output display with console.log, console.error, etc. support
- 🎨 Clean, modern UI with Tailwind CSS
- 📋 Question, Editor, and Output tabs
- 📱 Responsive design that works on mobile devices
- ⚠️ Error handling with clear error messages
- ⏱️ Execution statistics (CPU time, memory usage) for JDoodle languages

## Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up JDoodle API (Optional - for Python, Java, C++, etc.):**
   
   For languages other than JavaScript/TypeScript, you'll need JDoodle API credentials:
   
   a. Sign up at [JDoodle](https://www.jdoodle.com/) (free tier: 200 requests/day)
   
   b. Get your Client ID and Client Secret from the dashboard
   
   c. Create a `.env` file in the root directory:
   ```bash
   VITE_JDoodle_CLIENT_ID=your-client-id-here
   VITE_JDoodle_CLIENT_SECRET=your-client-secret-here
   ```
   
   ⚠️ **Security Note**: These credentials will be exposed in the frontend bundle. This is OK for testing, but for production, use a backend proxy to protect your credentials.

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Project Structure

```
interview-app/
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── README.md          # This file
└── src/
    ├── main.jsx       # React entry point
    ├── App.jsx        # Main application component
    ├── App.css        # Application styles
    └── index.css      # Global styles
```

## How It Works

1. **Code Editor**: Uses Monaco Editor (the same editor that powers VS Code) for syntax highlighting and IntelliSense
2. **Code Execution**: 
   - **JavaScript/TypeScript**: Executes in the browser using the `Function` constructor (TypeScript is transpiled first)
   - **Other Languages** (Python, Java, C++, etc.): Executes via JDoodle API
3. **Output Capture**: 
   - For JS/TS: Intercepts `console.log`, `console.error`, `console.warn`, and `console.info`
   - For JDoodle languages: Displays stdout, stderr, and execution statistics
4. **Error Handling**: Catches and displays runtime errors, compilation errors, and API errors with clear messages

## Supported Languages

### Browser Execution (No API needed)
- **JavaScript**: Direct browser execution
- **TypeScript**: Transpiled to JavaScript, then executed in browser

### JDoodle API Execution (Requires credentials)
- **Python 3**: Full Python support
- **Java**: Java compilation and execution
- **C++**: C++ compilation and execution
- **C**: C compilation and execution
- **Go**: Go compilation and execution
- **Rust**: Rust compilation and execution
- And more... (see `src/services/jdoodleService.js` for full list)

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Deployment

### Option 1: Deploy to Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI (optional):**
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy via Netlify CLI:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

   Or drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

4. **Or connect via Git:**
   - Push your code to GitHub/GitLab/Bitbucket
   - Go to [Netlify](https://www.netlify.com/)
   - Click "New site from Git"
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

### Option 2: Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

   Or use the Vercel dashboard:
   - Push your code to GitHub/GitLab/Bitbucket
   - Go to [Vercel](https://vercel.com/)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Vite settings

3. **For production deployment:**
   ```bash
   vercel --prod
   ```

### Option 3: Deploy to GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json scripts:**
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## Security Considerations

⚠️ **Important**: The current implementation uses the `Function` constructor, which provides basic isolation but is **not fully sandboxed**. This means:

- The code runs in the same context as your application
- It can access global variables and functions
- It's suitable for trusted environments or learning purposes

### For Production Use

For a more secure implementation, consider:

1. **Web Workers**: Execute code in a separate thread with limited access
2. **iframe Sandboxing**: Run code in an isolated iframe with restricted permissions
3. **Server-Side Execution**: Send code to a backend service that runs it in a containerized environment
4. **VM2 or similar**: Use a Node.js VM library (server-side only)
5. **CSP (Content Security Policy)**: Implement strict CSP headers

## Potential Improvements

### 1. Better Sandboxing
- Use Web Workers for code execution
- Implement iframe-based sandboxing with restricted permissions
- Add resource limits (execution time, memory)

### 2. Enhanced Error Handling
- Syntax error detection before execution
- Better error formatting with line numbers
- Error recovery suggestions

### 3. Layout & UX Enhancements
- Resizable panels (drag to adjust width)
- Multiple tabs for different code files
- Code snippets/templates library
- Dark/light theme toggle
- Keyboard shortcuts (Cmd/Ctrl + Enter to run)

### 4. Additional Features
- Save/load code snippets
- Share code via URL parameters
- Code formatting (Prettier integration)
- Import/export functionality
- Support for multiple languages (TypeScript, Python, etc.)
- Real-time collaboration

### 5. Performance
- Lazy load Monaco Editor
- Code splitting for better initial load
- Output virtualization for large outputs

## License

MIT

## Support

For issues or questions, please open an issue on the repository.

