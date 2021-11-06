export class MemoryDatabase {
  private table: Map<string, any> = new Map();

  save(id: string, entry: any) {
    this.table.set(id, entry);
  }

  get(id: string) {
    return this.table.get(id);
  }
}
