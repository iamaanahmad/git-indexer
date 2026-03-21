import chalk from 'chalk';
import { table } from 'table';
import hljs from 'highlight.js';
import stripAnsi from 'strip-ansi';

/**
 * Render user profile card
 */
export function renderProfile(user) {
  const boxWidth = 60;
  const line = (text = '') => {
    if (!text) return '│' + ' '.repeat(boxWidth - 2) + '│';
    return '│ ' + padRight(text, boxWidth - 4) + ' │';
  };

  console.log('┌' + '─'.repeat(boxWidth - 2) + '┐');
  console.log(line(chalk.bold.cyan(`👤 ${user.name || user.login}`)));
  console.log(line());
  if (user.bio) {
    console.log(line(chalk.dim(user.bio)));
  }
  console.log(line());
  
  // Stats row
  const following = `Followers: ${chalk.yellow(user.followers)}`;
  const followers = `Following: ${chalk.yellow(user.following)}`;
  console.log(line(chalk.dim(`${following} │ ${followers}`)));
  
  const publicRepos = `Public Repos: ${chalk.blue(user.public_repos)}`;
  const gists = `Gists: ${chalk.blue(user.public_gists)}`;
  console.log(line(chalk.dim(`${publicRepos} │ ${gists}`)));
  
  if (user.location) {
    console.log(line(chalk.dim(`📍 ${user.location}`)));
  }
  if (user.company) {
    console.log(line(chalk.dim(`🏢 ${user.company}`)));
  }
  if (user.blog) {
    console.log(line(chalk.dim(`🔗 ${user.blog}`)));
  }
  
  console.log('└' + '─'.repeat(boxWidth - 2) + '┘');
}

/**
 * Render repository table
 */
export function renderReposTable(repos) {
  if (!repos || repos.length === 0) {
    console.log(chalk.yellow('No repositories found'));
    return;
  }

  const data = [
    [
      chalk.bold('Name'),
      chalk.bold('⭐ Stars'),
      chalk.bold('🍴 Forks'),
      chalk.bold('Lang'),
      chalk.bold('Updated')
    ]
  ];

  repos.forEach(repo => {
    const language = repo.language || '-';
    const updated = new Date(repo.updated_at).toLocaleDateString();
    
    data.push([
      chalk.cyan(repo.name),
      chalk.yellow(repo.stargazers_count.toString()),
      chalk.green(repo.forks_count.toString()),
      chalk.blue(language),
      chalk.dim(updated)
    ]);
  });

  const config = {
    border: {
      topBody: '─',
      topJoin: '┬',
      topLeft: '┌',
      topRight: '┐',
      bottomBody: '─',
      bottomJoin: '┴',
      bottomLeft: '└',
      bottomRight: '┘',
      bodyLeft: '│',
      bodyRight: '│',
      bodyJoin: '│'
    },
    columns: {
      0: { width: 25 },
      1: { width: 10, alignment: 'right' },
      2: { width: 10, alignment: 'right' },
      3: { width: 12, alignment: 'center' },
      4: { width: 12, alignment: 'right' }
    }
  };

  console.log(table(data, config));
}

/**
 * Render file list/tree
 */
export function renderFileTree(files, currentPath) {
  const boxWidth = 70;
  
  console.clear();
  console.log(chalk.cyan('📁 FILE BROWSER'));
  console.log(chalk.dim('─'.repeat(boxWidth)));
  
  if (currentPath) {
    console.log(chalk.dim(`📂 Location: ${currentPath}`));
  } else {
    console.log(chalk.dim('📂 Location: (root)'));
  }
  console.log(chalk.dim('─'.repeat(boxWidth)));
  console.log();

  const dirs = files.filter(f => f.type === 'dir').sort((a, b) => a.name.localeCompare(b.name));
  const fileList = files.filter(f => f.type !== 'dir').sort((a, b) => a.name.localeCompare(b.name));

  // Render directories first
  dirs.forEach(dir => {
    console.log(`  ${chalk.blue('📁')} ${chalk.cyan(dir.name + '/')}`);
  });

  // Render files
  fileList.forEach(file => {
    const icon = getFileIcon(file.name);
    const size = formatFileSize(file.size || 0);
    console.log(`  ${icon} ${chalk.white(file.name)} ${chalk.dim(`(${size})`)}`);
  });

  console.log();
}

/**
 * Syntax highlighting for code
 */
export function highlightCode(content, filename) {
  try {
    const ext = filename.split('.').pop().toLowerCase();
    const language = getLanguageFromExt(ext);
    
    if (language) {
      try {
        const highlighted = hljs.highlight(content, { language, ignoreIllegals: true }).value;
        return highlighted;
      } catch {
        return content; // Fallback to plain text
      }
    }
    return content;
  } catch {
    return content;
  }
}

/**
 * Render code with line numbers
 */
export function renderCodeWithLineNumbers(content, filename) {
  const highlighted = highlightCode(content, filename);
  const lines = highlighted.split('\n');
  const maxLineNum = lines.length;
  const lineNumWidth = maxLineNum.toString().length;

  return lines
    .map((line, i) => {
      const lineNum = (i + 1).toString().padStart(lineNumWidth, ' ');
      return `${chalk.dim(lineNum)} │ ${line}`;
    })
    .join('\n');
}

/**
 * Utility: Pad text to right
 */
function padRight(text, length) {
  const cleanText = stripAnsi(text);
  const padding = Math.max(0, length - cleanText.length);
  return text + ' '.repeat(padding);
}

/**
 * Get file icon based on extension
 */
function getFileIcon(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  
  const icons = {
    // Images
    png: '🖼️',
    jpg: '🖼️',
    jpeg: '🖼️',
    gif: '🖼️',
    svg: '🖼️',
    ico: '🖼️',
    
    // Documents
    pdf: '📕',
    doc: '📄',
    docx: '📄',
    xls: '📊',
    xlsx: '📊',
    
    // Code
    js: '🟨',
    jsx: '⚛️',
    ts: '🔷',
    tsx: '⚛️',
    py: '🐍',
    java: '☕',
    cpp: '⚙️',
    c: '⚙️',
    h: '⚙️',
    hpp: '⚙️',
    cs: '🎯',
    go: '🐹',
    rb: '💎',
    php: '🐘',
    swift: '🦅',
    kt: '🎲',
    rs: '🦀',
    
    // Web
    html: '🌐',
    css: '🎨',
    scss: '🎨',
    less: '🎨',
    json: '{}',
    xml: '📋',
    yaml: '⚙️',
    yml: '⚙️',
    
    // Markdown & Text
    md: '📝',
    markdown: '📝',
    txt: '📄',
    sql: '🗄️',
    
    // Archives
    zip: '📦',
    rar: '📦',
    '7z': '📦',
    tar: '📦',
    gz: '📦',
    
    // Shell
    sh: '🐚',
    bash: '🐚',
    
    // Default
    default: '📄'
  };

  return icons[ext] || icons.default;
}

/**
 * Format file size
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get language from file extension
 */
function getLanguageFromExt(ext) {
  const languages = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    py: 'python',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    h: 'c',
    hpp: 'cpp',
    cs: 'csharp',
    go: 'go',
    rb: 'ruby',
    php: 'php',
    swift: 'swift',
    kt: 'kotlin',
    rs: 'rust',
    sh: 'bash',
    html: 'html',
    css: 'css',
    scss: 'scss',
    less: 'less',
    json: 'json',
    xml: 'xml',
    yml: 'yaml',
    yaml: 'yaml',
    md: 'markdown',
    sql: 'sql'
  };
  
  return languages[ext.toLowerCase()] || null;
}

export default {
  renderProfile,
  renderReposTable,
  renderFileTree,
  highlightCode,
  renderCodeWithLineNumbers
};
