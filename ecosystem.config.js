module.exports = {
  apps: [
    {
      name: 'API',
      script: 'index.js',
      exec_mode: 'cluster_mode',
      instances: 'max',
      env: {
        NODE_ENV: 'production',
        DEBUG: 'vevet-backend'
      }
    },
    {
      name: 'emailWorker',
      args: 'consumeMessage',
      exec_mode: 'cluster_mode',
      watch: false,
      script: 'emailWorker.js',
      instances: 'max'
    }
  ]
};