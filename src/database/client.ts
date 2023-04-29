import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
	const result = await next(params);

	if ((params?.model === 'Client' || params?.model === 'Seller') && params?.args?.select?.password !== true) {
		delete result.password;
	}

	return result;
});

export { prisma };
