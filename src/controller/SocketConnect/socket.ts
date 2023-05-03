import { Socket } from 'socket.io';
import { SocketProvider } from '../../providers/implement/SocketProvider';

const socketProvider = new SocketProvider();

interface ISocketProps {
	token: string;
	email: string;
}

interface ISocketSendProps {
	token: string;
	from: string;
	data: any;
}

export function onSocket(client: Socket) {
	console.log(`Client: [${client.id}] connected!`);

	client.on('add', async (props: ISocketProps) => {
		const isAuthenticate = await socketProvider.authenticate(props.token);

		if (isAuthenticate) {
			await socketProvider.onConnect({
				socket: client,
				email: props.email,
			});
		}
	});

	client.on('send', async (props: ISocketSendProps) => {
		const isAuthenticate = await socketProvider.authenticate(props.token);
	});

	client.on('disconnect', async () => {
		await socketProvider.onDisconnect(client.id);
		console.log(`Client: [${client.id}] disconnected!`);
	});
}
