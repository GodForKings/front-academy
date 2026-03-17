'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ENVIRONMENT_CONFIG } from '../../shared/config/environment';
import { getTokens, saveTokens } from '../api/auth/tokenStorage';
import { refreshToken } from '../api/auth';

export interface SteamUpdatePayload {
  steamId: string | null;
  steamNickname: string | null;
  steamAvatar: string | null;
}

export interface FaceitUpdatePayload {
  faceitId: string | null;
  faceitNickname: string | null;
  faceitAvatar: string | null;
}

interface UseWebSocketProps {
  userId: string | null;
  onBalanceUpdate?: (balance: number) => void;
  onSteamUpdate?: (payload: SteamUpdatePayload) => void;
  onFaceitUpdate?: (payload: FaceitUpdatePayload) => void;
  onRafflesUpdate?: () => void;
}

interface UseWebSocketReturn {
  isConnected: boolean;
  error: string | null;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    if (!exp) return true;
    const expirationTime = exp * 1000;
    const bufferTime = 60 * 1000;
    return Date.now() >= expirationTime - bufferTime;
  } catch {
    return true;
  }
};

export const useWebSocket = ({
  userId,
  onBalanceUpdate,
  onSteamUpdate,
  onFaceitUpdate,
  onRafflesUpdate,
}: UseWebSocketProps): UseWebSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const refreshPromiseRef = useRef<Promise<string | null> | null>(null);

  const getValidToken = async (): Promise<string | null> => {
    const tokens = getTokens();
    if (!tokens) return null;

    if (!isTokenExpired(tokens.accessToken)) {
      return tokens.accessToken;
    }

    if (refreshPromiseRef.current) {
      return refreshPromiseRef.current;
    }

    refreshPromiseRef.current = refreshToken({
      refreshToken: tokens.refreshToken,
    })
      .then(response => {
        if ('accessToken' in response && 'refreshToken' in response) {
          saveTokens(response);
          return response.accessToken;
        }
        return null;
      })
      .catch(() => null)
      .finally(() => {
        refreshPromiseRef.current = null;
      });

    return refreshPromiseRef.current;
  };

  useEffect(() => {
    if (!userId) return;

    let isMounted = true;

    const connectSocket = async () => {
      if (!isMounted) return;

      if (socket?.connected) {
        return;
      }

      if (socket && !socket.connected) {
        socket.disconnect();
        setSocket(null);
      }

      const token = await getValidToken();
      if (!token || !isMounted) {
        return;
      }

      const apiUrl = ENVIRONMENT_CONFIG.API_URL;
      const socketUrl = apiUrl?.replace('/api', '');
      const namespace = ENVIRONMENT_CONFIG.SOCKET_USER_SYNC;
      const fullUrl = `${socketUrl}/${namespace}`;

      const newSocket = io(fullUrl, {
        auth: {
          token,
          userId,
        },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      const handleConnect = () => {
        setIsConnected(true);
        setError(null);
      };

      const handleDisconnect = () => {
        setIsConnected(false);
      };

      const handleConnectError = async (err: Error) => {
        const refreshedToken = await getValidToken();
        if (refreshedToken) {
          (
            newSocket as Socket & { auth: { token: string; userId: string } }
          ).auth = {
            token: refreshedToken,
            userId,
          };
          newSocket.connect();
          return;
        }
        setError(`Connection error: ${err.message}`);
      };

      const handleError = (message: string) => {
        setError(message);
      };

      const handleReconnectAttempt = async () => {
        const refreshedToken = await getValidToken();
        if (refreshedToken) {
          (
            newSocket as Socket & { auth: { token: string; userId: string } }
          ).auth = {
            token: refreshedToken,
            userId,
          };
        }
      };

      newSocket.on('connect', handleConnect);
      newSocket.on('disconnect', handleDisconnect);
      newSocket.on('connect_error', handleConnectError);
      newSocket.on('error', handleError);
      newSocket.io.on('reconnect_attempt', handleReconnectAttempt);

      setSocket(newSocket);
    };

    connectSocket();

    return () => {
      isMounted = false;
      if (socket) {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('connect_error');
        socket.off('error');
        socket.io.off('reconnect_attempt');
        socket.close();
      }
    };
  }, [userId]);

  useEffect(() => {
    if (!socket) return;

    const handleBalanceUpdate = (data: { balance: number }) => {
      onBalanceUpdate?.(data.balance);
    };

    const handleSteamUpdate = (data: SteamUpdatePayload) => {
      onSteamUpdate?.(data);
    };

    const handleFaceitUpdate = (data: FaceitUpdatePayload) => {
      onFaceitUpdate?.(data);
    };

    const handleRafflesUpdate = () => {
      onRafflesUpdate?.();
    };

    socket.on('balanceUpdate', handleBalanceUpdate);
    socket.on('steamUpdate', handleSteamUpdate);
    socket.on('faceitUpdate', handleFaceitUpdate);
    socket.on('rafflesUpdate', handleRafflesUpdate);

    return () => {
      socket.off('balanceUpdate', handleBalanceUpdate);
      socket.off('steamUpdate', handleSteamUpdate);
      socket.off('faceitUpdate', handleFaceitUpdate);
      socket.off('rafflesUpdate', handleRafflesUpdate);
    };
  }, [socket, onBalanceUpdate, onSteamUpdate, onFaceitUpdate, onRafflesUpdate]);

  return {
    isConnected,
    error,
  };
};
