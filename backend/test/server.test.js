import { createServer } from "http";
import { Server } from 'socket.io';
const Client = require('socket.io-client');

describe('Server', () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);

    io.on('connection', (socket) => {
      serverSocket = socket;
      done();
    });

    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test('should establish a connection with the client', (done) => {
    clientSocket.on('connect', () => {
      try {
        expect(clientSocket.connected).toBe(true);
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});