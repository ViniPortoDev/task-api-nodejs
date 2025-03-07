const express = require("express");
const sequelize = require("./database");
const Tarefa = require("./models/Tarefa");
const { tarefaSchema } = require("./validations/tarefaValidation");

const app = express();
const PORT = 3000;

app.use(express.json());

// Sincroniza os modelos com o banco de dados
sequelize.sync()
    .then(() => console.log("Banco de dados sincronizado!"))
    .catch((error) => console.error("Erro ao sincronizar o banco:", error));

// Rota para listar todas as tarefas
app.get("/tarefas", async (req, res) => {
    try {
        const tarefas = await Tarefa.findAll();
        res.json(tarefas);
    } catch (error) {
        res.status(500).json({ mensagem: error.message });
    }
});

// Rota para adicionar uma nova tarefa com validação
app.post("/tarefas", async (req, res) => {
    const { error } = tarefaSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ mensagem: error.details[0].message });
    }
    
    try {
        const novaTarefa = await Tarefa.create({ titulo: req.body.titulo });
        res.status(201).json(novaTarefa);
    } catch (error) {
        res.status(500).json({ mensagem: error.message });
    }
});

// Rota para atualizar uma tarefa com validação
app.put("/tarefas/:id", async (req, res) => {
    const { error } = tarefaSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ mensagem: error.details[0].message });
    }
    
    try {
        const tarefa = await Tarefa.findByPk(req.params.id);
        if (!tarefa) {
            return res.status(404).json({ mensagem: "Tarefa não encontrada" });
        }

        await tarefa.update({
            titulo: req.body.titulo || tarefa.titulo,
            concluida: req.body.concluida !== undefined ? req.body.concluida : tarefa.concluida,
        });

        res.json(tarefa);
    } catch (error) {
        res.status(500).json({ mensagem: error.message });
    }
});

// Rota para deletar uma tarefa
app.delete("/tarefas/:id", async (req, res) => {
    try {
        const tarefa = await Tarefa.findByPk(req.params.id);
        if (!tarefa) {
            return res.status(404).json({ mensagem: "Tarefa não encontrada" });
        }

        await tarefa.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensagem: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
