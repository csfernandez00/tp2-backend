const { userService } = require("../services");
const { validationResult } = require("express-validator");
const User = require("../models/user");

const register = async (req, res) => {
	const { email, password } = req.body;
	const resultValidation = validationResult(req);
	const hasErrors = !resultValidation.isEmpty();
	if (hasErrors) {
		return res.status(400).send(resultValidation);
	}
	const newUser = new User({
		email,
		password,
	});
	const result = await userService.register(newUser).catch((error) => error);
	return res.status(result.status).send(result);
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const resultValidation = validationResult(req);
	const hasErrors = !resultValidation.isEmpty();
	if (hasErrors) {
		return res.status(400).send(resultValidation);
	}

	const result = await userService
		.login(email, password)
		.catch((error) => error);
	return res.status(result.status).send(result);
};

const addFav = async (req, res) => {
	const { userId, animeId } = req.body;
	const result = await userService.addFav(userId, animeId);
	return res.status(result.status).send(result);
};

module.exports = {
	register,
	login,
	addFav,
};
