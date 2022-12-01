const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimeSchema = new Schema({
	title: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	imageUrl: { type: String, required: true },
	category: { type: String, required: true },
	chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
});

module.exports = mongoose.model("Anime", AnimeSchema);
