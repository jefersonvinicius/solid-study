import { FinancialEntity } from './FinancialEntity';
import { Report, ReportPresenter } from './interfaces';

export class HTMLReportPresenter implements ReportPresenter {
  async render(report: Report): Promise<string> {
    return `
      ${this.renderStyle()}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          ${report.entities.map((e) => this.renderRow(e)).join('\n')}
        </tbody>
        ${this.renderTableFooter(report.total)}
      </table>
    `;
  }

  private renderRow(entity: FinancialEntity) {
    const color = entity.value < 0 ? '#ef5350' : '#66bb6a';
    return `
      <tr>
        <td>${entity.id}</td>
        <td>${this.date(entity.issuedAt)}</td>
        <td align="right" style="color: ${color};">${this.brl(entity.value)}</td>
      </tr>
    `;
  }

  private brl(value: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  private date(dateToFormat: Date) {
    const date = dateToFormat.getDate().toString().padStart(2, '0');
    const month = dateToFormat.getMonth().toString().padStart(2, '0');
    const year = dateToFormat.getFullYear().toString().padStart(2, '0');
    const hours = dateToFormat.getHours().toString().padStart(2, '0');
    const minutes = dateToFormat.getMinutes().toString().padStart(2, '0');

    return `${date}/${month}/${year} às ${hours}:${minutes}H`;
  }

  private renderStyle() {
    return `
    <style>
      table, th, td {
        border: 1px solid #000;
        border-collapse: collapse;
      }

      th, td {
        padding: 5px;
      }
    </style>`;
  }

  private renderTableFooter(total: number) {
    return `
      <tfoot>
        <tr>
          <td colspan="2">Total</td>
          <td align="right">${this.brl(total)}</td>
        </tr>
      </tfoot>
    `;
  }
}
