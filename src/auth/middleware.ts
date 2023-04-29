import { NextFunction, Request, Response } from 'express';
import { verifyToken } from './jwt';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(' ')[1];
		const decoded = verifyToken(token);
		if (decoded) {
			req.user = decoded;
			return next();
		}
	}
	res.status(401).json({ message: 'Unauthorized' });
}
