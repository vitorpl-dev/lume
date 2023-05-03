import IRepository from '../../repositories/IRepository';
import { IAddLocationClientDTO, addLocationClientSchema } from './addLocationClientDTO';

export class AddLocationClientUseCase {
	constructor(private repository: IRepository) {}

	async execute(props: IAddLocationClientDTO) {
		const data = addLocationClientSchema.parse(props);

		const user = await this.repository.addLocationOnClient(props.id, {
			name: data.name,
			lat: data.lat,
			long: data.long,
			reference: data.reference,
		});

		return user;
	}
}
