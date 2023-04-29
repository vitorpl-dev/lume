import { IData, ISocket, ISocketProvider } from '../ISocketProvider';

export class SocketProvider implements ISocketProvider {
	private sockets: ISocket[];
	async onConnect(socket: ISocket): Promise<void> {
		this.sockets.push(socket);
	}

	async onDisconnect(email: string): Promise<void> {
		const socket = this.sockets.find((socketio) => socketio.email == email);

		if (socket) {
			this.sockets.splice(this.sockets.indexOf(socket));
		}
	}

	async sendMessage(props: IData): Promise<void> {
		props.socket.emit(props.from, props.data);
	}
}
