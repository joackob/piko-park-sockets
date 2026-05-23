import { useEffect, useRef } from 'react';

export const useConexionWS = (
  url: string,
  {
    alEncontrarServidor,
    alCerrarseElServidor,
    alOcurrirUnProblema,
  }: {
    alEncontrarServidor: () => void;
    alCerrarseElServidor: () => void;
    alOcurrirUnProblema: () => void;
  }
) => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onopen = alEncontrarServidor;
    ws.current.onclose = alCerrarseElServidor;
    ws.current.onerror = alOcurrirUnProblema;

    return () => {
      ws.current?.close();
    };
  }, []);

  const pedirQueMiPersonajeSalte = () => {
    ws.current?.send('saltar');
  };

  return {
    pedirQueMiPersonajeSalte,
  };
};

export default useConexionWS;
