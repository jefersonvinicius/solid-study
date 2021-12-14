interface FinancialAttrs {
  id: string;
  value: number;
  issuedAt: Date;
}

export class FinancialEntity implements FinancialAttrs {
  id: string;
  value: number;
  issuedAt: Date;

  constructor(attrs: FinancialAttrs) {
    this.id = attrs.id;
    this.value = attrs.value;
    this.issuedAt = attrs.issuedAt;
  }

  static fromEntry(entry: any) {
    return new FinancialEntity({
      id: entry._id,
      value: entry.amount,
      issuedAt: new Date(entry.date_str),
    });
  }
}
