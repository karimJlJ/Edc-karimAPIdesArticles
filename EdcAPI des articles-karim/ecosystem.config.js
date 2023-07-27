module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
      },
      error_file: "./logs/err.log", // Fichier de log en cas d'erreur
      max_memory_restart: "200M", // Limite de mémoire maximale pour chaque instance (200 Mo)
      instances: 3, // Nombre d'instances en parallèle
    },
  ],
};

