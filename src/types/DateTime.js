import { isDate, isObject } from "locustjs-base";

class DateTime {
  constructor(value) {
    this.value = value;

    if (isDate(value)) {
      const date = DateTime.getDate(value);

      this.year = date.year;
      this.month = date.month;
      this.day = date.day;
      this.hours = date.hours;
      this.minutes = date.minutes;
      this.seconds = date.seconds;
      this.milliseconds = date.milliseconds;
    } else if (value instanceof DateTime) {
      this.year = value.year;
      this.month = value.month;
      this.day = value.day;
      this.hours = value.hours;
      this.minutes = value.minutes;
      this.seconds = value.seconds;
      this.milliseconds = value.milliseconds;
    } else if (isObject(value)) {
      const { year, month, day, hours, minutes, seconds, milliseconds } = value;

      this.year = year;
      this.month = month;
      this.day = day;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
      this.milliseconds = milliseconds;
    } else {
      this.year = 0;
      this.month = 0;
      this.day = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.milliseconds = 0;
    }
  }
  static getUTC(d) {
    const date = d === undefined ? new Date() : d;

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();

    return new DateTime({
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      milliseconds,
    });
  }
  static getDate(d) {
    const date = d === undefined ? new Date() : d;

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    return new DateTime({
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      milliseconds,
    });
  }
}

export default DateTime;
