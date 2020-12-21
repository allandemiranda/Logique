const mongoose = require('../dataBase');
const Schema = mongoose.Schema;
const turl = require('turl');
const mongoose_autopopulate = require("mongoose-autopopulate");

const bcrypt = require('bcryptjs');

const UrlSchema = new Schema({
	original: {
		type: String,
		required: true
	},
	encurtada: {
		type: String
	},
	autor: {
		type: Schema.Types.ObjectId,
		ref: "Usuario",
		required: true,
		autopopulate: true
	}
},
	{
		timestamps: true,
	}
);

UrlSchema.pre('save', async function(next) {
	const url = await turl.shorten(this.original);
	const parts = url.split('/');
	this.encurtada = parts[parts.length - 1];
	next();
})

UrlSchema.plugin(mongoose_autopopulate);

const Url = mongoose.model('Url', UrlSchema);

module.exports = Url;