import _prismaClient from "../../prisma"

interface CategoryRequest {
    name: string
}

export class CreateCategoryService {
    async execute({name}: CategoryRequest) {

        if(name === "") {
            throw new Error("Invalid name")
        }

        const category = await _prismaClient.category.create({
            data: {
                name
            },
            select: {
                id: true,
                name: true
            }
        })

        return category
    }
}