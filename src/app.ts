import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import ejs from 'ejs';
import express from 'express';
import http from 'http';
import socket from 'socket.io';
import { onSocket } from './controller/SocketConnect/socket';
import { router } from './routes';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new socket.Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.engine('html', ejs.renderFile);

app.use(
	express.static('public', {
		setHeaders: function (res, path, stat) {
			if (path.endsWith('.css')) {
				res.set('Content-Type', 'text/css');
			}
			if (path.endsWith('.js')) {
				res.set('Content-Type', 'application/javascript');
			}
		},
	})
);

io.on('connection', onSocket);

export { server };
