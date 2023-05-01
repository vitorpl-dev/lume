import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { generateToken } from '../../auth/jwt';
import { CreateClientUseCase } from './createClientUseCase';

export class CreateClientController {
	constructor(private createClientUseCase: CreateClientUseCase) {}

	async handle(req: Request, res: Response) {
		const { name, email, password, cep } = req.body;

		const placeholder = fs.readFileSync(path.resolve(__dirname, '..', '..', '..', 'public', 'images', 'user.png'));

		const profile: Buffer = req.file?.buffer ?? placeholder;

		try {
			const user = await this.createClientUseCase.execute({
				name,
				email,
				password,
				cep,
				profile,
			});

			const token = generateToken({ id: user.id });

			res.status(201).json({
				message: 'User created successfully',
				token,
				data: user,
			});
		} catch (error: any) {
			res.status(400).json({
				error: error.meta || 'Unexpected error',
			});
		}
	}
}
