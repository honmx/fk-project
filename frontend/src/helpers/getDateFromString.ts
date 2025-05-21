export const getDateFromString = (date: string) => {
  const [day, month, year] = date.split(".");

  return new Date(Number(year), Number(month) - 1, Number(day));
}