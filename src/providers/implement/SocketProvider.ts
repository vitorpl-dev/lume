import { verifyToken } from '../../auth/jwt';
import { IData, ISocket, ISocketProvider } from '../ISocketProvider';

export class SocketProvider implements ISocketProvider {
	private sockets: ISocket[];
	async onConnect(socket: ISocket): Promise<void> {
		this.sockets.push(socket);
	}

	async onDisconnect(id: string): Promise<void> {
		const socket = this.sockets.find((socketio) => socketio.socket.id == id);

		if (socket) {
			this.sockets.splice(this.sockets.indexOf(socket));
		}
	}

	async authenticate(token: string): Promise<boolean> {
		const decoded = verifyToken(token);

		if (decoded) {
			return true;
		}

		return false;
	}

	async sendMessage(props: IData): Promise<void> {
		props.socket.emit(props.from, props.data);
	}
}
