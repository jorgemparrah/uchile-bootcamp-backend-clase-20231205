import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiParam } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {

  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get("login/:usuario/:clave")
  @ApiParam({ name: 'usuario', type: String })
  @ApiParam({ name: 'clave', type: String })
  login(@Param("usuario") usuario: string, @Param("clave") clave: string): string {
    this.logger.log('Iniciando sesión');
    this.logger.debug("El usuario es: " + usuario);
    this.logger.debug("La clave es: " + clave);
    const jwt = this.appService.login(usuario, clave);
    this.logger.log('El inicio de sesión fue exitoso');
    return jwt;
  }

  @Get("encender/:cron")
  @ApiParam({ name: 'cron', type: String })
  encenderCron(@Param("cron") cron: string): string {
    this.logger.log('Encendiendo cron');
    this.logger.debug("El cron es: " + cron);
    const respuesta = this.appService.encender(cron);
    const ambiente = this.configService.get<string>("PUERTO");
    this.logger.log('El cron fue encendido' + ambiente);
    return ambiente;
  }

  @Get("apagar/:cron")
  @ApiParam({ name: 'cron', type: String })
  apagarCron(@Param("cron") cron: string): string {
    this.logger.log('Apagando cron');
    this.logger.debug("El cron es: " + cron);
    const respuesta = this.appService.apagar(cron);
    this.logger.log('El cron fue apagado');
    return respuesta;
  }

}
