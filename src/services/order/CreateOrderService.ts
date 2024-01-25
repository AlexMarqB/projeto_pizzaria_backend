import _prismaClient from "../../prisma";

interface OrderRequest {
    table: number;
    name: string;
}

export class CreateOrderService {
    async execute({table, name}: OrderRequest) {

        const orderExists = await _prismaClient.order.findFirst({
            where: {
                table
            }
        })

        if(orderExists) {
            throw new Error(`Order for table ${table} already exists`)
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