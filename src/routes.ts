import { Request, Response, Router } from 'express';
import multer from 'multer';
import { createClientController } from './controller/CreateClient';
import { createSellerController } from './controller/CreateSeller';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', (req: Request, res: Response) => {
	res.status(200).json({
		hello: 'World',
	});
});

router.post('/client/create', upload.single('profile'), (req: Request, res: Response) => {
	return createClientController.handle(req, res);
});

router.post('/seller/create', upload.single('profile'), (req: Request, res: Response) => {
	return createSellerController.handle(req, res);
});

export { router };
