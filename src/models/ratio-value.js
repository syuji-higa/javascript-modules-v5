import { numberStrings, notNumberStrings } from './string'

/**
 * @param {string} before
 * @param {string} after
 * @param {number} ratio - [0,1]
 */
export const ratioValue = (before, after, ratio) => {
  const _strings /* :string[] */ = notNumberStrings(before)
  const _beforeNumbers /* :number[] */ = numberStrings(before).map((s) =>
    Number(s)
  )
  const _afterNumbers /* :number[] */ = numberStrings(after).map((s) =>
    Number(s)
  )

  const _changeNumbers /* :number[] */ = []
  for (let i /* :number - int[0,inf) */ = 0; _beforeNumbers.length > i; i++) {
    const _change /* :number[] */ =
      (_afterNumbers[i] - _beforeNumbers[i]) * ratio
    _changeNumbers.push(_beforeNumbers[i] + _change)
  }

  let _val /* :string */ = _strings[0]
  for (let i /* :number - int[0,inf) */ = 0; _changeNumbers.length > i; i++) {
    _val += _changeNumbers[i].toString() + _strings[i + 1]
  }

  return _val
}
