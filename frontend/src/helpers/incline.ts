export const incline = (amount: number, singularForm: string, pluralForm1: string, pluralForm2: string) => {
  if (Math.abs(amount) % 10 === 1 && Math.abs(amount) !== 11) return singularForm;
  if (Math.abs(amount) % 10 >= 2 && Math.abs(amount) % 10 <= 4 && (Math.abs(amount) % 100 < 12 || Math.abs(amount) % 100 > 14)) return pluralForm1;
  return pluralForm2;
}