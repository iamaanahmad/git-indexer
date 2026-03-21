import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import { renderProfile } from './ui/renderer.js';
import { promptUsername, mainMenu, repoMenu, fileMenu } from './ui/interactive.js';
import { getUser, getUserRepos, getRepoContents, getFileContent } from './api/github.js';
import stripAnsi from 'strip-ansi';

class GitIndexerApp {
  constructor() {
    this.currentUser = null;
    this.currentRepos = null;
    this.currentRepo = null;
    this.currentPath = '';
    this.pathHistory = [];
  }

  async start() {
    this.showHeader();
    await this.mainLoop();
  }

  showHeader() {
    console.clear();
    console.log(chalk.cyan(figlet.textSync('Git Indexer', { horizontalLayout: 'default' })));
    console.log(chalk.dim('━'.repeat(60)));
    console.log(chalk.blue('🚀 GitHub Profile & Repository Explorer CLI'));
    console.log(chalk.dim('━'.repeat(60)));
    console.log();
  }

  async mainLoop() {
    while (true) {
      if (!this.currentUser) {
        const username = await promptUsername();
        if (!username) continue;

        await this.loadUserData(username);
      } else {
        const action = await mainMenu(this.currentUser);
        
        if (action === 'view-profile') {
          this.displayProfile();
        } else if (action === 'browse-repos') {
          await this.browseRepos();
        } else if (action === 'search-new') {
          this.currentUser = null;
          this.currentRepos = null;
          console.clear();
        } else if (action === 'exit') {
          console.log(chalk.green('\n👋 Goodbye!\n'));
          process.exit(0);
        }
      }
    }
  }

  async loadUserData(username) {
    try {
      const spinner = (await import('ora')).default('Fetching user data...', { prefixText: '⏳' });
      spinner.start();

      this.currentUser = await getUser(username);
      this.currentRepos = await getUserRepos(username);

      spinner.succeed(`User ${chalk.cyan(username)} loaded successfully!`);
      console.log();
      this.displayProfile();
    } catch (error) {
      const spinner = (await import('ora')).default('', { prefixText: '❌' });
      spinner.fail(chalk.red(`Failed to load user: ${error.message}`));
      console.log();
      this.currentUser = null;
    }
  }

  displayProfile() {
    console.clear();
    renderProfile(this.currentUser);
    console.log();
  }

  async browseRepos() {
    if (!this.currentRepos || this.currentRepos.length === 0) {
      console.log(chalk.yellow('No repositories found.'));
      return;
    }

    const selectedRepo = await repoMenu(this.currentRepos);
    if (!selectedRepo) return;

    this.currentRepo = selectedRepo;
    this.currentPath = '';
    this.pathHistory = [];
    await this.browseFiles();
  }

  async browseFiles() {
    while (true) {
      try {
        const contents = await getRepoContents(this.currentUser.login, this.currentRepo.name, this.currentPath);
        
        if (!contents || contents.length === 0) {
          const { action } = await inquirer.prompt([
            {
              type: 'list',
              name: 'action',
              message: 'Empty directory. What would you like to do?',
              choices: [
                { name: 'Go back', value: 'back' },
                { name: 'Return to main menu', value: 'main' }
              ]
            }
          ]);

          if (action === 'back') {
            this.currentPath = this.pathHistory.length > 0 ? this.pathHistory[this.pathHistory.length - 1].path : '';
            this.pathHistory.pop();
          } else {
            return;
          }
          continue;
        }

        const selected = await fileMenu(contents, this.currentPath, this.currentRepo.name);
        
        if (selected === 'back') {
          if (this.pathHistory.length > 0) {
            const previous = this.pathHistory.pop();
            this.currentPath = previous.path;
          } else {
            return;
          }
        } else if (selected === 'main') {
          return;
        } else {
          const file = contents.find(f => f.name === selected);
          if (file.type === 'dir') {
            this.pathHistory.push({ path: this.currentPath });
            this.currentPath = this.currentPath ? `${this.currentPath}/${file.name}` : file.name;
          } else {
            await this.viewFileContent(file);
          }
        }
      } catch (error) {
        console.log(chalk.red(`❌ Error: ${error.message}`));
        const { retry } = await inquirer.prompt([
          { type: 'confirm', name: 'retry', message: 'Try again?', default: false }
        ]);
        if (!retry) return;
      }
    }
  }

  async viewFileContent(file) {
    try {
      const spinner = (await import('ora')).default('Loading file content...', { prefixText: '⏳' });
      spinner.start();

      const content = await getFileContent(this.currentUser.login, this.currentRepo.name, `${this.currentPath}${this.currentPath ? '/' : ''}${file.name}`);
      spinner.stop();

      console.clear();
      console.log(chalk.cyan(`📄 ${file.name}`) + chalk.dim(` (${file.size} bytes)`));
      console.log(chalk.dim('─'.repeat(60)));
      
      // Get syntax highlighting
      const { highlightCode } = await import('./ui/renderer.js');
      const highlighted = highlightCode(content, file.name);
      console.log(highlighted);
      
      console.log(chalk.dim('─'.repeat(60)));
      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            { name: 'Go back to file browser', value: 'back' },
            { name: 'Return to main menu', value: 'main' }
          ]
        }
      ]);

      if (action === 'main') {
        this.currentPath = '';
        this.pathHistory = [];
      }
    } catch (error) {
      console.log(chalk.red(`❌ Error loading file: ${error.message}`));
      await inquirer.prompt([{ type: 'confirm', name: 'ok', message: 'OK', default: true }]);
    }
  }
}

export default new GitIndexerApp();
