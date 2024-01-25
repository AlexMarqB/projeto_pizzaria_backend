import { NextFunction, Request, Response} from 'express'

export function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof Error) {
        //se for uma instancia de erro 
        return res.status(400).json({error: err.message})
    }
    return res.status(500).json({status: "error", message: "Internal Server Error"})
}