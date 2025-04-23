import express from "express";
import {
    listarFabricantes,
    criarFabricante,
    obterFabricante,
    deletarFabricante
} from "../controller/FabricanteController.js";

const router = express.Router();

router.get("/", listarFabricantes);
router.post("/", criarFabricante);
router.get("/:id", obterFabricante);
router.delete("/:id", deletarFabricante);

export default router;