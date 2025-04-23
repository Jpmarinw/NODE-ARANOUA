import Fabricante from "../model/Fabricante.js";
import Medicamento from "../model/Medicamento.js";

//Lista todos os fabricantes cadastrados
export const listarFabricantes = async (req, res) => {
    try {
        const fabricantes = await Fabricante.findAll();
        res.status(200).json(fabricantes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar fabricantes" });
    }
};

//Cadastra um novo fabricante
export const criarFabricante = async (req, res) => {
    try {
        const erros = [];
        if (!req.body.nome || req.body.nome.trim() === "") {
            erros.push("O campo nome é obrigatório.");
        }
        if (
            !req.body.documento_registro ||
            req.body.documento_registro.trim() === ""
        ) {
            erros.push("O campo documento de registro é obrigatório.");
        }
        if (!req.body.pais || req.body.pais.trim() === "") {
            erros.push("O campo país é obrigatório.");
        }
        if (erros.length > 0) {
            return res.status(400).json({ erros });
        }
        const registroExistente = await Fabricante.findOne({
            where: { documento_registro: req.body.documento_registro },
        });
        if (registroExistente) {
            return res.status(400).json({
                error: "Já existe um fabricante cadastrado com esse documento de registro",
            });
        }
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

//Retorna informações detalhadas de um fabricante específico
export const obterFabricante = async (req, res) => {
    try {
        const fabricante = await Fabricante.findByPk(req.params.id, {
            include: [
                {
                    model: Medicamento,
                    as: "medicamentos",
                    attributes: ["id", "nome_comercial", "principio_ativo"],
                },
            ],
        });
        if (!fabricante) {
            return res.status(404).json({ error: "Fabricante não encontrado" });
        }
        res.status(200).json(fabricante);
    } catch (error) {
        res.status(500).json({ error: "Erro ao obter fabricante" });
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
