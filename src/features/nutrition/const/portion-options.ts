interface PortionOption {
  label: string;
  value: number;
}

export const portionOptions: PortionOption[] = [
  { label: 'Маленькая (100г)', value: 100 },
  { label: 'Средняя (250г)', value: 250 },
  { label: 'Большая (350г)', value: 350 },
];