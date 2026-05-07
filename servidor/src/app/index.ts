import Elysia from "elysia";

export const app = new Elysia();

app.onStart(({ server }) => {
  console.log(
    `Estoy escuchando en ws://${server?.hostname}:${server?.port}/ws`,
  );
});

app.ws("/ws", {
  message(ws, mensaje) {
    ws.send(mensaje);
    console.log(`Mensaje recibido de ${ws.id}: ${mensaje}`);
  },
});

export default app;
