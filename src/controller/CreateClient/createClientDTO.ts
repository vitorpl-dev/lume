import { z } from 'zod';

export const createClientSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
	cep: z.string().regex(/^\d{5}-?\d{3}$/i),
	profile: z.instanceof(Buffer),
});

export type ICreateClientDTO = z.infer<typeof createClientSchema>;
