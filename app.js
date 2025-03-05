const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const FILE_PATH = "tarefas.json";

app.use(express.json());

// Função para ler o arquivo JSON
const lerTarefas = () => {
    const data = fs.readFileSync(FILE_PATH);
    return JSON.parse(data);
};

// Função para salvar tarefas no arquivo JSON
const salvarTarefas = (tarefas) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tarefas, null, 2));
};

// Rota para listar todas as tarefas
app.get("/tarefas", (req, res) => {
    const tarefas = lerTarefas();
    res.json(tarefas);
});

// Rota para adicionar uma nova tarefa
app.post("/tarefas", (req, res) => {
    const tarefas = lerTarefas();
    const novaTarefa = {
        id: tarefas.length + 1,
        titulo: req.body.titulo,
        concluida: false
    };

    tarefas.push(novaTarefa);
    salvarTarefas(tarefas);

    res.status(201).json(novaTarefa);
});

// Rota para atualizar uma tarefa
app.put("/tarefas/:id", (req, res) => {
    const tarefas = lerTarefas();
    const id = parseInt(req.params.id);
    const index = tarefas.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Tarefa não encontrada" });
    }

    tarefas[index].titulo = req.body.titulo || tarefas[index].titulo;
    tarefas[index].concluida = req.body.concluida !== undefined ? req.body.concluida : tarefas[index].concluida;
    
    salvarTarefas(tarefas);
    res.json(tarefas[index]);
});

// Rota para deletar uma tarefa
app.delete("/tarefas/:id", (req, res) => {
    let tarefas = lerTarefas();
    const id = parseInt(req.params.id);
    const novasTarefas = tarefas.filter(t => t.id !== id);

    if (tarefas.length === novasTarefas.length) {
        return res.status(404).json({ mensagem: "Tarefa não encontrada" });
    }

    salvarTarefas(novasTarefas);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
