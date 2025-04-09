import Pessoa from "../models/Pessoa.js";
import Cidade from "../models/Cidade.js";

// Controller para Listar as Pessoas
export const listarPessoas = async (req, res) => {
    try {
        const pessoas = await Pessoa.findAll( {
            include: { model: Cidade, as: "cidade" },
        });
        res.status(200).json(pessoas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message});
    }
};

// Controller para criar uma nova Pessoa
export const criarPessoa = async (req, res) => {
    try {
        const novaPessoa = await Pessoa.create(req.body);
        res.status(201).json(novaPessoa);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao criar pessoa",
            detalhes: error,
        });
    }
};

// Controller para listar uma pessoa por ID
export const listarPessoaPorID = async (req, res) => {
    try {
        const pessoa = await Pessoa.findByPk(req.params.id);
        if (pessoa) {
            res.status(200).json(pessoa);
        } else {
            res.status(404).json({ error: "Pessoa nao encontrada" });
        }
    } catch (error) {
        res.status(500).json({
            error: "Erro ao listar pessoa",
            detalhes: error,
        });
    }
};

// Controller para atualizar uma pessoa
export const atualizarPessoa = async (req, res) => {
    try {
        const pessoa = await Pessoa.findByPk(req.params.id);
        if (pessoa) {
            await pessoa.update(req.body);
            res.status(200).json(pessoa);
        } else {
            res.status(404).json({ error: "Pessoa nao encontrada" });
        }
    } catch (error) {
        res.status(500).json({
            error: "Erro ao atualizar pessoa",
            detalhes: error,
        });
    }
};

// Controller para deletar uma pessoa por ID
export const deletarPessoa = async (req, res) => {
    try {
        const pessoa = await Pessoa.findByPk(req.params.id);
        if (pessoa) {
            await pessoa.destroy();
            res.status(200).json({ message: "Pessoa deletada com sucesso" });
        } else {
            res.status(404).json({ error: "Pessoa nao encontrada" });
        }
    } catch (error) {
        res.status(500).json({
            error: "Erro ao deletar pessoa",
            detalhes: error,
        });
    }
};
