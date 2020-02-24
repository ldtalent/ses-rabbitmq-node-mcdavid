module.exports = {
  apps: [
    {
      name: 'API',
      script: 'index.js',
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
      script: 'emailWorker.js',
      instances: '1'
    }
  ]
};