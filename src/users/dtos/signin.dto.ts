import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SigninDTO {
	@IsEmail()
	@IsString()
	@IsNotEmpty()
	email: string;

	@MinLength(4)
	@IsString()
	@IsNotEmpty()
	password: string;
}
