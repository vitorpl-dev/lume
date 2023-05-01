import IRepository from '../../repositories/IRepository';
import { ICreateClientDTO, createClientSchema } from './createClientDTO';

export class CreateClientUseCase {
	constructor(private repository: IRepository) {}

	async execute(props: ICreateClientDTO) {
		const data = createClientSchema.parse(props);

		const user = await this.repository.createClient({
			name: data.name,
			email: data.email,
			password: data.password,
			cep: data.cep,
			profile: data.profile,
		});

		return user;
	}
}
