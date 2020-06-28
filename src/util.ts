import { LazyOptions, LazyBinding, LazyElement } from '../types/index.js'

export class LazyCore {
  private useNative: boolean
  private rootMargin: string
  private type: 'loading' | 'observer' | 'none' = 'loading'
  private io?: IntersectionObserver

  constructor(options: LazyOptions) {
    this.useNative = options?.useNative ?? true
    this.rootMargin = options?.rootMargin ?? '200px'
    this.init()
  }

  private init() {
    if (this.useNative && 'loading' in HTMLImageElement.prototype) {
      this.type = 'loading'
    } else if (window.IntersectionObserver) {
      this.type = 'observer'
      this.setObserver()
    } else {
      this.type = 'none'
      error('Your browser does not support IntersectionObserver. https://github.com/tolking/vue-lazy-loading#Browser Support')
    }
  }

  bind(el: Element, binding: LazyBinding) {
    binding.arg !== 'bg' &&
      binding.arg !== 'background' &&
      !el.hasAttribute('loading') &&
      el.setAttribute('loading', 'lazy')
    this.update(el, binding)
  }

  update(el: Element, { oldValue, value, arg }: LazyBinding) {
    if (oldValue === value) return
    const isEager = el.getAttribute('loading') === 'eager'

    if (arg) {
      switch (arg) {
        case 'bg':
        case 'background':
          if ((el as LazyElement).style.backgroundImage) {
            (el as LazyElement).style.backgroundImage = ''
          }
          if (!isEager && (this.type === 'loading' || this.type === 'observer')) {
            if (!this.io) {
              this.setObserver()
            }
            el.setAttribute('data-bg', value)
            this.io?.observe(el)
          } else {
            (el as LazyElement).style.backgroundImage = `url(${value})`
          }
          break;
        case 'set':
        case 'srcset':
          el.hasAttribute('srcset') && el.removeAttribute('srcset')
          if (this.type === 'loading') {
            el.setAttribute('srcset', value)
          } else if (!isEager && this.type === 'observer') {
            el.setAttribute('data-srcset', value)
            this.io?.observe(el)
          } else {
            el.setAttribute('srcset', value)
          }
          break
        default:
          error('One of [v-lazy="URL", v-lazy:bg="URL", v-lazy:background="URL", v-lazy:set="URL"， v-lazy：srcset="URL"]')
          break;
      }
    } else {
      el.hasAttribute('src') && el.removeAttribute('src')
      if (this.type === 'loading') {
        el.setAttribute('src', value)
      } else if (!isEager && this.type === 'observer') {
        el.setAttribute('data-src', value)
        this.io?.observe(el)
      } else {
        el.setAttribute('src', value)
      }
    }
  }

  unbind(el: Element) { 
    if (this.type === 'observer') {
      this.io?.unobserve(el)
    }
  }

  private setObserver() {
    this.io = new IntersectionObserver(entries => {
      entries.forEach(item => {
        if (item.isIntersecting) {
          const src = (item.target as LazyElement).dataset?.src
          const srcset = (item.target as LazyElement).dataset?.srcset
          const bg = (item.target as LazyElement).dataset?.bg

          if (src) {
            (item.target as LazyElement).src = src
          }
          if (srcset) {
            (item.target as LazyElement).srcset = srcset
          }
          if (bg) {
            (item.target as LazyElement).style.backgroundImage = `url(${bg})`
          }
          this.io?.unobserve(item.target)
        }
      })
    }, {
      rootMargin: this.rootMargin
    })
  }
}

export function getVueVersion(Vue: any) {
  return Number(Vue.version.split('.')[0])
}

export function error(msg: string) {
  process.env.NODE_ENV === 'development' &&
    console.error('[vue-lazy-loading error]: ' + msg);
}
