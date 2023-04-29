import jwt from 'jsonwebtoken';

export function generateToken(payload: any, expiresIn: number = 86400): string {
	return jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn });
}

export function verifyToken(token: string): any {
	try {
		return jwt.verify(token, process.env.SECRET_KEY as string);
	} catch (err) {
		return null;
	}
}
