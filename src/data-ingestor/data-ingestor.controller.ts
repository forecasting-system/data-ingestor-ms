import { Controller } from '@nestjs/common';
import { DataIngestorService } from './data-ingestor.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { SalesDataEntryDto } from 'src/dto/salesDataEntry.dto';
import { SalesDataEntry } from 'src/models/salesData.model';

@Controller()
export class DataIngestorController {
  constructor(private readonly dataIngestorService: DataIngestorService) {}

  @MessagePattern({ cmd: 'getSalesData' })
  async handleDataIngestion() {
    return this.dataIngestorService.getSalesData();
  }

  @EventPattern('external.sales.created')
  handleSalesCreated(@Payload() salesDataEntryDto: SalesDataEntryDto) {
    const salesDataEntry = new SalesDataEntry(
      salesDataEntryDto.date,
      salesDataEntryDto.value,
    );

    return this.dataIngestorService.saveSalesData(salesDataEntry);
  }
}
