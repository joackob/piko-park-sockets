import Elysia from "elysia";

export const app = new Elysia();

app.onStart(({ server }) => {
  console.log(
    `Estoy escuchando en ws://${server?.hostname}:${server?.port}/ws`,
  );
});

app.ws("/ws", {
  open(ws) {
    console.log(`Nuevo cliente ${ws.id}`);
    ws.subscribe("piko-park");
    ws.publish("piko-park", `${ws.id},nuevo`);
  },
  message(ws, mensaje) {
    console.log(`Mensaje recibido de ${ws.id}: ${mensaje}`);
    ws.publish("piko-park", `${ws.id},${mensaje}`);
  },
});

export default app;
