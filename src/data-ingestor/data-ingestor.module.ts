import { Module } from '@nestjs/common';
import { DataIngestorService } from './data-ingestor.service';
import { DataIngestorController } from './data-ingestor.controller';
import { NatsModule } from 'src/transports/nats.module';
import { SqlSalesRepository } from 'src/storage/sql-sales.repository';
import { SALES_REPOSITORY } from 'src/storage/interface/sales.repository.interface';

@Module({
  controllers: [DataIngestorController],
  providers: [
    DataIngestorService,
    {
      provide: SALES_REPOSITORY,
      useClass: SqlSalesRepository,
    },
  ],
  imports: [NatsModule],
})
export class DataIngestorModule {}
