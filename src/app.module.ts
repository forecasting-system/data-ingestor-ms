import { Module } from '@nestjs/common';
import { DataIngestorModule } from './data-ingestor/data-ingestor.module';

@Module({
  imports: [DataIngestorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
