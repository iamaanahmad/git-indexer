#!/usr/bin/env node

import app from '../src/index.js';

app.start().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
