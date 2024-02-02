import _prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

export class SendOrderService {
    async execute({ order_id }: OrderRequest) {
        const orderItems = await _prismaClient.item.findMany({
            where: {
                order_id
            }
        });

        if (orderItems.length <= 0) {
            throw new Error("Cant send an order without items");
        }

        let itemsValue = 0;

        for (const item of orderItems) {
            const product = await _prismaClient.product.findFirst({
                where: {
                    id: item.product_id
                }
            });

            if (product) {
                const priceAsNumber = Number(product.price.replace(",", "."));
                
                itemsValue += item.amount * priceAsNumber;
            }
        }

        const order = await _prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                draft: false,
                bill: itemsValue
            }
        });

        return order;
    }
}
