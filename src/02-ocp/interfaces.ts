import { FinancialEntity } from './FinancialEntity';

export interface FinancialDataGateway {
  load(): Promise<FinancialEntity[]>;
}

export interface ReportPresenter {
  render(report: Report): Promise<string>;
}

export type Report = {
  entities: FinancialEntity[];
  total: number;
};
