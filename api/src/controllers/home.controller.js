const express = require('express');

const Url = require('../models/url.model');

const router = express.Router();

router.get('/:encurtada', async (req, res) => {
	const { encurtada } = req.params;
	try {
		console.log(req)
		const url = await Url.findOne({ encurtada });
		if (!url) {
			return res.status(400).send({ error: "Url não encontrada" });
		} else {
			return res.redirect(url.original);
		}
	} catch (err) {
		return res.status(400).send({ error: "Erro ao pesquisar url" });
	}
});

module.exports = app => app.use('/', router);