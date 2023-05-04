import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { CreateSellerUseCase } from './createSellerUseCase';

export class CreateSellerController {
	constructor(private createSellerUseCase: CreateSellerUseCase) {}

	async handle(req: Request, res: Response) {
		const { name, email, password, cep } = req.body;

		const placeholder = fs.readFileSync(path.resolve(__dirname, '..', '..', '..', 'public', 'images', 'user.png'));

		const profile: Buffer = req.file?.buffer ?? placeholder;

		try {
			const seller = await this.createSellerUseCase.execute({
				name,
				email,
				password,
				cep,
				profile,
			});

			res.status(200).json({
				message: 'Seller created successfully',
				data: seller,
			});
		} catch (error: any) {
			error = JSON.parse(error.message);
			res.status(400).json({
				error: error[0].message || 'Unexpected error',
			});
		}
	}
}
