import { PostgresRepository } from '../../repositories/implement/PostgresRepository';
import { CreateSellerController } from './createSellerController';
import { CreateSellerUseCase } from './createSellerUseCase';

const postgresRepository = new PostgresRepository();

const createSellerUseCase = new CreateSellerUseCase(postgresRepository);

const createSellerController = new CreateSellerController(createSellerUseCase);

export { createSellerUseCase, createSellerController };
