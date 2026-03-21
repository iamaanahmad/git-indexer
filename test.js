#!/usr/bin/env node
/**
 * Simple test script to verify all modules load and basic functionality works
 */

import chalk from 'chalk';
import { getUser, getUserRepos } from './src/api/github.js';
import { renderProfile, renderReposTable } from './src/ui/renderer.js';

console.log(chalk.cyan.bold('\n🧪 Git Indexer CLI - Module Test\n'));

async function runTests() {
  try {
    // Test 1: API Module
    console.log(chalk.yellow('📡 Testing GitHub API Module...'));
    const testUser = await getUser('octocat');
    console.log(chalk.green('  ✓ User fetch successful'), chalk.dim(`(${testUser.login})`));
    
    // Test 2: User data
    console.log(chalk.yellow('📊 Testing User Profile...'));
    if (testUser.name && testUser.public_repos) {
      console.log(chalk.green('  ✓ User data complete'));
    }
    
    // Test 3: Repos API
    console.log(chalk.yellow('🏠 Testing Repositories API...'));
    const repos = await getUserRepos('octocat', 1, 5);
    console.log(chalk.green(`  ✓ Fetched ${repos.length} repositories`));
    
    // Test 4: Rendering
    console.log(chalk.yellow('🎨 Testing Rendering Module...'));
    console.log(chalk.dim('\n--- Profile Card Preview ---\n'));
    renderProfile(testUser);
    
    console.log(chalk.dim('\n--- Repository Table Preview ---\n'));
    renderReposTable(repos.slice(0, 3));
    
    console.log(chalk.green.bold('\n✅ All tests passed!\n'));
    console.log(chalk.blue('To start the CLI, run:'));
    console.log(chalk.white.bold('  npm start\n'));
    
  } catch (error) {
    console.error(chalk.red.bold('\n❌ Test failed!'));
    console.error(chalk.red(`Error: ${error.message}\n`));
    process.exit(1);
  }
}

console.log(chalk.dim('Testing with GitHub user: octocat (GitHub\'s public demo account)\n'));
await runTests();
