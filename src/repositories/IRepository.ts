import { Client, Location, PaymentMethod, Seller } from '@prisma/client';

export interface ILoginProps {
	email: string;
	password: string;
}

export interface ITokenId {
	id: string;
	token: string;
}

export default interface IRepository {
	// Client methods
	createClient(client: Omit<Client, 'id' | 'createdAt' | 'token'>): Promise<Client>;
	updateClient(id: string, client: Partial<Client>): Promise<Client | null>;
	updateTokenInClient(id: string, token: string): Promise<Client | null>;
	deleteClient(id: string): Promise<void>;
	addLocationOnClient(id: string, location: Omit<Location, 'id' | 'createdAt' | 'clientId'>): Promise<Client | null>;
	findClientById(id: string): Promise<Client | null>;
	findClientByIdToken(props: ITokenId): Promise<Client | null>;
	findAllClients(): Promise<Client[]>;

	// Seller methods
	createSeller(seller: Omit<Seller, 'id' | 'createdAt' | 'token'>): Promise<Seller>;
	updateSeller(id: string, seller: Partial<Seller>): Promise<Seller | null>;
	updateTokenInSeller(id: string, token: string): Promise<Seller | null>;
	updatePaymentMethods(id: string, paymentMethods: Omit<PaymentMethod, 'id' | 'sellerId'>[]): Promise<Seller | null>;
	deleteSeller(id: string): Promise<void>;
	findSellerById(id: string): Promise<Seller | null>;
	findSellerByIdToken(props: ITokenId): Promise<Seller | null>;
	findAllSellers(): Promise<Seller[]>;

	// Login methods
	findClientByLogin(props: ILoginProps): Promise<Client | null>;
	findSellerByLogin(props: ILoginProps): Promise<Seller | null>;
}
