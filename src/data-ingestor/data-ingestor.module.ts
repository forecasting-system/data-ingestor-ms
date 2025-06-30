import { Module } from '@nestjs/common';
import { DataIngestorService } from './data-ingestor.service';
import { DataIngestorController } from './data-ingestor.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [DataIngestorController],
  providers: [DataIngestorService],
  imports: [NatsModule],
})
export class DataIngestorModule {}
