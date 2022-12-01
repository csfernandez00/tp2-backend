const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
	email: { type: String, unique: true, required: true, lowercase: true },
	password: { type: String, required: true },
	registerDate: { type: Date, default: Date.now() },
	favorites: [{ type: Schema.Types.ObjectId, ref: "Anime" }],
});

UserSchema.pre("save", function (next) {
	let user = this;

	bcrypt.genSalt(10, (error, salt) => {
		if (error) {
			return next(error);
		}
		bcrypt.hash(user.password, salt, null, (error, hash) => {
			if (error) {
				return next(error);
			}
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function (password) {
	let user = this;
	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model("User", UserSchema);
