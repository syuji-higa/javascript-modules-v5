/**
 * depends on 'vanix' used in '../store'
 */

import { store } from '../store'

class ClientFlagSetter {
  constructor() {
    const { platform /* Object */ } = store.state

    document.documentElement.classList.add(`is-${platform.type}`)
  }
}

export { ClientFlagSetter as default }
