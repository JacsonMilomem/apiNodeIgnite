interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUtc(data: Date): string;
  dateNow(): Date;
}

export { IDateProvider };
