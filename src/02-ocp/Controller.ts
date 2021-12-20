import { writeFile } from 'fs/promises';
import { FinancialReportGenerator } from './FinancialReportGenerator';
import { ReportPresenter } from './interfaces';

export class Controller {
  constructor(private financialReportGenerator: FinancialReportGenerator, private presenter: ReportPresenter) {}

  async handle() {
    const report = await this.financialReportGenerator.generate();
    const markup = await this.presenter.render(report);
    await writeFile('./report.html', markup, { encoding: 'utf-8' });
  }
}
