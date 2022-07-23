function shuffle_pick(arr: number[]) {
  const arr2: number[] = [];
  for (let len = arr.length; len > 0; ) {
    let rnd = Math.floor(Math.random() * len);
    arr2.push(arr[rnd]);
    arr[rnd] = arr[--len];
  }
  return arr2;
}

function randomRange(min: number, max: number) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

export default function randomRedpocket(threshold = 0.618) {
  return function (money: number, count: number) {
    let result: number[] = [];
    for (let i = 0; i < count - 1; i++) {
      const value = randomRange(0.01, money * threshold);
      result.push(value);
      money = money - value;
    }
    result.push(parseFloat(money.toFixed(2)));
    result = shuffle_pick(result);
    return result;
  };
}
