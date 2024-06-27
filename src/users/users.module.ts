import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";
import { AuthModule } from "src/auth/auth.module";
import { UsersService } from "./users.service";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
		AuthModule
	],
	controllers: [UsersController],
	providers: [UsersService]
})
export class UsersModule {}
