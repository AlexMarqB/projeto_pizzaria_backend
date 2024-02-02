import _prismaClient from "../../prisma";

interface OrderRequest {
    table: number;
}

export class ListFinishedByTableService {
    async execute({ table }: OrderRequest) {
        const orders = await _prismaClient.order.findMany({
            where: {
                table,
                status: true,
            },
        });

        if (!orders || orders.length <= 0) {
            throw new Error("No orders found for this table");
        }

        const orderItemsMap: { [orderId: string]: any[] } = {};

        for (const order of orders) {
            try {
                const items = await _prismaClient.item.findMany({
                    where: {
                        order_id: order.id
                    },
                    include: {
                        product: true
                    }
                });

                orderItemsMap[order.id] = items;
            } catch (error) {
                console.error('Erro ao recuperar itens:', error);
            }
        }

        return { orders, orderItems: orderItemsMap };
    }
}
