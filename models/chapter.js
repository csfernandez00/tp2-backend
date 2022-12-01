const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChapterSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	chapterUrl: { type: String, required: true, unique: true },
	animeOwner: { type: Schema.Types.ObjectId, ref: "Anime" },
});

module.exports = mongoose.model("Chapter", ChapterSchema);
