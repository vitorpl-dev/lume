import { Request, Response } from 'express';
import { AddLocationClientUseCase } from './addLocationClientUseCase';

export class AddLocationClientController {
	constructor(private addLocationClientUseCase: AddLocationClientUseCase) {}

	async handle(req: Request, res: Response) {
		const { id } = req.user;
		const { name, lat, long, reference } = req.body;

		try {
			const user = await this.addLocationClientUseCase.execute({
				id,
				name,
				lat,
				long,
				reference,
			});

			res.status(201).json({
				message: 'Location successfully added',
				data: user,
			});
		} catch (error: any) {
			res.status(400).json({
				error: error.meta || 'Unexpected error',
			});
		}
	}
}
