import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SalesRepository } from './interface/sales.repository.interface';
import { SalesData, SalesDataEntry } from 'src/models/salesData.model';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class SqlSalesRepository
  extends PrismaClient
  implements SalesRepository, OnModuleInit
{
  private readonly logger = new Logger('Data ingestor service');

  onModuleInit() {
    this.$connect();
    this.logger.log(`Database connected`);
  }

  async saveSalesDataEntry(data: SalesDataEntry): Promise<void> {
    await this.sales.create({
      data,
    });
  }

  async getSalesData(): Promise<SalesData> {
    const salesData = await this.sales.findMany();
    const sales = new SalesData(salesData);
    return sales;
  }
}
