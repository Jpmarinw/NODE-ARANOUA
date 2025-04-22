import Fabricante from "../model/Fabricante.js";

export const listarFabricantes = async (req, res) => {
    try {
        const fabricantes = await Fabricante.findAll();
        res.status(200).json(fabricantes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar fabricantes" });
    }
};

export const criarFabricante = async (req, res) => {
    try {
        const { nome, documento_registro, pais } = req.body;
        const novoFabricante = await Fabricante.create({
            nome,
            documento_registro,
            pais,
        });
        res.status(201).json(novoFabricante);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar fabricante" });
    }
}