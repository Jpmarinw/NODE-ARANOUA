import Estado from "../models/Estado.js";
import Cidade from "../models/Cidade.js";

export const listarCidades = async (req, res) => {
    try {
        const cidades = await Cidade.findAll({
            include: {
                model: Estado,
                as: "estado",
            },
        });
    
    const response = cidades.map((cidade) => ({
        ibge: cidade.ibge,
        nome: cidade.nome,
        estado: cidade.estado.nome
    }));

    res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao listar cidades", error });
    }
}

export const criarCidade = async (req, res) => {
    const { ibge, nome, estado } = req.body;

    try {

        if (!estado) {
            return res.status(400).json({ message: "Estado não informado" });
        }

        const estadoEncontrado = await Estado.findOne({
            where: { nome: estado },
        }
        );

        const novaCidade = await Cidade.create({
            ibge,
            nome,
            estado_id: estadoEncontrado.id,
        });

        res.status(201).json(novaCidade);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao criar cidade", error });
    }
}

export  const obterCidade = async (req, res) => {
    try {
        const cidade = await Cidade.findByPk(req.params.id, {
            include: {
                model: Estado,
                as: "estado",
            },
        });

        if (!cidade) {
            return res.status(404).json({ message: "Cidade não encontrada" });
        }

        const response = {
            ibge: cidade.ibge,
            nome: cidade.nome,
            estado: cidade.estado.nome,
        };

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao obter cidade", error });
    }
}

export const alterarCidade = async (req, res) => {
    const { ibge, nome, estado } = req.body;

    try {
        if (!estado) {
            return res.status(400).json({ message: "Estado não informado" });
        }

        const estadoEncontrado = await Estado.findOne({
            where: { nome: estado }, 
        });

        if (!estadoEncontrado) {
            return res.status(404).json({ message: "Estado não encontrado" });
        }

        const cidadeAtualizada = await Cidade.update(
            {
                ibge,
                nome,
                estado_id: estadoEncontrado.id,
            },
            {
                where: { id: req.params.id },
            }
        );

        res.status(200).json({
            message: "Cidade atualizada com sucesso",
            cidadeAtualizada,

        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao atualizar cidade", error });
    }
}

export const deletarCidade = async (req, res) => {
    try {
        const cidade = await Cidade.findByPk(req.params.id);

        if (!cidade) {
            return res.status(404).json({ message: "Cidade não encontrada" });
        }

        await Cidade.destroy({
            where: { id: req.params.id },
        });

        res.status(200).json({ message: "Cidade deletada com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao deletar cidade", error });
    }
}