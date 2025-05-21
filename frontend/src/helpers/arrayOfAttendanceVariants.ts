import { AttendanceType } from "@/types/AttendanceType";

export const arrayOfAttendanceVariants = <T extends AttendanceType[]>(
  array: T & ([AttendanceType] extends [T[number]] ? unknown : 'Invalid')
) => array;
// const arrayOfAllColors = <T extends Colors[]>(
//   array: T & ([Colors] extends [T[number]] ? unknown : 'Invalid')
// ) => array;