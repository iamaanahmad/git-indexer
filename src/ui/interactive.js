import inquirer from 'inquirer';
import chalk from 'chalk';
import { renderReposTable, renderFileTree } from './renderer.js';

/**
 * Prompt for GitHub username
 */
export async function promptUsername() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: chalk.cyan('Enter GitHub username:'),
      validate: (input) => {
        if (!input.trim()) return 'Username cannot be empty';
        if (input.length < 1) return 'Username must be at least 1 character';
        return true;
      }
    }
  ]);

  return answers.username.trim();
}

/**
 * Main menu after user is loaded
 */
export async function mainMenu(user) {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: chalk.cyan(`What would you like to do, ${user.name || user.login}?`),
      choices: [
        { name: '👤 View Profile', value: 'view-profile' },
        { name: '📚 Browse Repositories', value: 'browse-repos' },
        { name: '🔍 Search Another User', value: 'search-new' },
        new inquirer.Separator(),
        { name: '❌ Exit', value: 'exit' }
      ]
    }
  ]);

  return answers.action;
}

/**
 * Repository selection menu
 */
export async function repoMenu(repos) {
  console.clear();
  console.log(chalk.cyan('📚 REPOSITORIES'));
  console.log(chalk.dim('─'.repeat(70)));
  console.log();
  
  renderReposTable(repos);
  console.log();

  const choices = repos.map((repo, index) => ({
    name: `${chalk.cyan(repo.name)} ${chalk.dim(`(${repo.language || 'N/A'}, ⭐${repo.stargazers_count})`)}`
      .substring(0, 70),
    value: repo
  }));

  choices.push(new inquirer.Separator());
  choices.push({ name: '← Back to Main Menu', value: null });

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'repo',
      message: 'Select a repository to explore:',
      choices: choices,
      pageSize: 10
    }
  ]);

  return answers.repo;
}

/**
 * File/Directory selection menu
 */
export async function fileMenu(files, currentPath, repoName) {
  console.clear();
  console.log(chalk.bold.blue(`📦 ${repoName}`));
  console.log(chalk.dim('─'.repeat(70)));
  
  if (currentPath) {
    console.log(chalk.dim(`📂 ${currentPath}`));
  } else {
    console.log(chalk.dim('📂 (root)'));
  }
  console.log(chalk.dim('─'.repeat(70)));
  console.log();

  renderFileTree(files, currentPath);

  const choices = files
    .sort((a, b) => {
      // Directories first
      if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
      return a.name.localeCompare(b.name);
    })
    .map(file => ({
      name: formatFileChoice(file),
      value: file.name
    }));

  // Add navigation options
  choices.push(new inquirer.Separator());
  
  if (currentPath) {
    choices.push({ name: '📁 Go back to parent directory', value: 'back' });
  }
  
  choices.push({ name: '🏠 Return to main menu', value: 'main' });

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'file',
      message: 'Select a file or folder:',
      choices: choices,
      pageSize: 15
    }
  ]);

  return answers.file;
}

/**
 * Format file choice for display
 */
function formatFileChoice(file) {
  if (file.type === 'dir') {
    return `📁 ${chalk.cyan(file.name + '/')}`;
  } else {
    const size = formatFileSize(file.size || 0);
    return `📄 ${chalk.white(file.name)} ${chalk.dim(`(${size})`)}`;
  }
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

export default {
  promptUsername,
  mainMenu,
  repoMenu,
  fileMenu
};
