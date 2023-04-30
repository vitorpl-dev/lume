import { server } from './app';

server.listen(process.env.PORT, () => {
	console.log(`Server running in http://localhost:${process.env.PORT}`);
});
