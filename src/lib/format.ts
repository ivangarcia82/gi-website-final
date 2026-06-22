export interface CountParts {
  prefix?: string;
  value: number;
  suffix?: string;
  /** Decimal places to keep (e.g. 1 for "4.9"). Defaults to 0 (integer). */
  decimals?: number;
}

/** Format a count-up value with thousands grouping plus optional prefix/suffix. */
export function formatCount({ prefix = '', value, suffix = '', decimals = 0 }: CountParts): string {
  const num = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${num}${suffix}`;
}
