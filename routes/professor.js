// routes/professor.js

const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

// Rotas principais
router.get('/', professorController.getAllProfessores);
router.get('/:id', professorController.getProfessorById);
router.get('/:id/turmas', professorController.getTurmasByProfessor);
router.put('/:id', professorController.updateProfessor);
router.post('/:id/turmas', professorController.addTurma);
router.get('/departamento/:departamento', professorController.getByDepartamento);
router.delete('/:id', professorController.deleteProfessor);

module.exports = router;
