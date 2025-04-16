import express from 'express';
import {
  listarEstados,
  criarEstado,
  obterEstado,
  alterarEstado,
  deletarEstado
  } from '../controllers/EstadoController.js';

const router = express.Router();

router.get('/', listarEstados);
router.post('/', criarEstado);
router.get('/:id', obterEstado);
router.put('/:id', alterarEstado);
router.delete('/:id', deletarEstado);

export default router;