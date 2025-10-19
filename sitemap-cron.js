const { exec } = require('child_process');
const path = require('path');

const run = () => {
  exec(
    `npx next-sitemap --config ${path.join(process.cwd(), 'next-sitemap.config.js')}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`[${new Date().toISOString()}] ❌ Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`[${new Date().toISOString()}] ⚠️ Stderr: ${stderr}`);
        return;
      }
      console.log(`[${new Date().toISOString()}] ✅ Sitemap generated:\n${stdout}`);
    }
  );
};

run();