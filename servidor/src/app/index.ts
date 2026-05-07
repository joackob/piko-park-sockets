import Elysia from "elysia";

export const app = new Elysia();

app.onStart(({ server }) => {
  console.log(
    `Estoy escuchando en ws://${server?.hostname}:${server?.port}/ws`,
  );
});

app.ws("/ws", {
  open(ws) {
    ws.subscribe("piko-park");
  },
  message(ws, mensaje) {
    console.log(`Mensaje recibido de ${ws.id}: ${mensaje}`);
    ws.publish("piko-park", mensaje);
  },
});

export default app;
