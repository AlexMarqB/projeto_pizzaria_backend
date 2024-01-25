import { compare } from "bcryptjs";
import _prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}

export class AuthUserService {
    async execute({email, password}: AuthRequest) {
        //verificar se o email exite

        const user = await _prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if(!user) {
            throw new Error("Email/Password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect")
        }

        //gerar token JWT e devolver os dados do user
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '15d'
            }
        )

        return {
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token: token
        }
    }
}