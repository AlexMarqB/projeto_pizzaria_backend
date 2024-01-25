import _prismaClient from "../../prisma"

interface RemoveRequest {
    order_id: string
}

export class RemoveOrderService {
    async execute({order_id}: RemoveRequest) {

        const order = await _prismaClient.order.delete({
            where: {
                id: order_id
            }
        })

        return order
    }
}