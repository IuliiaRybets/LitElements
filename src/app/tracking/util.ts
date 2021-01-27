export const UNKNOWN_DEFAULT = 'unbekannt';

export function calculateAge(birthday: Date | string | undefined) {
  if (birthday === undefined || birthday === null) {
    return undefined;
  } else if (typeof birthday === 'string') {
    birthday = new Date(birthday);
  }
  const ageDiffMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDiffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function defaultOr(param: any): any {
  if (typeof param === 'function') {
    return defaultOr(param());
  } else {
    return param?.toString() || UNKNOWN_DEFAULT;
  }
}

export function joined(values: (string | undefined)[]): string | undefined {
  const withoutEmpty = values.filter(Boolean);
  return withoutEmpty.length ? withoutEmpty.join(' | ') : undefined;
}

export function mapString(value: string | undefined, mapping: { [key: string]: string }) {
  if (value === undefined) {
    return value;
  } else {
    return mapping[value];
  }
}

export function mapBool(value: boolean | undefined, trueMapping: string, falseMapping?: string) {
  if (value === true) {
    return trueMapping;
  } else if (value === false) {
    return falseMapping;
  } else {
    return undefined;
  }
}
