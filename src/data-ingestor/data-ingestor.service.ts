import { Inject, Injectable, Logger } from '@nestjs/common';
import { SalesDataEntry } from 'src/models/salesData.model';
import {
  SALES_REPOSITORY,
  SalesRepository,
} from 'src/storage/interface/sales.repository.interface';

@Injectable()
export class DataIngestorService {
  constructor(
    @Inject(SALES_REPOSITORY) private readonly repository: SalesRepository,
  ) {}

  async getSalesData() {
    const salesData = await this.repository.getSalesData();
    return salesData;
  }

  async saveSalesData(data: SalesDataEntry) {
    await this.repository.saveSalesDataEntry(data);
  }
}
