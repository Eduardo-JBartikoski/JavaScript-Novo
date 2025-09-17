const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

// 🧱 Serve arquivos HTML, CSS, JS da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

let tarefas = [
  { id: 1, titulo: "Estudar JavaScript" },
  { id: 2, titulo: "Fazer API" }
];

// Rotas da API
app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

app.post('/tarefas', (req, res) => {
  const { titulo } = req.body;
  const novaTarefa = { id: Date.now(), titulo };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.delete('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tarefas = tarefas.filter(tarefa => tarefa.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});