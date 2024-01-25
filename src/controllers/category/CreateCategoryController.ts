import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

export class CreateCategoryController {
    async handle(req: Request, res: Response) {
        const createCategoryService = new CreateCategoryService()

        const {name} = req.body

        const category = await createCategoryService.execute({name})

        return res.json(category)
    }
}