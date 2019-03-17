/**
 * depends on 'vanix'
 * depends on 'bowser'
 */

import Vanix from 'vanix'
import Bowser from 'bowser'

// bowser
const bowser /* :Object */ = Bowser.getParser(window.navigator.userAgent)
const {
  browser /* :Object */,
  engin /* :Object */,
  os /* :Object */,
  platform /* :Object */
} = bowser.parsedResult

const state /* :Object */ = {
  browser,
  engin,
  os,
  platform,
  breakPoint: /* :number[] int[0,inf) */ [768, 1024],
  windowWidth: /* :number[] int[0,inf) */ 0,
  windowHeight: /* :number[] int[0,inf) */ 0,
  windowWidthLastChangedHeight: /* :number[] int[0,inf) */ 0,
  windowSizeType: /* :string */ ''
}

const mutations /* :Object */ = {
  setWindowWidth(state /* :Object */, data /* :number[] int[0,inf) */) {
    state.windowWidth = data
  },
  setWindowHeight(state /* :Object */, data /* :number[] int[0,inf) */) {
    state.windowHeight = data
  },
  setWindowWidthLastChangedHeight(
    state /* :Object */,
    data /* :number[] int[0,inf) */
  ) {
    state.windowWidthLastChangedHeight = data
  },
  setWindowSizeType(state /* :Object */, data /* :number[] int[0,inf) */) {
    state.windowSizeType = data
  }
}

const actions /* :Object */ = {}

const vanix /* :Instance */ = new Vanix({ state, mutations, actions })

export const store /* :Object */ = vanix.create()
