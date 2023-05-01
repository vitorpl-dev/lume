import { Client, Location, PaymentMethod, Seller } from '@prisma/client';
import { createHash } from 'crypto';
import { prisma } from '../../database/client';
import IRepository, { ILoginProps } from '../IRepository';

export class PostgresRepository implements IRepository {
	private createMd5(password: string): string {
		const hash = createHash('md5');
		hash.update(password);
		return hash.digest('hex');
	}

	// Client Methods
	async createClient(client: Omit<Client, 'id' | 'createdAt' | 'profile'>): Promise<Client> {
		const newClient = await prisma.client.create({
			data: {
				name: client.name,
				email: client.email,
				password: this.createMd5(client.password),
				cep: client.cep,
			},
		});

		return newClient;
	}

	async updateClient(id: string, client: Partial<Client>): Promise<Client | null> {
		const updatedClient = await prisma.client.update({
			where: {
				id,
			},
			data: client,
		});

		return updatedClient;
	}

	async deleteClient(id: string): Promise<void> {
		await prisma.client.delete({
			where: {
				id,
			},
		});
	}

	async addLocationOnClient(id: string, location: Omit<Location, 'id' | 'createdAt' | 'clientId'>): Promise<Client | null> {
		const updatedClient = await prisma.client.update({
			where: {
				id,
			},
			data: {
				location: {
					create: [location],
				},
			},
			include: {
				location: true,
			},
		});

		return updatedClient;
	}

	async findClientById(id: string): Promise<Client | null> {
		const findedClient = await prisma.client.findFirst({
			where: {
				id,
			},
		});

		return findedClient;
	}

	async findAllClients(): Promise<Client[]> {
		const clients = await prisma.client.findMany();

		return clients;
	}

	// Seller Methods
	async createSeller(seller: Omit<Seller, 'id' | 'createdAt'>): Promise<Seller> {
		const newSeller = await prisma.seller.create({
			data: {
				name: seller.name,
				email: seller.email,
				password: this.createMd5(seller.password),
				cep: seller.cep,
				profile: seller.profile,
			},
		});
		return newSeller;
	}

	async updateSeller(id: string, seller: Partial<Seller>): Promise<Seller | null> {
		const updatedSeller = await prisma.seller.update({
			where: {
				id,
			},
			data: seller,
		});

		return updatedSeller;
	}

	async updatePaymentMethods(id: string, paymentMethods: Omit<PaymentMethod, 'id' | 'sellerId'>[]): Promise<Seller | null> {
		const updatedPaymentMethods = await prisma.seller.update({
			where: {
				id,
			},
			data: {
				paymentMethods: {
					create: paymentMethods,
				},
			},
		});

		return updatedPaymentMethods;
	}

	async deleteSeller(id: string): Promise<void> {
		await prisma.seller.delete({
			where: {
				id,
			},
		});
	}

	async findAllSellers(): Promise<Seller[]> {
		const sellers = await prisma.seller.findMany();

		return sellers;
	}

	async findClientByLogin(props: ILoginProps): Promise<Client | null> {
		const client = await prisma.client.findFirst({
			where: {
				email: props.email,
				password: this.createMd5(props.password),
			},
		});

		return client;
	}

	async findSellerById(id: string): Promise<Seller | null> {
		const seller = await prisma.seller.findFirst({
			where: {
				id,
			},
		});

		return seller;
	}

	async findSellerByLogin(props: ILoginProps): Promise<Seller | null> {
		const seller = await prisma.seller.findFirst({
			where: {
				email: props.email,
				password: this.createMd5(props.password),
			},
		});

		return seller;
	}
}
