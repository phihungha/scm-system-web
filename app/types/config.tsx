export interface IConfigResponse {
  id: string;
  vatRate: number;
}

export class ConfigInput {
  vatRate: number;
  constructor(vatRate: number) {
    this.vatRate = vatRate;
  }
}
