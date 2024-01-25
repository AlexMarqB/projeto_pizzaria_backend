import _prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

export class DetailOrderService {
    async execute({order_id}: OrderRequest) {

        const orders = await _prismaClient.item.findMany({
            where: {
                order_id
            },
            include:{
                product: true,
                order: true
            }
        })

        return orders
    }
}