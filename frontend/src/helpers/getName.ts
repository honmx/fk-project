export const getName = (name: string) => {
  return name.split(" ").slice(1, 2)[0];
}