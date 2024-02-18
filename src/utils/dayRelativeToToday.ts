/**
 * Calculates the number of days between the current date and a given date.
 * 
 * @param {string} lastUpdatedDateString - A string representing a past date in a format recognized by the Date constructor (e.g., "2022-07-19T17:50:47Z").
 * @returns {number} The number of days between the current date and the given date. A negative number indicates the given date is in the future.
 */

const calculateDayRelativeToToday = (lastUpdatedDateString: string): number => {
  const lastUpdatedDate: Date = new Date(lastUpdatedDateString);
  const currentDate: Date = new Date();

  const timeDifference: number = currentDate.getTime() - lastUpdatedDate.getTime();
  const daysDifference: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

export default calculateDayRelativeToToday;