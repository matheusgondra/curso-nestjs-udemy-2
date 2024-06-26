import { CallbackWithoutResultAndOptionalError, Schema } from "mongoose";
import { hash } from "bcrypt";

export const UserSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	}
});

UserSchema.pre(
	"save",
	async function (next: CallbackWithoutResultAndOptionalError) {
		try {
			if (!this.isModified("password")) {
				return next();
			}

			this["password"] = await hash(this["password"], 10);
		} catch (error) {
			return next(error);
		}
	}
);
