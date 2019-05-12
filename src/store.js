/**
 * depends on 'vanix'
 * depends on 'bowser'
 */

import Vanix from 'vanix'
import Bowser from 'bowser'

// bowser
const bowser /* :Object */ = Bowser.getParser(window.navigator.userAgent)
const { browser, engin, os, platform } = bowser.parsedResult

const state /* :Object */ = {
  // assetsDir /* :String */: '/assets',
  browser /* :Object */,
  engin /* :Object */,
  os /* :Object */,
  platform /* :Object */,
  breakPoint /* :number[] - int[0,inf) */: [768, 1024],
  windowWidth /* :number - int[0,inf) */: 0,
  windowHeight /* :number - int[0,inf) */: 0,
  windowWidthLastChangedHeight /* :number - int[0,inf) */: 0,
  windowSizeType /* :string */: '',
  windowOffsetX /* :number - int[0,inf) */: 0,
  windowOffsetY /* :number - int[0,inf) */: 0,
  inviewports /* :string[] */: []
}

const mutations /* :Object */ = {
  setWindowWidth(state /* :Object */, data /* :number - int[0,inf) */) {
    state.windowWidth = data
  },
  setWindowHeight(state /* :Object */, data /* :number - int[0,inf) */) {
    state.windowHeight = data
  },
  setWindowWidthLastChangedHeight(
    state /* :Object */,
    data /* :number - int[0,inf) */
  ) {
    state.windowWidthLastChangedHeight = data
  },
  setWindowSizeType(state /* :Object */, data /* :number - int[0,inf) */) {
    state.windowSizeType = data
  },
  setWindowOffsetX(state /* :Object */, data /* :number - int[0,inf) */) {
    state.windowOffsetX = data
  },
  setWindowOffsetY(state /* :Object */, data /* :number - int[0,inf) */) {
    state.windowOffsetY = data
  },
  setInviewports(state /* :Object */, data /* :string */) {
    state.inviewports = data
  }
}

const actions /* :Object */ = {}

const vanix /* :Instance */ = new Vanix({ state, mutations, actions })

export const store /* :Object */ = vanix.create()
