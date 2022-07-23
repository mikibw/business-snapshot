const range: (start: number, end: number) => Array<number> = (start, end) => {
  return Array(end - start + 1)
    .fill(0)
    .map((_, index) => index + start);
};

export default range;
