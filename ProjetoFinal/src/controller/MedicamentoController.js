import Medicamento from "../model/Medicamento.js";
import Fabricante from "../model/Fabricante.js";

export const listarMedicamentos = async (req, res) => {
    try {
        const medicamentos = await Medicamento.findAll({
            include: {
                model: Fabricante,
                as: "fabricante",
                attributes: ["nome", "documento_registro", "pais"],
            },
        });

        res.status(200).json(medicamentos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar medicamentos", error });
    }
};

export const criarMedicamento = async (req, res) => {
    try {
        const novoMedicamento = await Medicamento.create(req.body);
        res.status(201).json(novoMedicamento);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar medicamento", error });
    }
};

export const obterMedicamento = async (req, res) => {
    try {
        const medicamento = await Medicamento.findByPk(req.params.id, {
            include: {
                model: Fabricante,
                as: "fabricante",
                attributes: ["nome", "documento_registro", "pais"],
            },
        });
        if (!medicamento) {
            return res
                .status(404)
                .json({ error: "Medicamento não encontrado" });
        }
        res.status(200).json(medicamento);
    } catch (error) {
        res.status(500).json({ error: "Erro ao obter medicamento", error });
    }
};

export const alterarMedicamento = async (req, res) => {
    try {
        const medicamento = await Medicamento.findByPk(req.params.id);
        if (!medicamento) {
            return res
                .status(404)
                .json({ error: "Medicamento não encontrado" });
        }
        await medicamento.update(req.body);
        res.status(200).json(medicamento);
    } catch (error) {
        res.status(500).json({ error: "Erro ao alterar medicamento", error });
    }
};

export const deletarMedicamento = async (req, res) => {
    try {
        const medicamento = await Medicamento.findByPk(req.params.id);
        if (!medicamento) {
            return res
                .status(404)
                .json({ error: "Medicamento não encontrado" });
        }
        await medicamento.destroy();
        res.status(204).json("Medicamento deletado");
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar medicamento", error });
    }
};
