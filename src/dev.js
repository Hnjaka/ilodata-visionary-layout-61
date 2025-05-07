
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting development server with temporary TypeScript configuration...');

// Run Vite with our local tsconfig
try {
  execSync('npx vite', { stdio: 'inherit' });
} catch (error) {
  console.error('Error running development server:', error);
  process.exit(1);
}
