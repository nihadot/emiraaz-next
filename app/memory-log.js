setInterval(() => {
  const rss = process.memoryUsage().rss / 1024 / 1024;
  console.log(`Next.js RAM: ${rss.toFixed(2)} MB`);
}, 2000);
