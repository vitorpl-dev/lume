import { blackListProvider } from '../../common/blacklist';
import { PostgresRepository } from '../../repositories/implement/PostgresRepository';
import { DeleteClientController } from './deleteClientController';
import { DeleteClientUseCase } from './deleteClientUseCase';

const postgresRepository = new PostgresRepository();

const deleteClientUseCase = new DeleteClientUseCase(postgresRepository);

const deleteClientController = new DeleteClientController(deleteClientUseCase, blackListProvider);

export { deleteClientUseCase, deleteClientController };
