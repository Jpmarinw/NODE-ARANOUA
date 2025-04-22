import Fabricante from "../model/Fabricante.js";
import Medicamento from "../model/Medicamento.js";

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
};

export const obterFabricante = async (req, res) => {
    try {
        const fabricante = await Fabricante.findByPk(req.params.id);
        if (!fabricante) {
            return res.status(404).json({ error: "Fabricante não encontrado" });
        }
        res.status(200).json(fabricante);
    } catch (error) {
        res.status(500).json({ error: "Erro ao obter fabricante" });
    }
};

export const alterarFabricante = async (req, res) => {
    try {
        const fabricante = await Fabricante.findByPk(req.params.id);
        if (!fabricante) {
            return res.status(404).json({ error: "Fabricante não encontrado" });
        }
        const { nome, documento_registro, pais } = req.body;
        await fabricante.update({ nome, documento_registro, pais });
        res.status(200).json(fabricante);
    } catch (error) {
        res.status(500).json({ error: "Erro ao alterar fabricante" });
    }
};

export const deletarFabricante = async (req, res) => {
    try {
        const fabricante = await Fabricante.findByPk(req.params.id);
        if (!fabricante) {
            return res.status(404).json({ error: "Fabricante não encontrado" });
        }
        const medicamentosVinculados = await Medicamento.findOne({
            where: { fabricante_id: fabricante.id },
        });

        if (medicamentosVinculados) {
            return res.status(400).json({
                error: "Fabricante tem medicamentos vinculados e não pode ser deletado",
            });
        }
        await fabricante.destroy();
        res.status(204).json("Fabricante deletado");
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar fabricante" });
    }
};
