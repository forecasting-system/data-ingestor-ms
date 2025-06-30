import { Inject, Injectable, Logger } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DataIngestorService {
  private readonly logger = new Logger('Data ingestor service');

  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {
    // super();
  }

  //   async onModuleInit() {
  //     await this.$connect();
  //     this.logger.log('Database connected');
  //   }

  getSalesData() {
    return 'sales data';
  }

  saveSalesData(data: any) {
    // TODO: save to database
    this.natsClient.emit('internal.sales.persisted', data);
  }
}
