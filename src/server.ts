import { app } from './app';

app.listen(process.env.PORT, () => {
	console.log(`Server running in http://localhost:${process.env.PORT}`);
});
