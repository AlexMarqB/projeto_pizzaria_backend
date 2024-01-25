import _prismaClient from "../../prisma"

interface RemoveRequest {
    order_id: string
}

export class RemoveOrderService {
    async execute({order_id}: RemoveRequest) {

        const orderItems = await _prismaClient.item.findMany({
            where: {
                order_id
            }
        })

        if(orderItems.length > 0) {
            throw new Error("Cant delete an order with items")
        }

        const order = await _prismaClient.order.delete({
            where: {
                id: order_id
            }
        })

        return order
    }
}