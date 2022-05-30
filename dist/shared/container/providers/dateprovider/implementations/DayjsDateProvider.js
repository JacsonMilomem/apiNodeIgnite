"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayjsDateProvider = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

class DayjsDateProvider {
  compareInHours(start_date, end_date) {
    const and_date_utc = this.convertToUtc(end_date);
    const start_date_utc = this.convertToUtc(start_date);
    return (0, _dayjs.default)(and_date_utc).diff(start_date_utc, "hours");
  }

  convertToUtc(data) {
    return (0, _dayjs.default)(data).utc().local().format();
  }

  dateNow() {
    return (0, _dayjs.default)().toDate();
  }

  compareInDays(start_date, end_date) {
    const and_date_utc = this.convertToUtc(end_date);
    const start_date_utc = this.convertToUtc(start_date);
    return (0, _dayjs.default)(and_date_utc).diff(start_date_utc, "days");
  }

  addDays(days) {
    return (0, _dayjs.default)().add(days, "days").toDate();
  }

  addHours(hours) {
    return (0, _dayjs.default)().add(hours, "hour").toDate();
  }

  compareIfBefor(start_date, end_date) {
    return (0, _dayjs.default)(start_date).isBefore(end_date);
  }

}

exports.DayjsDateProvider = DayjsDateProvider;