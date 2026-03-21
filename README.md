# Git Indexer CLI

A beautiful command-line tool to explore GitHub profiles, repositories, and files with syntax highlighting and interactive menus.

## Features

✨ **Beautiful Terminal UI**
- Colored output with ASCII art headers
- Interactive menus with keyboard navigation
- Real-time loading indicators
- Formatted tables and file listings

🚀 **Core Functionality**
- Search GitHub profiles by username
- View user profile information (followers, repos, bio)
- Browse all public repositories
- Navigate repository file structures
- View code files with syntax highlighting
- Support for multiple programming languages

📋 **File Browser**
- Navigate directories recursively
- Display file sizes and types
- File type icons for easy identification
- Breadcrumb navigation

🎨 **Code Viewer**
- Syntax highlighting for 20+ languages
- Line numbers
- Copy code to clipboard (planned)
- Support for images and documents

## Installation

```bash
# Clone or navigate to the project
cd git-indexer

# Install dependencies
npm install

# Run the CLI
npm start
# or
npx git-indexer-cli
```

## Usage

1. **Start the application:**
   ```bash
   npm start
   ```

2. **Enter a GitHub username** when prompted

3. **Select an action:**
   - View Profile: See user's profile information
   - Browse Repositories: Explore user's repositories
   - Search Another User: Search for a different GitHub user
   - Exit: Quit the application

4. **Navigate repositories:**
   - Use arrow keys to select repositories
   - Press Enter to open a repository
   - Browse files and directories
   - Select files to view their contents

5. **View code:**
   - Code will be displayed with syntax highlighting
   - Use arrow keys to navigate back
   - Return to main menu to search another user

## Environment Variables

### GitHub Token (Optional)

To increase API rate limits, set your GitHub personal access token:

```bash
# On macOS/Linux
export GITHUB_TOKEN=your_token_here

# On Windows PowerShell
$env:GITHUB_TOKEN="your_token_here"

# On Windows Command Prompt
set GITHUB_TOKEN=your_token_here
```

[Create a token](https://github.com/settings/tokens) with `public_repo` scope.

## API Rate Limits

- **Without token:** 60 requests/hour
- **With token:** 5,000 requests/hour

## Supported File Types

### Code Files
- JavaScript/TypeScript (.js, .ts, .jsx, .tsx)
- Python (.py)
- Java (.java)
- C/C++ (.c, .cpp, .h, .hpp)
- C# (.cs)
- Go (.go)
- Ruby (.rb)
- PHP (.php)
- Swift (.swift)
- Kotlin (.kt)
- Rust (.rs)
- Bash (.sh)
- And more...

### Documents
- Markdown (.md)
- JSON (.json)
- YAML (.yml, .yaml)
- XML (.xml)
- SQL (.sql)
- HTML (.html)
- CSS (.css, .scss, .less)

### Media
- Images (.png, .jpg, .jpeg, .gif, .svg, .bmp)
- PDFs and Office documents

## Terminal Requirements

- **Node.js:** 16.0.0 or higher
- **Terminal width:** Minimum 80 characters (100+ recommended for best experience)
- **Color support:** 256-color terminal recommended

## Keyboard Shortcuts

- **Arrow Keys:** Navigate menus
- **Enter:** Select item
- **Escape (in some contexts):** Go back

## Error Handling

- User not found: Clear error message and prompt to retry
- Network errors: Automatic fallback with error description
- API rate limit: Helpful message with rate limit info
- Empty directories: Option to return to parent or main menu

## Examples

```bash
# Search for a popular developer
npm start
# Enter: torvalds

# Browse Linux kernel repository
# Select: linux (if available)
# Navigate through the repository structure
```

## Performance

- Lazy loading of file content
- Efficient pagination for large repositories
- Cached user data during session
- Smart file type detection

## Troubleshooting

### Connection Errors
```bash
# Check your internet connection
# The tool uses GitHub's public API (v3)
```

### Rate Limit Exceeded
```bash
# Set a GitHub token to increase rate limits
export GITHUB_TOKEN=your_token_here
npm start
```

### Character Encoding Issues
```bash
# Ensure your terminal supports UTF-8
# Use Windows Terminal on Windows for best compatibility
```

## Contributing

Feel free to contribute by opening issues and pull requests!

## License

MIT

## Credits

Built with:
- [Chalk](https://github.com/chalk/chalk) - Terminal colors
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) - Interactive CLI
- [Axios](https://github.com/axios/axios) - HTTP client
- [Table](https://github.com/gajus/table) - ASCII tables
- [Figlet](https://github.com/patorjk/figlet.js) - ASCII art
- [Highlight.js](https://github.com/highlightjs/highlight.js) - Code syntax highlighting

---

Made with ❤️ for GitHub explorers
