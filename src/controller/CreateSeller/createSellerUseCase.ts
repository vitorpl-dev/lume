import IRepository from '../../repositories/IRepository';
import { ICreateSellerDTO, createSellerSchema } from './createSellerDTO';

export class CreateSellerUseCase {
	constructor(private repository: IRepository) {}

	async execute(props: ICreateSellerDTO) {
		const data = createSellerSchema.parse(props);

		const seller = await this.repository.createSeller({
			name: data.name,
			email: data.email,
			password: data.password,
			cep: data.cep,
			profile: data.profile,
		});

		return seller;
	}
}
