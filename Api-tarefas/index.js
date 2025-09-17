const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const caminhoArquivo = path.join(__dirname, 'tarefas.json');

// Função para ler tarefas do arquivo
function lerTarefas() {
  if (!fs.existsSync(caminhoArquivo)) return [];
  const dados = fs.readFileSync(caminhoArquivo);
  return JSON.parse(dados);
}

// Função para salvar tarefas no arquivo
function salvarTarefas(tarefas) {
  fs.writeFileSync(caminhoArquivo, JSON.stringify(tarefas, null, 2));
}

// Listar tarefas
app.get('/tarefas', (req, res) => {
  const tarefas = lerTarefas();
  res.json(tarefas);
});

// Adicionar tarefa
app.post('/tarefas', (req, res) => {
  const { titulo } = req.body;
  if (!titulo || typeof titulo !== 'string') {
    return res.status(400).json({ erro: 'Título inválido' });
  }
  const tarefas = lerTarefas();
  const novaTarefa = { id: Date.now(), titulo };
  tarefas.push(novaTarefa);
  salvarTarefas(tarefas);
  res.status(201).json(novaTarefa);
});

// Remover tarefa
app.delete('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let tarefas = lerTarefas();
  tarefas = tarefas.filter(tarefa => tarefa.id !== id);
  salvarTarefas(tarefas);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
