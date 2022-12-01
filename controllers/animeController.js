const Anime = require("../models/anime");
const { animeService } = require("../services");

const getAnimes = async (req, res) => {
	const { id } = req.query;
	if (id) {
		const result = await animeService.getAnimeDetail(id);
		res.status(result.status).send(result);
	} else {
		const result = await animeService.getAnimes();
		res.status(result.status).send(result);
	}
};

const createAnime = async (req, res) => {
	const { title, description, imageUrl, category } = req.body;
	const newAnime = new Anime({
		title,
		description,
		imageUrl,
		category,
	});
	const result = await animeService
		.createAnime(newAnime)
		.catch((error) => error);
	return res.status(result.status).send(result);
};

const deleteAnime = async (req, res) => {
	const { id } = req.params;
	const result = await animeService.deleteAnime(id);
	return res.status(result.status).send(result);
};

const updateAnime = async (req, res) => {
	const { id } = req.params;
	const propertiesToUpdate = req.body;
	const result = await animeService.updateAnime(id, propertiesToUpdate);
	return res.status(result.status).send(result);
};

module.exports = { getAnimes, createAnime, deleteAnime, updateAnime };
