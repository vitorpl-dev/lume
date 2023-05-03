import { Decimal } from '@prisma/client/runtime';
import { z } from 'zod';

export const addLocationClientSchema = z.object({
	id: z.string(),
	name: z.string(),
	lat: z.number().transform((number) => {
		return new Decimal(number);
	}),
	long: z.number().transform((number) => {
		return new Decimal(number);
	}),
	reference: z.string().nullable(),
});

export type IAddLocationClientDTO = z.infer<typeof addLocationClientSchema>;
