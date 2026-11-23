type SelectOption = {
  value?: string | number;
  label?: string;
  children?: SelectOption[];
};

export function getUID(): string {
  return 'uid_xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
    const random = (Math.random() * 16) | 0;
    return (character === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
}

export function findObjectById(targetId: string | number, options: SelectOption[]): SelectOption | null {
  for (const option of options ?? []) {
    if (option.value === targetId) return option;
    if (option.children) {
      const match = findObjectById(targetId, option.children);
      if (match) return match;
    }
  }
  return null;
}

export function formatDecimal(value: number | string | null | undefined): string | number | null | undefined {
  if (value === null || value === undefined || value === '') return value;
  if (isNaN(Number(value))) return value;
  const parts = String(value).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export function parserDecimal(value: string | null | undefined): string | null | undefined {
  if (value === null || value === undefined || value === '') return value;
  return value.replace(/\$\s?|(,*)/g, '');
}

export function formatPriceToFixed(value: number | string, fixed = 2): number | string {
  if (value === null || value === undefined || value === '') return value;
  if (isNaN(Number(value))) return value;
  if (Number(value) > Number.MAX_SAFE_INTEGER) {
    return String(value).replace(/^-?\d+/g, (integer) => integer.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
  }
  return Number(value)
    .toFixed(fixed)
    .replace(/^-?\d+/g, (integer) => integer.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}
