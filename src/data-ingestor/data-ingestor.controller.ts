import {
  BadRequestException,
  Controller,
  Inject,
  Logger,
} from '@nestjs/common';
import { DataIngestorService } from './data-ingestor.service';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { SalesDataEntryDto } from 'src/dto/salesDataEntry.dto';
import { SalesDataEntry } from 'src/models/salesData.model';
import { NATS_SERVICE } from 'src/config';

@Controller()
export class DataIngestorController {
  constructor(
    private readonly dataIngestorService: DataIngestorService,
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  private readonly logger = new Logger(DataIngestorController.name);

  @MessagePattern('getSalesData')
  async handleDataIngestion() {
    const salesData = await this.dataIngestorService.getSalesData();
    this.logger.log('Sales data retrieved');
    return salesData;
  }

  @EventPattern('external.sales.created')
  handleSalesCreated(@Payload() salesDataEntryDto: SalesDataEntryDto) {
    this.logger.log('Triggers on external.sales.created');

    // if (salesDataEntryDto.date.getDate() !== 1) {
    //   throw new BadRequestException(
    //     'Invalida data. Sales data is not the first day of the month',
    //   );
    // }
    const salesDataEntry = new SalesDataEntry(
      salesDataEntryDto.date,
      salesDataEntryDto.value,
    );

    this.dataIngestorService.saveSalesData(salesDataEntry);
    this.client.emit('internal.sales.persisted', salesDataEntry);
    this.logger.log('Sales data persisted emitted');
  }
}
