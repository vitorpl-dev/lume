import { NextFunction, Request, Response } from 'express';
import { blackListProvider } from '../common/blacklist';
import { verifyToken } from './jwt';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(' ')[1];

		if (await blackListProvider.verifyToken(token)) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const decoded = verifyToken(token);
		if (decoded) {
			req.user = decoded;
			req.token = token;
			return next();
		}
	}
	res.status(401).json({ message: 'Unauthorized' });
}
