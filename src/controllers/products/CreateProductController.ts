import { Request, Response } from "express";
import { CreateProductService } from "../../services/products/CreateProductService";

export class CreateProductController{
    async handle(req:Request, res: Response) {

        const {name, category_id, description, price} = req.body
        
        const createProductService = new CreateProductService()

        if(!req.file) {
            throw new Error("Error updloading file")
        } else {
            const {originalname, filename: banner} = req.file

            const product = await createProductService.execute({name, banner, category_id, description, price})

            return res.json(product)
        }
    }
}