import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

interface Payload{
    sub: string;
}

export function IsAuthenticated(req: Request, res: Response, next: NextFunction) {
    //receber o token -- o token sempre vem por este caminho
    const authToken = req.headers.authorization

    if(!authToken) {
        return res.status(401).end()
    }

    //a forma com que o token é retornado é "Bearer token...", por isso dividimos a string em um array de 2 elementos, ignoramos o primeiro(com a virgula) e pegamos o segundo
    const [, token] = authToken.split(" ")

    try {
        //validar o token -- sub == id do user
        const {sub} = verify(token, process.env.JWT_SECRET) as Payload //caso o token esteja errado retorna erro indo para o catch()

        //recuperar o id do token e colocar dentro de uma variavel user_id dentro do req sempre q uma rota chamar este middleware
        //Passando o id automaticamente para toda rota q ultilizar o middleware de validação
        req.user_id = sub

        return next()

    } catch(err) {
        return res.status(401).end()
    }
}