import _prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

export class CreateProductService {
    async execute({name, banner, category_id, description, price}: ProductRequest) {

        const product = _prismaClient.product.create({
            data: {
                name,
                price,
                description,
                banner,
                category_id
            }
        })

        return product
    }
}