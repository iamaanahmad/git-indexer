# Git Indexer CLI - Complete Guide

A beautiful CLI tool to explore GitHub profiles and repositories from your terminal.

---

## 🚀 Installation (Choose Your Way)

### 1️⃣ Easiest Way (Windows/Mac/Linux)

**Windows:**
- Double-click `setup.bat` in the folder
- Wait ~30 seconds, the app starts automatically!

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### 2️⃣ Manual Way (All OS)

```bash
# Make sure Node.js is installed (nodejs.org)
npm install
npm start
```

### 3️⃣ One-Line Command

```bash
git clone <repo-link> && cd git-indexer && npm install && npm start
```

---

## 📖 How to Use

### Start the App
```bash
npm start
```

You'll see:
```
   ____ _ _     ___           _
  / ___(_) |_  |_ _|_ __   __| | _____  _____ _ __
 | |  _| | __|  | || '_ \ / _` |/ _ \ \/ / _ \ '__|
 | |_| | | |_   | || | | | (_| |  __/>  <  __/ |
  \____|_|\__| |___|_| |_|\__,_|\___/_/\_\___|_|

🚀 GitHub Profile & Repository Explorer CLI

? Enter GitHub username: 
```

### Step-by-Step Usage

**1. Enter a GitHub Username**
```
? Enter GitHub username: torvalds
⏳ Fetching user data...
```

**2. Choose What to Do**
```
? What would you like to do, Linus Torvalds?
  👤 View Profile          ← See user info & stats
  📚 Browse Repositories   ← List all repos
  🔍 Search Another User   ← Look up different user
  ❌ Exit                  ← Quit app
```

**3. Browse Repositories**
```
Select a repository from the table:
┌──────────────┬──────────┬────────┬──────────┐
│ Name         │ ⭐ Stars │ 🍴 Fork│ Language │
├──────────────┼──────────┼────────┼──────────┤
│ linux        │ 145K     │ 23K    │ C        │
│ git          │ 12K      │ 3K     │ C        │
└──────────────┴──────────┴────────┴──────────┘
```

**4. Explore Files**
```
📁 FILE BROWSER
📂 Location: linux

  📁 arch/
  📁 drivers/
  📄 Makefile
  📝 README.md
```

Use arrow keys to navigate, press Enter to open files.

**5. View Code**
```
📄 Makefile
───────────────────────────
001 │ VERSION = 5.14
002 │ PATCHLEVEL = 0
003 │ SUBLEVEL = 0
...

✨ Syntax highlighting included!
```

Press any key to go back, return to main menu.

---

## ⌨️ Keyboard Controls

| Key | Action |
|-----|--------|
| **⬆️ ⬇️** | Navigate menu |
| **Enter** | Select option |
| **Ctrl + C** | Quit anytime |

---

## 📚 Examples

### Explore React Source Code
```
1. npm start
2. Username: facebook
3. Browse Repositories
4. Select: react
5. Open: src/components/
6. View React implementation!
```

### Study Linux Kernel
```
1. npm start
2. Username: torvalds
3. Browse Repositories
4. Select: linux
5. Explore: arch/x86/kernel/
```

### Check Popular Projects
```
1. npm start
2. Username: nodejs, vuejs, rails, django, golang, etc.
3. Browse their repositories
4. Learn from source code!
```

---

## ❓ Troubleshooting

### "node/npm not found"
**Solution:** Install Node.js from https://nodejs.org/
- Download & install
- **Windows:** Restart computer
- Restart your terminal

### "User not found"
**Solution:** Check username spelling
- Username is case-insensitive
- Try searching on github.com first

### "Cannot fetch repositories"
**Solution:** Check your internet connection
- GitHub might be temporarily down
- Try again in a few moments

### "Colors look weird"
**Solution:** Use a better terminal
- **Windows:** Install [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/) (free)
- **Mac:** Use Terminal.app or [iTerm2](https://iterm2.com/)
- **Linux:** Most terminals work fine

### "Text is garbled"
**Solution:** Terminal encoding issue
- Usually just need to close and reopen terminal
- Windows Terminal should fix this

---

## 🎯 Features

### ✅ Can Do
- Search any public GitHub user
- View user profiles with stats
- Browse all repositories
- Navigate file structures
- View code with syntax highlighting
- See 20+ programming languages highlighted
- Search different users anytime
- Beautiful colored output

### ❌ Cannot Do
- Edit or delete files (read-only)
- View private repositories
- Download files directly
- Work offline (needs internet)
- Create issues or pull requests

---

## ⚙️ Advanced: GitHub Token (Optional)

For higher API limits (5,000 requests/hour instead of 60):

**Windows PowerShell:**
```powershell
$env:GITHUB_TOKEN="ghp_your_token_here"
npm start
```

**Windows Command Prompt:**
```cmd
set GITHUB_TOKEN=ghp_your_token_here
npm start
```

**macOS/Linux:**
```bash
export GITHUB_TOKEN="ghp_your_token_here"
npm start
```

Get a token: https://github.com/settings/tokens (select `public_repo` scope)

---

## ❓ FAQs

**Q: Do I need a GitHub account?**
A: No! Works with any public GitHub user.

**Q: Is my information safe?**
A: Yes! Only reads public GitHub data. Nothing is stored locally.

**Q: Can I work offline?**
A: No, it requires internet to fetch GitHub data.

**Q: Does it work on my phone?**
A: No, it's a desktop terminal tool only.

**Q: Can I edit code?**
A: No, this is read-only for exploration.

**Q: How much space does it use?**
A: ~150 MB when installed (mostly npm packages). 0 KB data stored after closing.

**Q: Which operating systems work?**
A: Windows, macOS, and Linux (any with Node.js).

**Q: Will it slow my computer?**
A: No, it's lightweight and uses minimal resources.

---

## 📋 Typical Session

```
$ npm start

[ASCII header shows]

? Enter GitHub username: facebook

✓ User facebook loaded successfully!

┌─────────────────────────────────┐
│ 👤 Meta Platforms, Inc.         │
│ Building great products         │
│ Followers: 12.5K │ Following: 145
│ Public Repos: 234               │
└─────────────────────────────────┘

? What would you like to do, Meta?
❯ 📚 Browse Repositories

[Repository table shown]

? Select a repository to explore:
❯ Spoon-Knife

📁 FILE BROWSER
📂 root directory

  📁 docs/
❯ 📄 README.md

[File content displayed with colors]

? Go back or main menu?
❯ Go back to file browser
```

---

## 🔧 System Requirements

- **Node.js v16+** (free from [nodejs.org](https://nodejs.org/))
- **Internet connection** (to retrieve GitHub data)
- **Terminal application** (PowerShell, Command Prompt, Terminal.app, etc.)

That's it! No special tools or knowledge required.

---

## 💡 Tips & Tricks

1. **Study open source code** - Browse React, Linux, Node.js, Vue.js, Django, etc.
2. **Find popular projects** - Sort by stars in the repo list
3. **Learn from experts** - Explore repositories from experienced developers
4. **No terminal fear** - Just arrow keys and Enter to navigate
5. **Syntax highlighting helps** - Colors make code easier to understand

---

## 📞 Need More Help?

- **Setup issues?** Install Node.js first, then try again
- **Usage questions?** Try navigating menus or see examples above
- **GitHub username issues?** Check spelling on github.com
- **Other problems?** Check internet connection and restart app

---

## 🎊 That's All You Need!

You're ready to explore GitHub from your terminal! 🚀

```bash
npm start
```

Then just:
1. Enter a GitHub username
2. Choose what to do
3. Use arrow keys to navigate
4. Press Enter to select
5. Enjoy!

---

**Made for GitHub explorers everywhere!** ✨
