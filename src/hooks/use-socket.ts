import { useContext, useEffect, useRef } from 'react';
import { SocketContext, SocketContextValues } from '../contexts/SocketContext';
import { Socket } from 'socket.io-client';

export enum eSocketEvent {
  GroceryChanged = 'grocery-changed',
}


export const useSocket = (): SocketContextValues => {
  const context = useContext<SocketContextValues>(SocketContext);

  if (!context) {
    throw new Error('SocketContext is not provided');
  }

  return context;
};

export const useSocketEvent = (event: eSocketEvent, eventHandler: (...arg: any[]) => void) => {
  const { socket } = useSocket();
  const socketRef = useRef<Socket | null>(socket);

  useEffect(() => {
    return () => {
      unsubscribeFromSocket();
    };
  }, []);


  useEffect(() => {
    if (socketRef.current === socket) {
      return;
    }

    unsubscribeFromSocket();

    socketRef.current = socket;

    subscribeToSocket();
  }, [socket]);


  const subscribeToSocket = () => {
    const currentSocket = socketRef.current;

    if (!currentSocket) {
      return;
    }

    currentSocket.on(event, eventHandler);
  };

  const unsubscribeFromSocket = () => {
    const currentSocket = socketRef.current;

    if (!currentSocket) {
      return;
    }

    currentSocket.off(event, eventHandler);
  };
};
