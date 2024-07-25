declare global {
  interface Date {
    toShortFormat: () => string;
    toVeryShortFormat: () => string;
  }
}
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DateService = {
  dateObjToDDMMYYYY: (d: any) => {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${day}-${month}-${year}`;
  },
  addDays: (myDate: any, days: number) => {
    var date = new Date(myDate);
    date.setDate(date.getDate() + days);
    return date;
  },
  toShortFormat: (date: Date) => {
    const day = date.getDate();

    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];

    // const year = this.getFullYear();
    const year = date.getFullYear();

    return `${day}-${monthName}-${year}`;
  },
  addToProtoTypeToShortFormat: () => {
    Date.prototype.toShortFormat = function () {
      const day = this.getDate();

      const monthIndex = this.getMonth();
      const monthName = monthNames[monthIndex];

      // const year = this.getFullYear();
      const year = this.getFullYear();

      return `${day}-${monthName}-${year}`;
    };

    Date.prototype.toVeryShortFormat = function () {
      // const day = this.getDate();
      const day = ("0" + this.getDate()).slice(-2);

      // const monthIndex = this.getMonth();
      // const monthName = monthNames[monthIndex];
      const month = ("0" + (this.getMonth() + 1)).slice(-2);
      // const year = this.getFullYear();
      const year = this.getFullYear().toString().substr(2, 2);

      return `${day}-${month}-${year}`;
    };
  },
};

export default DateService;
