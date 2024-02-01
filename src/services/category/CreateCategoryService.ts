import _prismaClient from "../../prisma"

interface CategoryRequest {
    name: string
}

export class CreateCategoryService {
    async execute({name}: CategoryRequest) {

        if(name === "") {
            throw new Error("Invalid name")
        }

        const categoryAlreadyExists = await _prismaClient.category.findFirst({
            where: {
                name
            }
        })

        if(categoryAlreadyExists) {
            throw new Error("Category already exists")
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