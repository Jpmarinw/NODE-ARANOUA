import express from "express";

import {
    listarPessoas,
    criarPessoa,
    listarPessoaPorID,
    atualizarPessoa,
    deletarPessoa
} from "../controllers/PessoaController.js";

const router = express.Router();

router.get('/', listarPessoas);
router.post('/', criarPessoa);
router.get('/:id', listarPessoaPorID);
router.put('/:id', atualizarPessoa);
router.delete('/:id', deletarPessoa);

export default router;