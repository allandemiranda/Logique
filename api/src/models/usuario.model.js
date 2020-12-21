const mongoose = require('../dataBase');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
	nome: {
		type: String,
		required: true
	},
	login: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	senha: {
		type: String,
		required: true,
		select: false
	}
});

UsuarioSchema.pre('save', async function(next){
	const hash = await bcrypt.hash(this.senha, Number(process.env.JWT_LOOP));
	this.senha = hash;
	next();
})

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports =  Usuario;