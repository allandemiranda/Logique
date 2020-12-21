const express = require('express');
const bcrypt = require('bcryptjs');

const authMiddleware = require('../middlewares/auth.middleware');

const Usuario = require('../models/usuario.model');

const router = express.Router();

router.post('/usuario/', async (req, res) => {
	const { login } = req.body;
	try {
		if (await Usuario.findOne({ login })) {
			return res.status(400).send({ error: "Usuário existente" });
		}
		const usuario = await Usuario.create(req.body);
		usuario.senha = undefined;
		return res.send({ usuario });
	} catch (err) {
		return res.status(400).send({ error: "Erro ao registrar usuário" });
	}
});

router.get('/usuarios/', async (req, res) => {
	try {
		const usuarios = await Usuario.find();
		return res.send({ usuarios });
	} catch (err) {
		return res.status(400).send({ error: "Erro ao listar usuários" });
	}
});

router.get('/usuario/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const usuario = await Usuario.findById(id);
		return res.send({ usuario });
	} catch (err) {
		return res.status(400).send({ error: "Erro ao listar usuário" });
	}
});

router.put('/usuario/:id', async (req, res) => {
	const { id } = req.params;
	const { nome, login, senha } = req.body;
	try {
		var usuario = await Usuario.findById(id);
		if (!nome) {
			usuario.nome = nome;
		}
		if (!login) {
			usuario.login = login;
		}
		if (!senha) {
			const hash = await bcrypt.hash(senha, Number(process.env.JWT_LOOP));
			usuario.senha = hash;
		}
		usuario = await usuario.save();
		return res.send({ usuario });
	} catch (err) {
		return res.status(400).send({ error: "Erro ao atualizar usuário" });
	}
});

router.delete('/usuario/:id', async (req, res) => {
	const { id } = req.params;
	try {
		var usuario = await Usuario.findById(id);
		await usuario.delete();
		return res.status(200).send();
	} catch (err) {
		return res.status(400).send({ error: "Erro ao deletar usuário" });
	}
});

module.exports = app => app.use('/api', authMiddleware, router);