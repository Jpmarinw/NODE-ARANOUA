import express from "express";

import {
    listarPessoas,
    criarPessoa
} from "../controllers/PessoaController.js";

const router = express.Router();

router.get('/', listarPessoas);
router.post('/', criarPessoa);

export default router;