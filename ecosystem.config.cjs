module.exports = {
  apps: [
    {
      name: "xiaojieapiserver",
      script: "./app.js",
      watch: true,
      env: {
        "PORT": 3000,
        "NODE_ENV": "development",
        "AES_128_CBC_KEY": 'a1b3c5d79a8s7d6f',
        "AES_128_CBC_IV": '9a8s7d6fa1b3c5d7',
        "JWT_SECRET_KEY": 'fengyexiaojieapi2024p',
        "DB_USER": 'root',
        "DB_PWD": 'wjj162017.',
        "DB_HOST": 'localhost'
      },
      env_production: {
        "PORT": 3000,
        "NODE_ENV": "production",
        "AES_128_CBC_KEY": 'a1b3c5d79a8s7d6f',
        "AES_128_CBC_IV": '9a8s7d6fa1b3c5d7',
        "JWT_SECRET_KEY": 'fengyexiaojieapi2024p',
        "DB_USER": 'root',
        "DB_PWD": 'Wang162017.',
        "DB_HOST": '127.0.0.1'
      }
    }
  ]
}