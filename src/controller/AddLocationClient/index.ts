import { PostgresRepository } from '../../repositories/implement/PostgresRepository';
import { AddLocationClientController } from './addLocationClientController';
import { AddLocationClientUseCase } from './addLocationClientUseCase';

const postgresRepository = new PostgresRepository();

const addLocationClientUseCase = new AddLocationClientUseCase(postgresRepository);

const addLocationClientController = new AddLocationClientController(addLocationClientUseCase);

export { addLocationClientUseCase, addLocationClientController };
