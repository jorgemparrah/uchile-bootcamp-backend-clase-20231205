import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);

  constructor(private schedulerRegistry: SchedulerRegistry){}

  login(usuario, clave): string {
    try {
      this.logger.log("Obteniendo hash de la clave");
      const hash = this.hashing(clave);
      this.logger.log("Validando usuario y contraseña");
      if (usuario === "jorge" && hash === "116416549867498416") {
        this.logger.log("Usuario y contraseña válidos");
        this.logger.log("Generando JSON con información del usuario");
        const jsonInfo = {
          nombre: "Jorge",
          apellido: "Parra",
          correo: "jorge@gmail.com",
          perfil: [ "ADMINISTRADOR", "VENDEDOR" ]
        };
        this.logger.verbose("La información del usuario es: " + JSON.stringify(jsonInfo));
        this.logger.log("Generando token JWT");
        const jwt = this.obtenerJWT(jsonInfo);
        this.logger.log("Token generado");
        return jwt;
      }
    } catch (error) {
      this.logger.error("Error al iniciar sesión");
      this.logger.error(error);
      throw new UnauthorizedException("El usuario o contraseña no es válido")
    }
    this.logger.warn("Usuario y contraseña inválidos");
    throw new UnauthorizedException("El usuario o contraseña no es válido")
  }

  encender(cron: string): string {
    this.schedulerRegistry.getCronJob(cron).start();
    this.logger.log("Encendiendo cron " + cron);
    return "Cron " + cron + " encendido";
  }

  apagar(cron: string): string {
    this.schedulerRegistry.getCronJob(cron).stop();
    this.logger.log("Apagando cron " + cron);
    return "Cron " + cron + " apagado";
  }

  private hashing(clave: string): string {
    this.logger.verbose("Para obtener el hash de la clave se utiliza MD5");
    const hash = "16416549867498416";
    this.logger.debug("El hash obtenido es: " + hash);
    return hash;
    // throw new Error("No se pudo obtener el hash de la clave");
  }

  private obtenerJWT(jsonInfo: any): string {
    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9432423";
    this.logger.debug("El token JWT generado es: " + jwt);
    return jwt;
  }
}
