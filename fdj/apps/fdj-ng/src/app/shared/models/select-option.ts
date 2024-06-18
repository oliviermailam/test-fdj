export interface ISelectOption {
  value: string;
  label: string;
}

export class SelectOption {
  value: string;
  label: string;

  constructor(data: ISelectOption) {
    this.value = data.value;
    this.label = data.label;
  }
}
