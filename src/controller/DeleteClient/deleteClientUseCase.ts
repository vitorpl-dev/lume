import IRepository from '../../repositories/IRepository';

export class DeleteClientUseCase {
	constructor(private repository: IRepository) {}

	async execute(id: string) {
		await this.repository.deleteClient(id);
	}
}
