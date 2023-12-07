import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';

@Injectable()
export class TareasService {

  private readonly logger = new Logger(TareasService.name);

  constructor(private schedulerRegistry: SchedulerRegistry){}

  @Cron('* * * * * *', { name: "cron1" })
  prueba() {
    this.logger.log("Prueba de cron1");
  }

  @Cron(CronExpression.EVERY_5_SECONDS, { name: "cron2" })
  prueba2() {
    this.logger.log("Prueba de cron2");
  }

  @Interval('interval1', 5000)
  interval() {
    this.logger.log("Prueba de interval1");
    const fecha = this.schedulerRegistry.getCronJob("cron1").nextDates(5);
    this.logger.debug("La proximas ejecucion del cron1 es: " + fecha);
    const cron = this.schedulerRegistry.getCronJob("cron1")
  }

  @Timeout('timeout1', 6000)
  timeout1() {
    this.logger.log("Prueba de timeout1");
  }

  // @Timeout('timeout2', 12000)
  // timeout2() {
  //   const cron1 = this.schedulerRegistry.getCronJob("cron1");
  //   cron1.start();
  // }


}
