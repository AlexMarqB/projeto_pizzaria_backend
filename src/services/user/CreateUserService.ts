import { hash } from "bcryptjs";
import _prismaClient from "../../prisma";

interface UserRequest {
	name: string;
	email: string;
	password: string;
}

export class CreateUserService {
	async execute({ name, email, password }: UserRequest) {
		//validar dados
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
            //informações do create
			data: {
				name,
				email,
				password: passwordHash,
			},
            //seleciona oq vc deseja devolver (return)
            select: {
                id: true,
                name: true,
                email: true,
            }
		});

		return user;
	}
}
