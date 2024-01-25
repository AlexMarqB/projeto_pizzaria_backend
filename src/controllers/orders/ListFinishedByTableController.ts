import { Request, Response } from "express";
import { ListFinishedByTableService } from "../../services/order/ListFinishedByTableService";

export class ListFinishedByTableController {
    async handle(req: Request, res: Response) {

        const table = Number(req.query.table);

        const listByTableService = new ListFinishedByTableService()

        const orders = await listByTableService.execute({table})

        return res.json(orders)
    }
}