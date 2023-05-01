import { PostgresRepository } from '../../repositories/implement/PostgresRepository';
import { CreateClientController } from './createClientController';
import { CreateClientUseCase } from './createClientUseCase';

const postgresRepository = new PostgresRepository();

const createClientUseCase = new CreateClientUseCase(postgresRepository);

const createClientController = new CreateClientController(createClientUseCase);

export { createClientUseCase, createClientController };
