import _prismaClient from "../../prisma";

interface OrderRequest {
    table: number;
    name: string;
}

export class CreateOrderService {
    async execute({table, name}: OrderRequest) {

        const orderExists = await _prismaClient.order.findFirst({
            where: {
                table,
                draft: true
            }
        })

        if(orderExists) {
            throw new Error(`Order for table ${table} ir already open, send one first`)
        }

        const order = await _prismaClient.order.create({
            data: {
                table,
                name
            }
        })

        return order
    }
}