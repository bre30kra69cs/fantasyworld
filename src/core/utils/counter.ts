export const cerateCounter = (value: number) => {
  let count = 0;

  const get = () => count;
  const increment = () => (count += 1);
  const check = () => count <= value;

  return {increment, check, get};
};
