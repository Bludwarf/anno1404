export function arrayToMap<T>(array: Array<T>, getKey, getValue) {
  return array.reduce((map: any, item: any) => {
    const value = getValue(item);
    if (value) {
      map[getKey(item)] = value;
    }
    return map;
  }, {});
}
