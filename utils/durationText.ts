export function durationText(duration: number) {
  const m = Math.floor(duration / 60);
  const s = duration % 60;
  const mt = m < 10 ? `0${m}` : m;
  const st = s < 10 ? `0${s}` : s;
  return `${mt}:${st}`;
}
