export interface CountParts {
  prefix?: string;
  value: number;
  suffix?: string;
}

/** Format a count-up value with thousands grouping plus optional prefix/suffix. */
export function formatCount({ prefix = '', value, suffix = '' }: CountParts): string {
  return `${prefix}${Math.round(value).toLocaleString('en-US')}${suffix}`;
}
