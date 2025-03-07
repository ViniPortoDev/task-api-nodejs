const { Sequelize } = require("sequelize");

// Substitua "SUA_SENHA" pela senha definida para o usuário postgres
const sequelize = new Sequelize("tarefas_db", "postgres", "xxx", {
    host: "localhost",
    dialect: "postgres",
    logging: false, // Desativa logs do Sequelize no terminal
});

sequelize.authenticate()
    .then(() => console.log("Conectado ao PostgreSQL com sucesso!"))
    .catch((error) => console.error("Erro ao conectar ao banco:", error));

module.exports = sequelize;
