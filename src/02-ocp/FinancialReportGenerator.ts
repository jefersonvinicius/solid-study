import { FinancialDataGateway, Report } from './interfaces';

export class FinancialReportGenerator {
  constructor(private financialDataGateway: FinancialDataGateway) {}

  async generate(): Promise<Report> {
    const financialEntities = await this.financialDataGateway.load();
    return {
      entities: financialEntities,
      total: financialEntities.reduce((total, entity) => total + entity.value, 0),
    };
  }
}
