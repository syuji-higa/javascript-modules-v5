/**
 * @param {number} p1X - position 1 x
 * @param {number} p1Y - position 1 y
 * @param {number} p2X - position 2 x
 * @param {number} p2Y - position 2 y
 * @return {number}
 */
export const coordinateLength = (p1X, p1Y, p2X, p2Y) => {
  return Math.sqrt(Math.pow(p1X - p2X, 2) + Math.pow(p1Y - p2Y, 2))
}

/**
 * @param {number[]} cTL - [0,1] color top left
 * @param {number[]} cTR - [0,1] color top right
 * @param {number[]} cBL - [0,1] color bottom left
 * @param {number[]} cBR - [0,1] color bottom right
 * @param {number} pRX - [-1,1] position ratio x
 * @param {number} pRY - [-1,1] position ratio y
 * @return {number[]} - [0,1] pickup color
 */
export const coordinatePickupColor = (cTL, cTR, cBL, cBR, pRX, pRY) => {
  // color top
  const _cT /* :number[] - [0,1] */ = cTL.map((c, i) => {
    return cTL[i] + (cTR[i] - cTL[i]) * pRX
  })
  // color bottom
  const _cB /* :number[] - [0,1] */ = cBL.map((c, i) => {
    return cBL[i] + (cBR[i] - cBL[i]) * pRX
  })
  return _cT.map((c, i) => {
    return _cT[i] + (_cB[i] - _cT[i]) * pRY
  })
}
