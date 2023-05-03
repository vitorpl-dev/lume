import { Request, Response } from 'express';
import { IBlackListProvider } from '../../providers/IBlackListProvider';
import { DeleteClientUseCase } from './deleteClientUseCase';

export class DeleteClientController {
	constructor(private deleteClientUseCase: DeleteClientUseCase, private blacklist: IBlackListProvider) {}

	async handle(req: Request, res: Response) {
		const { id } = req.user;

		try {
			await this.deleteClientUseCase.execute(id);

			this.blacklist.addToken(req.token);

			res.status(200).json({
				message: 'Client deleted successfully',
			});
		} catch (error: any) {
			res.status(400).json({
				error: error.meta || 'Unexpected error',
			});
		}
	}
}
