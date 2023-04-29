import { Client, PaymentMethod, Seller } from '@prisma/client';

export interface ILoginProps {
	email: string;
	password: string;
}

export default interface IRepository {
	// Client methods
	createClient(client: Omit<Client, 'id' | 'createdAt'>): Promise<Client>;
	updateClient(id: string, client: Partial<Client>): Promise<Client | null>;
	deleteClient(id: string): Promise<void>;
	findClientById(id: string): Promise<Client | null>;
	findAllClients(): Promise<Client[]>;

	// Seller methods
	createSeller(seller: Omit<Seller, 'id' | 'createdAt'>, paymentMethods: Omit<PaymentMethod, 'id' | 'sellerId'>[]): Promise<Seller>;
	updateSeller(id: string, seller: Partial<Seller>): Promise<Seller | null>;
	updatePaymentMethods(id: string, paymentMethods: Omit<PaymentMethod, 'id' | 'sellerId'>[]): Promise<Seller | null>;
	deleteSeller(id: string): Promise<void>;
	findSellerById(id: string): Promise<Seller | null>;
	findAllSellers(): Promise<Seller[]>;

	// Login methods
	findClientByLogin(props: ILoginProps): Promise<Client | null>;
	findSellerByLogin(props: ILoginProps): Promise<Seller | null>;
}
