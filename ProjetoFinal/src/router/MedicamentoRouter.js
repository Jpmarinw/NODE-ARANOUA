import express from "express";

import {
    listarMedicamentos,
    criarMedicamento,
    obterMedicamento,
    deletarMedicamento,
} from "../controller/MedicamentoController.js";

const router = express.Router();

router.get("/", listarMedicamentos);
router.post("/", criarMedicamento);
router.get("/:id", obterMedicamento);
router.delete("/:id", deletarMedicamento);

export default router;
