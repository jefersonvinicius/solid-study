import { Report, ReportPresenter } from './interfaces';

export class HTMLReportPresenter implements ReportPresenter {
  render(report: Report): Promise<string> {
    return `
      <table></table>
    `;
  }
}
