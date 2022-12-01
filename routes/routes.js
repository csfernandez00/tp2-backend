const express = require("express");
const routes = express.Router();
const {
	userController,
	animeController,
	chapterController,
} = require("../controllers");

routes.post("/register", userController.register);
routes.post("/login", userController.login);
routes.patch("/users", userController.addFav);

routes.get("/animes", animeController.getAnimes);
routes.post("/animes", animeController.createAnime);
routes.patch("/animes/:id", animeController.updateAnime);
routes.delete("/animes/:id", animeController.deleteAnime);

routes.get("/chapters", chapterController.getChapters);
routes.post("/chapters", chapterController.createChapter);
routes.delete("/chapters/:id", chapterController.deleteChapter);
routes.patch("/chapters/:id", chapterController.updateChapter);

module.exports = routes;
