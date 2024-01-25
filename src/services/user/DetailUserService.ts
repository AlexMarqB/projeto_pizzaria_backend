import _prismaClient from "../../prisma";

export class DetailUserService {
	async execute(user_id: string) {
		const user = await _prismaClient.user.findFirst({
			where: {
				id: user_id,
			},
            select: {
                id: true,
                name: true,
                email: true
            }
		});

		return user;
	}
}
