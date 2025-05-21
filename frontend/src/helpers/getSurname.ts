export const getSurname = (name: string) => {
  return name.split(" ").slice(0, 1)[0];
}