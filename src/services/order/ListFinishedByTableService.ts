import _prismaClient from "../../prisma"

interface OrderRequest {
    table: number
}

export class ListFinishedByTableService {
    async execute({table}: OrderRequest) {

        const orders = await _prismaClient.order.findMany({
            where:{
                table,
                status: true,
            }
        })

        if(!orders || orders.length <= 0) {
            throw new Error("No orders found for this table")
        }

        return orders
    }
}