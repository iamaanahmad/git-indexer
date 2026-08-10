# 🚀 Git Indexer — GitHub Profile & Repository Explorer

A feature-rich developer tool featuring both an interactive **Web Application** and a **Command-Line Interface (CLI)** to search, explore, and index GitHub profiles, repositories, directory structures, and code files with real-time filtering, theme toggling, and syntax highlighting.

---

## 🌟 Key Interfaces

### 🌐 1. Web Application (`index.html`)
- **Centered Profile Card**: Displays user avatar, handle, bio, repository stats, follower/following counts, with avatar preview modal & image download support.
- **Repository Search & Filter Box**: Real-time live search filtering by repository **name** and **description** with dynamic result counters.
- **Interactive File Explorer**: Full directory navigation with breadcrumbs and file-type icons.
- **Code Viewer Modal**: Code preview with syntax highlighting, line numbers, and one-click **Copy to Clipboard**.
- **Dark / Light Mode**: Dynamic theme switcher with automatic system theme detection.

### 💻 2. Command-Line Interface (CLI)
- **Interactive Terminal Menus**: Powered by `inquirer` with keyboard navigation.
- **Formatted ASCII Tables**: Styled profile cards and repository tables via `table` and `chalk`.
- **Code Highlighting**: In-terminal syntax highlighting for 20+ programming languages.
- **Zero Configuration**: Option to use optional `GITHUB_TOKEN` for increased API rate limits.

---

## 📁 Quick Start & Installation

### Option A: Web Application
Simply open `index.html` in any modern web browser or serve locally:
```bash
# Serve locally with npx (optional)
npx serve .
```

### Option B: Quick Setup Scripts
- **Windows**: Double-click `setup.bat` or run:
  ```cmd
  setup.bat
  ```
- **macOS / Linux**: Run in terminal:
  ```bash
  chmod +x setup.sh
  ./setup.sh
  ```

### Option C: Manual CLI Setup
```bash
# 1. Install dependencies
npm install

# 2. Run test suite to verify setup
node test.js

# 3. Start the CLI application
npm start
```

---

## 🛠️ Detailed Features

### 🔍 Repository Live Search & Filter (Web UI)
Filter repositories instantaneously by:
- **Repository Name** (e.g., `react`, `cli`)
- **Repository Description** (e.g., `frontend`, `compiler`, `utility`)
- Live counter displays matching repository count (e.g., `Showing 5 of 30 repositories`).

### 👤 Centered Profile Card
- Clean visual hierarchy with centered profile picture, username (`@handle`), bio, and follower metrics.
- Clickable profile picture opens a full-screen preview with **Download Image** functionality.

### 📂 Directory & File Browser
- Recursively navigate repository folders with breadcrumb trail navigation (`repo/src/ui/...`).
- File icons categorized by extension (JavaScript, Python, Rust, Go, Markdown, JSON, images, PDFs, etc.).
- Modal code viewer with syntax highlighting and instant **Copy Code** button.

---

## 🔑 Environment Variables (Increasing Rate Limits)

GitHub's public API allows **60 requests/hour** unauthenticated. To increase the limit to **5,000 requests/hour**, set your personal access token:

```bash
# macOS / Linux
export GITHUB_TOKEN="your_personal_access_token"

# Windows PowerShell
$env:GITHUB_TOKEN="your_personal_access_token"

# Windows Command Prompt
set GITHUB_TOKEN="your_personal_access_token"
```

---

## 🎨 Supported File Types & Languages

- **Languages**: JavaScript (`.js`, `.jsx`), TypeScript (`.ts`, `.tsx`), Python (`.py`), Java (`.java`), C/C++ (`.c`, `.cpp`, `.h`), C# (`.cs`), Go (`.go`), Ruby (`.rb`), PHP (`.php`), Swift (`.swift`), Kotlin (`.kt`), Rust (`.rs`), Shell (`.sh`, `.bash`), HTML (`.html`), CSS (`.css`, `.scss`, `.less`), SQL (`.sql`), JSON (`.json`), YAML (`.yml`, `.yaml`), XML (`.xml`), Markdown (`.md`).
- **Media & Documents**: Images (`.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`), PDFs, and office files.

---

## 🧪 Testing

The repository includes an automated module test runner:
```bash
node test.js
```

---

## 📄 License

Distributed under the **MIT License**.
