import { Controller } from '@nestjs/common';
import { DataIngestorService } from './data-ingestor.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class DataIngestorController {
  constructor(private readonly dataIngestorService: DataIngestorService) {}

  @MessagePattern({ cmd: 'getSalesData' })
  async handleDataIngestion() {
    return this.dataIngestorService.getSalesData();
  }

  @EventPattern('external.sales.created')
  // TODO: data DTO
  handleSalesCreated(@Payload() data: any) {
    console.log('Sales created received', data);
    return this.dataIngestorService.saveSalesData(data);
  }
}
