import { getObserver } from './util.js'
import { LazyOptions, LazyElement } from '../types/index.js'

export default {
  install(Vue: any, options: LazyOptions = {
    useNative: true,
    rootMargin: '200px',
  }) {
    Vue.mixin({
      data() {
        return {
          $io: undefined,
        }
      },
      mounted() {
        const lazyEls = document.querySelectorAll<LazyElement>('img[data-src], iframe[data-src]')

        if (!options.useNative || !('loading' in HTMLImageElement.prototype)) {
          this.$io = getObserver(options.rootMargin)

        	lazyEls.forEach((lazyEl: LazyElement) => {
	        	this.$io.observe(lazyEl)
	        })
        } else {
          lazyEls.forEach((lazyEl: LazyElement) => {
            !lazyEl.getAttribute('loading') && lazyEl.setAttribute('loading', 'lazy')
            !lazyEl.getAttribute('src') &&
              lazyEl.getAttribute('data-src') &&
              lazyEl.setAttribute('src', lazyEl.getAttribute('data-src') as string)
          })
        }
      },
      unmounted() {
        if (!options.useNative || !('loading' in HTMLImageElement.prototype)) {
          this.$io.disconnect()
        }
      }
    })
  }
}
