import { Server } from 'socket.io';
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	ServerType,
	SocketData,
} from './types/Socket.types';

let io: ServerType;

export function init(httpServer: any) {
	io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
		httpServer,
		{ 
			cors: {
			  origin: "*"
			},
		  
			// @ts-ignore
			method: 'GET',
		}
	);
	return io;
}

export function getIO(): ServerType {
	if (!io) {
		throw new Error('Socket IO not defined!');
	}
	return io;
}

export function emitSocket(type: string, params: Object) {
	try {
		// @ts-ignore
		getIO().emit(type, params);
	} catch (error) {
		console.log(error);
	}
}
