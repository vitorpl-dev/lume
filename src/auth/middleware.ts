import { NextFunction, Request, Response } from 'express';
import { blackListProvider } from '../common/blacklist';
import { PostgresRepository } from '../repositories/implement/PostgresRepository';
import { verifyToken } from './jwt';

const postgresRepository = new PostgresRepository();

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(' ')[1];

		if (await blackListProvider.verifyToken(token)) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const decoded = verifyToken(token);
		if (decoded) {
			if (await postgresRepository.findClientByIdToken({ id: decoded.id, token: token })) {
				req.user = decoded;
				req.token = token;
				return next();
			} else {
				res.status(401).json({ message: 'Unauthorized' });
			}
		}
	}
	res.status(401).json({ message: 'Unauthorized' });
}
