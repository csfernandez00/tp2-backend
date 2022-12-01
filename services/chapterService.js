const Chapter = require("../models/chapter");
const Anime = require("../models/anime");

const getChapters = async (id) => {
	let result;
	const animeFound = await Anime.findById(id);
	if (!animeFound) {
		result = {
			status: 400,
			message: "No se encontro un anime con ese id",
		};
		return result;
	} else {
		const chaptersDetailed = await Chapter.find({ animeOwner: animeFound.id });
		const chaptersList = [];
		chaptersDetailed.map((chapter) => {
			const chapterPreview = {
				title: chapter.title,
				description: chapter.description,
				chapterUrl: chapter.chapterUrl,
			};
			chaptersList.push(chapterPreview);
		});
		result = {
			status: 200,
			chaptersList,
		};

		return result;
	}
};

const createChapter = async (title, description, chapterUrl, animeOwner) => {
	let result;
	try {
		const animeFound = await Anime.findById(animeOwner);
		if (!animeFound) {
			result = {
				status: 400,
				message: "No existe un anime con ese id",
			};
			return result;
		}
		const chapterExists = await Chapter.findOne({
			chapterUrl: chapterUrl,
		});
		if (chapterExists) {
			result = {
				status: 409,
				message: "Ya existe la url del capitulo que intenta crear",
			};
			return result;
		}
		const newChapter = new Chapter({
			title,
			description,
			chapterUrl,
			animeOwner,
		});

		await newChapter.save();
		animeFound.chapters.push(newChapter._id);
		await animeFound.save();

		result = {
			status: 201,
			message: "Capitulo creado con exito!",
		};
	} catch (error) {
		result = {
			status: 500,
			message: "Se produjo un error al intentar crear el capitulo",
			error,
		};
	}
	return result;
};

const deleteChapter = async (id) => {
	let result;
	const chapterToDelete = await Chapter.findById(id);
	if (!chapterToDelete) {
		result = {
			status: 400,
			message: "No existe un capitulo con ese id",
		};
		return result;
	}
	try {
		await Chapter.deleteOne({ _id: id });
		const animeOwner = await Anime.findById(chapterToDelete.animeOwner);
		console.log(animeOwner.chapters);
		animeOwner.chapters = animeOwner.chapters.filter(
			(chapterId) => chapterId.toString() !== id.toString()
		);
		console.log(animeOwner.chapters);
		await animeOwner.save();
		result = {
			status: 200,
			message: "Eliminado con exito!",
		};
	} catch (error) {
		result = {
			status: 500,
			message: "Se produjo un error al eliminar el Capitulo",
			error,
		};
	}
	return result;
};

const updateChapter = async (id, propertiesToUpdate) => {
	let result;
	const chapterToUpdate = await Chapter.findById(id);
	if (!chapterToUpdate) {
		result = {
			status: 400,
			message: "No existe un capitulo con ese id",
		};
		return result;
	}
	try {
		await Chapter.findOneAndUpdate(chapterToUpdate._id, propertiesToUpdate);
		result = {
			status: 200,
			message: "Actualizado con exito!",
		};
	} catch (error) {
		result = {
			status: 500,
			message: "Se produjo un error al editar el Capitulo",
			error,
		};
	}
	return result;
};

module.exports = {
	getChapters,
	createChapter,
	deleteChapter,
	updateChapter,
};
