import { Decimal } from '@prisma/client/runtime';

export interface IAddLocationDTO {
	id: string;
	name: string;
	lat: Decimal;
	long: Decimal;
	reference: string | null;
}
