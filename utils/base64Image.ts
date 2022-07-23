export default function base64Image(raw: string) {
  const prefix = 'data:image/jpeg;base64,';
  return raw.startsWith(prefix) ? raw : prefix + raw;
}
