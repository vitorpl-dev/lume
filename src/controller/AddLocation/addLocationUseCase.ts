import IRepository from '../../repositories/IRepository';
import { IAddLocationDTO } from './addLocationDTO';

export class AddLocationUseCase {
	constructor(private repository: IRepository) {}

	async execute(props: IAddLocationDTO) {
		const user = await this.repository.addLocationOnClient(props.id, {
			name: props.name,
			lat: props.lat,
			long: props.long,
			reference: props.reference,
		});

		return user;
	}
}
