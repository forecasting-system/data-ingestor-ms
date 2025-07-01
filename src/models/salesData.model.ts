export class SalesDataEntry {
  constructor(
    public readonly date: Date,
    public readonly value: number,
  ) {}
}

export class SalesData {
  constructor(public readonly entries: SalesDataEntry[]) {}
}
