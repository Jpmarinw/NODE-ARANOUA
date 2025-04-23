import Medicamento from "../model/Medicamento.js";
import Fabricante from "../model/Fabricante.js";

//Lista todos os medicamentos cadastrados, incluindo os fabricantes associados
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

//Cadastra um novo medicamento, associando-o a um fabricante
export const criarMedicamento = async (req, res) => {
    try {
        const erros = [];

        if (!req.body.nome_comercial || req.body.nome_comercial.trim() === "") {
            erros.push("O campo nome comercial é obrigatório.");
        }
        if (
            !req.body.principio_ativo ||
            req.body.principio_ativo.trim() === ""
        ) {
            erros.push("O campo princípio ativo é obrigatório.");
        }
        if (
            !req.body.registro_anvisa ||
            req.body.registro_anvisa.trim() === ""
        ) {
            erros.push("O campo registro ANVISA é obrigatório.");
        }
        if (!req.body.dosagem || req.body.dosagem.trim() === "") {
            erros.push("O campo dosagem é obrigatório.");
        }
        if (!req.body.fabricante_id) {
            erros.push("O campo fabricante_id é obrigatório.");
        }

        if (erros.length > 0) {
            return res.status(400).json({ erros });
        }

        const registroExistente = await Medicamento.findOne({
            where: { registro_anvisa: req.body.registro_anvisa },
        });

        if (registroExistente) {
            return res.status(400).json({
                error: "Já existe um medicamento cadastrado com esse registro ANVISA",
            });
        }

        // Checar se o fabricante existe
        const fabricante = await Fabricante.findByPk(req.body.fabricante_id);
        if (!fabricante) {
            return res.status(404).json({ error: "Fabricante não encontrado" });
        }

        // Cria o medicamento
        const novoMedicamento = await Medicamento.create(req.body);
        return res.status(201).json(novoMedicamento);
    } catch (error) {
        return res.status(500).json({
            error: "Erro ao criar medicamento",
            detalhes: error.message,
        });
    }
};

//Retorna informações detalhadas deum medicamento espefícifico (incluindo o fabricante)
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

//Remove um medicamento do catálogo
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
