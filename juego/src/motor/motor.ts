import Matter from "matter-js";
import { crearMarco, crearUnCirculo } from "@cuerpos/cuerpos";

interface PropiedadesDelMotorFisico {
  lienzo: HTMLCanvasElement;
  cuerpos: Matter.Body[];
  render: Matter.Render;
  motor: Matter.Engine;
  ejecutor: Matter.Runner;
  personajes: Map<string, Matter.Body>;
}

interface ParametrosDelConstructorDelMotorFisico {
  lienzo: HTMLCanvasElement;
  cuerpos?: Matter.Body[];
  motor?: Matter.Engine;
  ejecutor?: Matter.Runner;
}

export class MotorFisico {
  private props: PropiedadesDelMotorFisico;

  constructor({
    lienzo,
    cuerpos = [],
    motor = Matter.Engine.create(),
    ejecutor = Matter.Runner.create(),
  }: ParametrosDelConstructorDelMotorFisico) {
    const limitesDelLienzo = lienzo.getBoundingClientRect();
    const render = Matter.Render.create({
      canvas: lienzo,
      engine: motor,
      options: {
        width: limitesDelLienzo.width,
        height: limitesDelLienzo.height,
        background: "transparent",
        wireframes: false,
      },
    });
    Matter.World.add(motor.world, cuerpos);
    const marco = crearMarco(lienzo);
    this.props = {
      cuerpos: [...marco, ...cuerpos],
      personajes: new Map<string, Matter.Body>(),
      lienzo,
      motor,
      ejecutor,
      render,
    };
  }

  private ejecutar(): MotorFisico {
    Matter.Render.run(this.props.render);
    Matter.Runner.run(this.props.ejecutor, this.props.motor);
    return this;
  }

  private detener(): MotorFisico {
    Matter.Render.stop(this.props.render);
    Matter.Runner.stop(this.props.ejecutor);
    return this;
  }

  comenzar(): MotorFisico {
    const configuracionParaDetectarIntersecciones: IntersectionObserverInit = {
      root: document.getElementById("haikus-container"),
      rootMargin: "0px",
      threshold: 1.0,
    };
    const ejecutarMotorSiEsVisibleParaElUsuario: IntersectionObserverCallback =
      (entries): void => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.ejecutar();
          } else {
            this.detener();
          }
        });
      };
    const observador = new IntersectionObserver(
      ejecutarMotorSiEsVisibleParaElUsuario,
      configuracionParaDetectarIntersecciones,
    );
    observador.observe(this.props.lienzo);
    return this;
  }

  antesDeActualizar(callback: () => void): MotorFisico {
    Matter.Events.on(this.props.motor, "beforeUpdate", callback);
    return this;
  }

  despuesDeActualizar(callback: () => void): MotorFisico {
    Matter.Events.on(this.props.motor, "afterUpdate", callback);
    return this;
  }

  agregarCuerpo(cuerpo: Matter.Body): MotorFisico {
    Matter.World.add(this.props.motor.world, cuerpo);
    return this;
  }

  agregarPersonaje({ id }: { id: string }): MotorFisico {
    const limitesLienzo = this.props.lienzo.getBoundingClientRect();
    const circulo = crearUnCirculo({
      x: limitesLienzo.width / 2,
      y: limitesLienzo.height / 2,
      radio: 10,
      colorDeRelleno: "#000",
    });
    this.props.personajes.set(id, circulo);
    this.agregarCuerpo(circulo);
    return this;
  }

  aplicarSaltoAUnPersonaje({ id }: { id: string }): MotorFisico {
    if (this.props.personajes.has(id)) {
      const personaje = this.props.personajes.get(id);
      Matter.Body.applyForce(personaje!, personaje?.position!, {
        x: 0,
        y: -0.001,
      });
    }
    return this;
  }
}
