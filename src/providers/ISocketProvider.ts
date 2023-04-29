import { Socket } from 'socket.io';

export interface IData {
	socket: Socket;
	from: string;
	data: any;
}

export interface ISocket {
	socket: Socket;
	email: string;
}

export interface ISocketProvider {
	onConnect(socket: ISocket): Promise<void>;
	onDisconnect(email: string): Promise<void>;
	sendMessage(props: IData): Promise<void>;
}
