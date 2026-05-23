import BotonParaSaltar from '@/src/componentes/BotonParaSaltar';
import ContenedorParaCentrarTodo from '@/src/componentes/ContenedorParaCentrarTodo';
import IconoPrincipal from '@/src/componentes/IconoPrincipal';
import { useConexionWS } from '@/src/hooks/useConexionWS';
import { useTemaClaroOscuro } from '@/src/hooks/useTemaClaroOscuro';

export default function Screen() {
  const tema = useTemaClaroOscuro();
  const conexion = useConexionWS('ws://10.0.2.2:3000/ws', {
    alEncontrarServidor: tema.cambiarATemaClaro,
    alCerrarseElServidor: tema.cambiarATemaOscuro,
    alOcurrirUnProblema: tema.cambiarATemaOscuro,
  });

  return (
    <ContenedorParaCentrarTodo>
      <IconoPrincipal tema={tema.actual()} />
      <BotonParaSaltar alPresionar={conexion.pedirQueMiPersonajeSalte} />
    </ContenedorParaCentrarTodo>
  );
}
