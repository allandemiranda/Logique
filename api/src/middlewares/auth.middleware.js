const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario.model');

module.exports = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(401).send({ error: "Token não informado" });
		}
		const parts = authHeader.split(' ');
		if (!parts.length === 2) {
			return res.status(401).send({ error: "Token contem erro de formato" });
		}
		const [scheme, token] = parts;
		if (!/^Bearer$/i.test(scheme)) {
			return res.status(401).send({ error: "Token contem erro de formato" });
		}
		jwt.verify(token, process.env.JWT_PASS, async (err, decode) => {
			if (err) {
				return res.status(401).send({ error: "Token inválido" });
			}
			const usuario = await Usuario.findById(decode.id);
			if (!usuario) {
				return res.status(401).send({ error: "Token inválido" });
			}
			req.usuario = usuario;
			return next();
		});
	} catch (err) {
		return res.status(400).send({ error: "Erro ao validar Token" });
	}
}