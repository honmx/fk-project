export const getCurrentCalendarDates = (year: number, monthIndex: number, includeSublings = true) => {
  const firstDayOfCurrentMonth = new Date(year, monthIndex).getDay() || 7;
  const lastDayOfCurrentMonth = new Date(year, monthIndex + 1, 0).getDay();

  const result: Date[] = [];

  if (firstDayOfCurrentMonth !== 1 && includeSublings) {
    for (let i = 0; i < firstDayOfCurrentMonth - 1; i++) {
      const date = new Date(year, monthIndex, -i);
      result.splice(0, 0, date);
    }
  }

  let initialDay = 1;

  while (new Date(year, monthIndex, initialDay).getMonth() === Number(monthIndex)) {
    const date = new Date(year, monthIndex, initialDay++);
    result.push(date);
  }

  if (lastDayOfCurrentMonth !== 0 && includeSublings) {
    for (let i = 0; i < 6 - lastDayOfCurrentMonth + 1; i++) {
      const date = new Date(year, monthIndex + 1, i + 1);
      result.push(date);    
    }
  }

  return result;
}