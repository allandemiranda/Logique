const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');

const Url = require('../models/url.model');

const router = express.Router();

router.post('/url/', async (req, res) => {
	const { urlOriginal } = req.body;
	const { usuario } = req;
	try {
		const url = await Url.create({ original: urlOriginal, autor: usuario });
		return res.send({ url });
	} catch (err) {
		return res.status(400).send({ error: "Erro ao registrar url" });
	}
});

router.get('/urls/', async (req, res) => {
	try {
		const urls = await Url.find();
		return res.send({ urls });
	} catch (err) {
		return res.status(400).send({ error: "Erro ao listar urls" });
	}
});

router.get('/url/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const url = await Url.findOne({ id });
		return res.send({ url });
	} catch (err) {
		return res.status(400).send({ error: "Erro ao listar url" });
	}
});

router.delete('/url/:id', async (req, res) => {
	const { id } = req.params;
	const { usuario } = req;
	try {
		const url = await Url.findOne({ id });
		if (url.autor.id === usuario.id) {
			await url.delete();
			return res.status(200).send();
		} else {
			return res.status(400).send({ error: "Usuário não pode deletar url de outro usuário" });
		}
	} catch (err) {
		return res.status(400).send({ error: "Erro ao listar url" });
	}
});

router.get('/urls/autor/', async (req, res) => {
	const { id } = req.usuario;
	try {
		const urls = await Url.find({ autor: id });
		return res.send({ urls });
	} catch (err) {
		return res.status(400).send({ error: "Erro ao listar urls do autor" });
	}
});

router.get('/urls/autor/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const urls = await Url.find({ autor: id });
		return res.send({ urls });
	} catch (err) {
		return res.status(400).send({ error: "Erro ao listar urls do autor" });
	}
});

module.exports = app => app.use('/api', authMiddleware, router);