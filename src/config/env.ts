export let USE_MOCK = true;

export function toggleMockMode(val: boolean) {
  USE_MOCK = val;
  return USE_MOCK;
}
