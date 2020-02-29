module.exports = {
  apps: [
    {
      name: 'API',
      script: 'src/index.js',
      exec_mode: 'cluster_mode',
      instances: 'max',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'emailWorker',
      args: 'consumeMessage',
      exec_mode: 'fork',
      watch: false,
      script: 'src/emailWorker.js',
      instances: '1'
    }
  ]
};
