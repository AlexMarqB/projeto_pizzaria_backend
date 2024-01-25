import _prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

export class FinishOrderService {
    async execute({order_id}: OrderRequest) {

        const order = await _prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                status: true
            }
        })

        return order
    }
}