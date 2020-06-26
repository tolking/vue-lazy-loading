import { getVueVersion, LazyCore } from './util.js'
import { LazyOptions } from '../types/index.js'

export default {
  install(Vue: any, options: LazyOptions) {
    const lazy = new LazyCore(options)
    const version = getVueVersion(Vue)
    let config

    if (version === 2) {
      config = {
        bind: lazy.bind.bind(lazy),
        update: lazy.update.bind(lazy),
        unbind: lazy.unbind.bind(lazy),
      }
    } else {
      config = {
        mounted: lazy.bind.bind(lazy),
        updated: lazy.update.bind(lazy),
        unmounted: lazy.unbind.bind(lazy),
      }
    }

    Vue.directive('lazy', config)
  }
}
