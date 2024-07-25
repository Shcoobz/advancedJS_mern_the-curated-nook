import { DATE, REGEX, REPLACEMENT } from "../../../config/common/constants";

export function formatDate(date) {
  return new Intl.DateTimeFormat(DATE.locale, {
    dateStyle: DATE.dateStyle,
    timeStyle: DATE.timeStyle,
  })
    .format(date)
    .replace(REGEX.removePeriodSpace, REPLACEMENT.singleSpace);
}
