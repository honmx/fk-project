export const getShortenName = (name: string) => {
  const [secondName, firstName, thirdName] = name.split(" ");

  return `${secondName} ${firstName ? firstName?.[0] + "." : ""} ${thirdName ? thirdName?.[0] + "." : ""}`;
}