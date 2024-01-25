import _prismaClient from "../../prisma";

export class ListCategoryService {
    async execute() {

        const categories = await _prismaClient.category.findMany({
            select: {
                id: true,
                name: true
            }
        })

        return categories
    }
}