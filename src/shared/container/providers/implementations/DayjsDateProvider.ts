import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../dateprovider/IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const and_date_utc = this.convertToUtc(end_date);
    const start_date_utc = this.convertToUtc(start_date);

    return dayjs(and_date_utc).diff(start_date_utc, "hours");
  }

  convertToUtc(data: Date): string {
    return dayjs(data).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DayjsDateProvider };
