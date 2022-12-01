const { chapterService } = require("../services");

const getChapters = async (req, res) => {
	const { id } = req.query;
	const result = await chapterService.getChapters(id);
	return res.status(result.status).send(result);
};

const createChapter = async (req, res) => {
	const { title, description, chapterUrl, animeOwner } = req.body;
	const result = await chapterService.createChapter(
		title,
		description,
		chapterUrl,
		animeOwner
	);
	return res.status(result.status).send(result);
};

const deleteChapter = async (req, res) => {
	const { id } = req.params;
	const result = await chapterService.deleteChapter(id);
	return res.status(result.status).send(result);
};

const updateChapter = async (req, res) => {
	const { id } = req.params;
	const propertiesToUpdate = req.body;
	const result = await chapterService.updateChapter(id, propertiesToUpdate);
	return res.status(result.status).send(result);
};

module.exports = {
	getChapters,
	createChapter,
	deleteChapter,
	updateChapter,
};
