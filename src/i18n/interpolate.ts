/**
 * Replaces `{token}` placeholders in a string with the matching value from
 * `vars`. Unknown tokens are left untouched.
 *
 * interpolate("Hace más de {devYears} años", { devYears: 4 }) // "Hace más de 4 años"
 */
export const interpolate = (
  template: string,
  vars: Record<string, string | number>
): string =>
  template.replace(/\{(\w+)\}/g, (match, token: string) =>
    token in vars ? String(vars[token]) : match
  );
