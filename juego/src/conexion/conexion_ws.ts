type ParametrosDelConstructorConexionWS = {
  ws: WebSocket;
};

type PropiedadesConexionWS = ParametrosDelConstructorConexionWS & {
  eventos: Map<string, ({ id }: { id: string }) => void>;
};

export class ConexionWS {
  private props: PropiedadesConexionWS = {
    ws: new WebSocket("ws://localhost:3000/ws"),
    eventos: new Map<string, ({ id }: { id: string }) => void>(),
  };

  constructor({ ws }: ParametrosDelConstructorConexionWS) {
    this.props.ws = ws;
    this.props.ws.onmessage = (datos) => {
      const [id, accion_solicitada] = datos.data.split(",");
      if (this.props.eventos.has(accion_solicitada)) {
        const accion = this.props.eventos.get(accion_solicitada);
        accion!({ id });
      }
    };
  }

  alConectarseAlServidor(callback: () => void) {
    this.props.ws.onopen = callback;
    return this;
  }

  alConectarseUnJugador(callback: ({ id }: { id: string }) => void) {
    this.props.eventos.set("nuevo", callback);
    return this;
  }

  alRecibirUnaSolicitudDeSalto(callback: ({ id }: { id: string }) => void) {
    this.props.eventos.set("saltar", callback);
    return this;
  }
}

export default ConexionWS;
