import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignupDTO {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsEmail()
	@IsString()
	@IsNotEmpty()
	email: string;

	@MinLength(4)
	@IsString()
	@IsNotEmpty()
	password: string;
}
