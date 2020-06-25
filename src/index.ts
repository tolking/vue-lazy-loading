import { LazyOptions } from '../types/index'

export default {
  install(Vue: any, options: LazyOptions = {
    useNative: true,
  }) {
    Vue.mixin({
      mounted() {
        if (!options.useNative || !('loading' in HTMLImageElement.prototype)) {
          console.log('IntersectionObserver');

        } else {
          const lazyEls = document.querySelectorAll('img, iframe')

          lazyEls.forEach(lazyEl => {
            !lazyEl.getAttribute('loading') && lazyEl.setAttribute('loading', 'lazy')
            !lazyEl.getAttribute('src') && lazyEl.setAttribute('src', lazyEl.getAttribute('data-src'))
          })
        }
      }
    })
  }
}
