export const getNameAndSurname = (name: string) => {
  return name.split(" ").slice(0, 2).join(" ");
}