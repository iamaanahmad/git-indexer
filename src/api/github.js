import axios from 'axios';

const API_BASE = 'https://api.github.com';
const DEFAULT_HEADERS = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'git-indexer-cli'
};

// Optional: Support for GitHub token in environment variable
const getHeaders = () => {
  const headers = { ...DEFAULT_HEADERS };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
};

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: getHeaders(),
  timeout: 10000
});

/**
 * Fetch GitHub user profile
 */
export async function getUser(username) {
  try {
    const response = await apiClient.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`User "${username}" not found`);
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch user data');
  }
}

/**
 * Fetch user's repositories
 */
export async function getUserRepos(username, page = 1, perPage = 30) {
  try {
    const response = await apiClient.get(`/users/${username}/repos`, {
      params: {
        sort: 'updated',
        direction: 'desc',
        per_page: perPage,
        page: page
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch repositories');
  }
}

/**
 * Fetch repository contents (files and directories)
 */
export async function getRepoContents(owner, repo, path = '') {
  try {
    const response = await apiClient.get(`/repos/${owner}/${repo}/contents/${path}`);
    
    // GitHub API returns a single file if path points to a file
    // Return as array for consistency
    if (!Array.isArray(response.data)) {
      return [response.data];
    }
    
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Path not found');
    }
    throw new Error('Failed to fetch repository contents');
  }
}

/**
 * Fetch file content (raw)
 */
export async function getFileContent(owner, repo, path) {
  try {
    // Use raw.githubusercontent.com for raw content
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${path}`;
    const response = await axios.get(url, { timeout: 10000 });
    return response.data;
  } catch (error) {
    // Fallback: try with main branch
    try {
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;
      const response = await axios.get(url, { timeout: 10000 });
      return response.data;
    } catch {
      throw new Error('Failed to fetch file content');
    }
  }
}

/**
 * Get rate limit info
 */
export async function getRateLimit() {
  try {
    const response = await apiClient.get('/rate_limit');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch rate limit info');
  }
}

export default {
  getUser,
  getUserRepos,
  getRepoContents,
  getFileContent,
  getRateLimit
};
