import express from "express";
import {
    listarFabricantes,
    criarFabricante,
    obterFabricante,
    alterarFabricante,
    deletarFabricante
} from "../controller/FabricanteController.js";

const router = express.Router();

router.get("/", listarFabricantes);
router.post("/", criarFabricante);
router.get("/:id", obterFabricante);
router.put("/:id", alterarFabricante);
router.delete("/:id", deletarFabricante);

export default router;