import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./models/user.model";
import { AuthService } from "src/auth/auth.service";
import { SignupDTO } from "./dtos/signup.dto";
import { SigninDTO } from "./dtos/signin.dto";
import { compare } from "bcrypt";

@Injectable()
export class UsersService {
	constructor(
		@InjectModel("User")
		private readonly usersModel: Model<User>,
		private readonly authService: AuthService
	) { }

	public async signup(signupDTO: SignupDTO): Promise<User> {
		const user = new this.usersModel(signupDTO);
		return user.save();
	}

	public async signin(
		signinDTO: SigninDTO
	): Promise<{ name: string; jwtToken: string; email: string }> {
		const user = await this.findByEmail(signinDTO.email);
		const match = await this.checkPassword(signinDTO.password, user);
		if (!match) {
			throw new NotFoundException("Invalid credentials!");
		}

		const jwtToken = await this.authService.createAccessToken(user.id);
		return { name: user.name, jwtToken, email: user.email };
	}

	public async findAll(): Promise<User[]> {
		return this.usersModel.find();
	}

	private async findByEmail(email: string): Promise<User> {
		const user = await this.usersModel.findOne({ email });
		if (!user) {
			throw new NotFoundException("User not found!");
		}

		return user;
	}

	private async checkPassword(password: string, user: User): Promise<boolean> {
		const match = await compare(password, user.password);
		if (!match) {
			throw new NotFoundException("Invalid credentials!");
		}

		return match;
	}
}
