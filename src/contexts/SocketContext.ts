import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export type SocketContextValues = {
  isConnected: boolean;
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextValues>({
  isConnected: false,
  socket: null,
});
