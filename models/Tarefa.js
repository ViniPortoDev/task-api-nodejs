const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Tarefa = sequelize.define("Tarefa", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    concluida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    tableName: "tarefas",
    timestamps: false, // Se não precisar de createdAt/updatedAt
});

module.exports = Tarefa;
