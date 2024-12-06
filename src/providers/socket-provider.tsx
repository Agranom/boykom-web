import React, { PropsWithChildren, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../hooks/use-auth';
import { SocketContext } from '../contexts/SocketContext';

const SocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { accessToken } = useAuth();
  const socketsUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      connect();
    } else {
      disconnect();
    }
  }, [accessToken]);

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
    }

    setSocket(null);
    setIsConnected(false);
  };

  const connect = () => {
    if (!accessToken || !socketsUrl) {
      return;
    }

    disconnect();

    const socketInstance: Socket = io(socketsUrl, {
      auth: {
        accessToken,
      },
      reconnectionDelay: 5000,
      reconnectionAttempts: 10,
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);
  };

  return <SocketContext.Provider value={{ isConnected, socket }}>
    {children}
  </SocketContext.Provider>;

};

export default SocketProvider;
