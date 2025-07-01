import { Inject, Injectable, Logger } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { SalesDataEntry } from 'src/models/salesData.model';
import {
  SALES_REPOSITORY,
  SalesRepository,
} from 'src/storage/interface/sales.repository.interface';

@Injectable()
export class DataIngestorService {
  private readonly logger = new Logger('Data ingestor service');

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    @Inject(SALES_REPOSITORY) private readonly repository: SalesRepository,
  ) {}

  async getSalesData() {
    const salesData = await this.repository.getSalesData();
    return salesData;
  }

  async saveSalesData(data: SalesDataEntry) {
    await this.repository.saveSalesDataEntry(data);
    this.client.emit('internal.sales.persisted', data);
  }
}
