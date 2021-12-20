import { Controller } from './Controller';
import { DBMapper } from './DBMapper';
import { FinancialReportGenerator } from './FinancialReportGenerator';
import { HTMLReportPresenter } from './HTMLReportPresenter';

function main() {
  const dataGateway = new DBMapper();
  const financialReport = new FinancialReportGenerator(dataGateway);

  const htmlPresenter = new HTMLReportPresenter();
  const controller = new Controller(financialReport, htmlPresenter);

  controller.handle();
}

main();
