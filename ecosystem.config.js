module.exports = {
  apps: [{
    name: 'moneri-spa-server',
    script: 'server.js',
    cwd: './server',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5001,
      MONGO_URI: 'mongodb+srv://moneri_user:Moneri123!@spacluster.tkhog8t.mongodb.net/moneri?retryWrites=true&w=majority&appName=SpaCluster',
      JWT_SECRET: 'A_STRONG_SECRET_KEY_HERE',
      EMAIL_USER: 'info@monerispaacademy.in',
      EMAIL_PASS: 'Info23456.',
      NOTIFICATION_EMAIL: 'info@monerispaacademy.in'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5001,
      MONGO_URI: 'mongodb+srv://moneri_user:Moneri123!@spacluster.tkhog8t.mongodb.net/moneri?retryWrites=true&w=majority&appName=SpaCluster',
      JWT_SECRET: 'A_STRONG_SECRET_KEY_HERE',
      EMAIL_USER: 'info@monerispaacademy.in',
      EMAIL_PASS: 'Info23456.',
      NOTIFICATION_EMAIL: 'info@monerispaacademy.in'
    }
  }]
};
