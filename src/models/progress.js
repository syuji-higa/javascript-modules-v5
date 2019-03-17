import { easings } from './easing'
import { round } from './math'

/**
 * @param {string} easing
 * @param {number} time - int[0,inf)
 * @param {number} begin
 * @param {number} complete
 * @param {number} duration - int[0,inf)
 * @return {number}
 */
export const progress = (easing, time, begin, complete, duration) => {
  let _val /* :number */ = easings[easing](
    Math.min(time, duration),
    begin,
    complete - begin,
    duration
  )
  return round(_val)
}
