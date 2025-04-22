import express from "express";

import {
    listarMedicamentos,
    criarMedicamento,
    /*obterMedicamento,
    alterarMedicamento,
    deletarMedicamento*/
} from "../controller/MedicamentoController.js";

const router = express.Router();

router.get("/", listarMedicamentos);
router.post("/", criarMedicamento);
/*router.get("/:id", obterMedicamento);
router.put("/:id", alterarMedicamento);
router.delete("/:id", deletarMedicamento);
*/
export default router;
