export default function withAlpha(c: string, a: number): string {
  return c + Math.floor(255 * a).toString(16);
}
