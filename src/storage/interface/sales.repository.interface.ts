import { SalesData, SalesDataEntry } from 'src/models/salesData.model';

export const SALES_REPOSITORY = 'SalesRepository';

export interface SalesRepository {
  saveSalesDataEntry(data: SalesDataEntry): Promise<void>;
  getSalesData(): Promise<SalesData>;
}
