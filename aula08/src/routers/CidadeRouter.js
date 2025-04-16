import express from 'express';
import {
    listarCidades,
    criarCidade,
    obterCidade,
    alterarCidade,
    deletarCidade
} from '../controllers/CidadeController.js';

const router = express.Router();

router.get('/', listarCidades);
router.post('/', criarCidade);
router.get('/:id', obterCidade);
router.put('/:id', alterarCidade);
router.delete('/:id', deletarCidade);

export default router;