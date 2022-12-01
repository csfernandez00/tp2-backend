const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/routes");

const app = express();

app.use(express.json());

app.use("/api", routes);

dotenv.config();

mongoose.connect(
	process.env.MONGO_DB,
	{ useNewUrlParser: true },
	(error, result) => {
		if (error) {
			return console.log(`Error al conectar a la base de datos ${error}`);
		}
		console.log("Conexion establecida!");

		app.listen(process.env.PORT, () => {
			console.log(`${process.env.MESSAGE} ${process.env.PORT}`);
		});
	}
);
