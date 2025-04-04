import express from "express";

import {
    listarPessoas
} from "../controllers/PessoaController.js";

const router = express.Router();

router.get('/', listarPessoas);

export default router;