/**
 * @param {number} offset - int
 * @return {number} int[0,inf)
 */
export const areaTimestamp = (offset) => {
  const _date /* :Date */ = new Date()
  const _utc /* :number - int[0,inf) */ = _date.getTime()
  const _deviceOffset /* :number - int */ = _date.getTimezoneOffset()
  return _utc + 1000 * 60 * (_deviceOffset + offset * 60)
}

/**
 * @param {number} offset - int
 * @return {Object}
 * @property {number} year - int[0,inf)
 * @property {number} day - int[0,6]
 * @property {number} date - int[1,31]
 * @property {number} month - int[0,11]
 * @property {number} hours - int[0,23]
 * @property {number} minutes - int[0,59]
 * @property {number} milliseconds - int[0,999]
 */
export const areaDate = (offset) => {
  const _offsetDate /* :Date */ = new Date(areaTimestamp(offset))

  return {
    year: _offsetDate.getFullYear(),
    day: _offsetDate.getDay(),
    date: _offsetDate.getDate(),
    month: _offsetDate.getMonth(),
    hours: _offsetDate.getHours(),
    minutes: _offsetDate.getMinutes(),
    milliseconds: _offsetDate.getMilliseconds()
  }
}

/**
 * @param {number} num - int[0,6]
 * @return {string[]}
 */
export const toDayOfWeekEn = (num) => {
  const _DAY = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  return _DAY[num]
}

/**
 * @param {number} num - int[0,11]
 * @return {Array<string>}
 */
export const toMonthEn = (num) => {
  const _MONTH = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  return _MONTH[num]
}
