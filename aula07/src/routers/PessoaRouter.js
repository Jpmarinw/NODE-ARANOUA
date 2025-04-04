import express from "express";

import {
    listarPessoas,
    criarPessoa,
    listarPessoaPorID
} from "../controllers/PessoaController.js";

const router = express.Router();

router.get('/', listarPessoas);
router.post('/', criarPessoa);
router.get('/:id', listarPessoaPorID);

export default router;