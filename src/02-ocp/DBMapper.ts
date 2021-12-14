import { FinancialEntity } from './FinancialEntity';
import { FinancialDataGateway } from './interfaces';

export class DBMapper implements FinancialDataGateway {
  async load(): Promise<FinancialEntity[]> {
    const dataFromDatabase = require('./data.json');
    return dataFromDatabase.map((entry: any) => FinancialEntity.fromEntry(entry));
  }
}
