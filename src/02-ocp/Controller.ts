import { FinancialReportGenerator } from './FinancialReportGenerator';
import { ReportPresenter } from './interfaces';

export class Controller {
  constructor(private financialReportGenerator: FinancialReportGenerator, private presenter: ReportPresenter) {}

  async handle() {
    const report = await this.financialReportGenerator.generate();
    this.presenter.render(report);
  }
}
