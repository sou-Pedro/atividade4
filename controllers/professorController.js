// controllers/professorController.js

// Array em memória para armazenar professores
const professores = [
  {
    id: "1",
    nome: "Prof. Carlos",
    idade: 40,
    departamento: "Matemática",
    turmas: [
      { codigo: "9A", disciplina: "MAT101", alunos: ["João", "Maria", "Pedro"] },
      { codigo: "10A", disciplina: "MAT201", alunos: ["Ana", "Luiz"] }
    ]
  },
  {
    id: "2",
    nome: "Prof. Ana",
    idade: 35,
    departamento: "História",
    turmas: [
      { codigo: "9A", disciplina: "HIS101", alunos: ["João", "Pedro"] },
      { codigo: "10B", disciplina: "HIS201", alunos: ["Maria", "Carlos", "Luiza"] }
    ]
  },
  {
    id: "3",
    nome: "Prof. João",
    idade: 50,
    departamento: "Ciências",
    turmas: [
      { codigo: "9A", disciplina: "CIE101", alunos: ["João", "Maria"] },
      { codigo: "9B", disciplina: "CIE101", alunos: ["Pedro", "Luiz"] }
    ]
  }
];

// Listar todos os professores
exports.getAllProfessores = (req, res) => {
  res.json(professores);
};

// Buscar professor por ID
exports.getProfessorById = (req, res) => {
  const { id } = req.params;
  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  res.json(professor);
};

// Listar todas as turmas de um professor
exports.getTurmasByProfessor = (req, res) => {
  const { id } = req.params;
  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  res.json(professor.turmas);
};

// Atualizar dados de um professor
exports.updateProfessor = (req, res) => {
  const { id } = req.params;
  const { nome, idade, departamento } = req.body;

  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  if (nome) professor.nome = nome;
  if (idade) professor.idade = idade;
  if (departamento) professor.departamento = departamento;

  res.json({ mensagem: "Professor atualizado com sucesso", professor });
};

// Adicionar uma nova turma a um professor
exports.addTurma = (req, res) => {
  const { id } = req.params;
  const { codigo, disciplina, alunos } = req.body;

  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  const novaTurma = { codigo, disciplina, alunos };
  professor.turmas.push(novaTurma);

  res.status(201).json({ mensagem: "Turma adicionada com sucesso", turma: novaTurma });
};

// Listar professores por departamento
exports.getByDepartamento = (req, res) => {
  const { departamento } = req.params;
  const filtrados = professores.filter(p => p.departamento.toLowerCase() === departamento.toLowerCase());

  if (filtrados.length === 0) {
    return res.status(404).json({ mensagem: "Nenhum professor encontrado neste departamento" });
  }

  res.json(filtrados);
};

// Remover professor
exports.deleteProfessor = (req, res) => {
  const { id } = req.params;
  const index = professores.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  professores.splice(index, 1);
  res.json({ mensagem: "Professor removido com sucesso" });
};
