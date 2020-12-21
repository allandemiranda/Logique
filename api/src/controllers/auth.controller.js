const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario.model');

const router = express.Router();

router.post('/local', async (req, res) => {
	const { login, senha } = req.body;
	try {
		const usuario = await Usuario.findOne({ login }).select('+senha');
		if (!usuario) {
			return res.status(400).send({ error: "Usuário não encontrado" });
		}
		if (!await bcrypt.compare(senha, usuario.senha)) {
			return res.status(400).send({ error: "Senha inválida" })
		}
		usuario.senha = undefined;
		const token = jwt.sign({ id: usuario.id }, process.env.JWT_PASS, {
			expiresIn: 10800
		});
		return res.send({ usuario, token });
	} catch(err) {
		return res.status(400).send({ error: "Erro ao autenticar usuário" })
	}
});

module.exports = app => app.use('/api/auth', router);

