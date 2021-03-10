export function toArray(data) {
  if (typeof (data.value) === 'string') {
    return [data.value];
  }
  return data.value;
}
