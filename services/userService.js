const authService = require("./authService");
const User = require("../models/user");
const Anime = require("../models/anime");

const login = (email, password) => {
	return new Promise((resolve, reject) => {
		User.findOne({ email }, (error, user) => {
			if (error) {
				reject({
					status: 500,
					message: "Se produjo un error al registrar el usuario!",
					error,
				});
			}
			if (!user || !password || !user.comparePassword(password)) {
				reject({
					status: 401,
					message: "El usuario o la clave son incorrectos!",
					error,
				});
			}
			resolve({
				status: 200,
				message: "Te has logueado correctamente!",
				token: authService.createToken(),
			});
		});
	});
};

const register = (newUser) => {
	return new Promise((resolve, reject) => {
		User.findOne({ email: newUser.email }, (error, user) => {
			if (error) {
				reject({
					status: 500,
					message: "Se produjo un error al registrar el usuario.",
					error,
				});
			}
			if (user) {
				reject({
					status: 400,
					message: "El email ingresado ya se encuentra en uso.",
					error,
				});
			}
		});
		newUser.save((error) => {
			if (error) {
				reject({
					status: 400,
					message: "Se produjo un error al registrar el usuario.",
					error,
				});
			}
			resolve({
				status: 201,
				message: "El registro se completo exitosamente",
				token: authService.createToken(),
			});
		});
	});
};

const addFav = async (userId, animeId) => {
	try {
		const userFound = await User.findById(userId);
		if (!userFound) {
			result = {
				status: 400,
				message: "No se encontro el usuario",
			};
			return result;
		}
		const animeExists = Anime.findById(animeId);
		if (!animeExists) {
			result = {
				status: 400,
				message: "No existe el anime que se quiere agregar a favoritos",
			};
			return result;
		}
		if (userFound.favorites.includes(animeId)) {
			result = {
				status: 500,
				message: "Ya fue añadido como favorito este anime",
			};
			return result;
		}
		userFound.favorites.push(animeId);
		await userFound.save();
		result = {
			status: 200,
			message: "Añadido a favoritos con exito",
		};
	} catch (error) {
		result = {
			status: 500,
			message: "Ocurrio un error al añadir a favoritos",
		};
	}
	return result;
};
module.exports = {
	login,
	register,
	addFav,
};
