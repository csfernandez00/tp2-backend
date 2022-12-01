const Anime = require("../models/anime");

const getAnimes = async () => {
	let result;
	try {
		const animes = await Anime.find();
		if (!animes) {
			result = {
				status: 400,
				message: "No se encontraron animes",
			};
		} else {
			const animesList = [];
			animes.map((anime) => {
				const animePreview = {
					id: anime._id,
					title: anime.title,
					description: anime.description,
					imageUrl: anime.imageUrl,
				};
				animesList.push(animePreview);
			});
			result = {
				status: 200,
				animesList,
			};
		}
	} catch (error) {
		throw error;
	}
	return result;
};

const getAnimeDetail = async (id) => {
	let result;
	try {
		const animeFound = await Anime.findById(id);
		if (!animeFound) {
			result = {
				status: 400,
				message: "No se encontró un anime con ese id",
			};
		} else {
			result = {
				status: 200,
				animeFound,
			};
		}
	} catch (error) {
		throw error;
	}
	return result;
};

const createAnime = (newAnime) => {
	return new Promise(async (resolve, reject) => {
		const animeFound = await Anime.findOne({ title: newAnime.title });
		if (animeFound) {
			reject({
				status: 400,
				message: "Ya existe un anime con ese titulo",
			});
		}
		newAnime.save((error) => {
			if (error) {
				reject({
					status: 500,
					message: "Se produjo un error al crear el anime",
					error,
				});
			}
			resolve({
				status: 201,
				message: "Anime creado exitosamente",
			});
		});
	});
};

const deleteAnime = async (id) => {
	let result;
	const animeToDelete = await Anime.findById(id);
	if (!animeToDelete) {
		result = {
			status: 400,
			message: "No existe un anime con ese id",
		};
		return result;
	}
	try {
		await Anime.deleteOne({ _id: id });
		result = {
			status: 200,
			message: "Eliminado con exito!",
		};
	} catch (error) {
		result = {
			status: 500,
			message: "Se produjo un error al eliminar el Anime",
			error,
		};
		throw error;
	}
	return result;
};

const updateAnime = async (id, propertiesToUpdate) => {
	let result;
	const animeToUpdate = await Anime.findById(id);
	if (!animeToUpdate) {
		result = {
			status: 400,
			message: "No existe un anime con ese id",
		};
		return result;
	}
	try {
		await Anime.findOneAndUpdate(animeToUpdate._id, propertiesToUpdate);
		result = {
			status: 200,
			message: "Actualizado con exito!",
		};
	} catch (error) {
		result = {
			status: 500,
			message: "Se produjo un error al editar el Anime",
			error,
		};
	}
	return result;
};

module.exports = {
	getAnimes,
	createAnime,
	getAnimeDetail,
	deleteAnime,
	updateAnime,
};
