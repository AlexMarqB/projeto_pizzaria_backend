import { hash } from "bcryptjs";
import _prismaClient from "../../prisma";

interface UserRequest {
	name: string;
	email: string;
	password: string;
}

export class CreateUserService {
	async execute({ name, email, password }: UserRequest) {
		if (!email) {
			throw new Error("Email missing");
		}

		const userAlreadyExists = await _prismaClient.user.findFirst({
			where: {
				email: email,
			},
		});

		if (userAlreadyExists) {
			throw new Error("User already exists");
		}

        const passwordHash = await hash(password, 8)

		const user = await _prismaClient.user.create({
			data: {
				name,
				email,
				password: passwordHash,
			},
            select: {
                id: true,
                name: true,
                email: true,
            }
		});

		return user;
	}
}
