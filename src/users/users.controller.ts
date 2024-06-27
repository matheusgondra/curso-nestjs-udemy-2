import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { SignupDTO } from "./dtos/signup.dto";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";
import { SigninDTO } from "./dtos/signin.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Post("signup")
	public async signup(@Body() signupDTO: SignupDTO): Promise<User> {
		return await this.usersService.signup(signupDTO);
	}

	@Post("signin")
	@HttpCode(HttpStatus.OK)
	public async signin(@Body() signinDTO: SigninDTO): Promise<{ name: string, jwtToken: string, email: string }> {
		return await this.usersService.signin(signinDTO);
	}

	@Get()
	@UseGuards(AuthGuard("jwt"))
	public async findAll(): Promise<User[]> {
		return await this.usersService.findAll();
	}
}
