export const getTestId = (testId: string) =>
  import.meta.env.MODE === 'test' ? testId : undefined;

/**
 * Composes class names in the clsx/lite style: truthy strings joined by a
 * single space. Falsy values (including empty strings) are skipped; the type
 * signature keeps non-strings out at compile time.
 */
export function cn(...classes: (false | null | string | undefined)[]) {
  let str = '';

  for (const c of classes) if (c) str += str ? ` ${c}` : c;

  return str;
}
