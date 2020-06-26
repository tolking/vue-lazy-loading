import { LazyOptions, LazyBinding, LazyElement } from '../types/index.js'

export class LazyCore {
  private useNative: boolean
  private rootMargin: string
  private type: 'loading' | 'observer' | 'listener' = 'loading'
  private io?: IntersectionObserver

  constructor(options: LazyOptions) {
    this.useNative = options?.useNative ?? true
    this.rootMargin = options?.rootMargin ?? '200px'
    this.init()
    // this.type = 'listener' // NOTE: test

    console.log(this);
  }

  private init() {
    if (this.useNative && 'loading' in HTMLImageElement.prototype) {
      this.type = 'loading'
    } else if (window.IntersectionObserver) {
      this.type = 'observer'
      this.setObserver()
    } else {
      this.type = 'listener'
    }
  }

  bind(el: Element, binding: LazyBinding) {
    console.log('bind', binding.value);
    
    !el.hasAttribute('loading') && el.setAttribute('loading', 'lazy')
    this.update(el, binding)
  }

  update(el: Element, { value, arg }: LazyBinding) {
    console.log('update', arg, value);
    
    if (arg) {
      if (['bg', 'background'].includes(arg)) {
        if (this.type === 'loading' || this.type === 'observer') {
          if (!this.io) {
            this.setObserver()
          }
          el.setAttribute('data-bg', value)
          this.io?.observe(el)
        } else {
          console.log('TODO: ');
          
          el.setAttribute('data-bg', value)
        }
      } else {
        error('One of [v-lazy="URL", v-lazy:bg="URL", v-lazy:background="URL"]')
      }
      console.log(el.getAttribute('style.backgroundImage'));
      
    } else {
      el.hasAttribute('src') && el.removeAttribute('src')
      if (this.type === 'loading') {
        el.setAttribute('src', value)
      } else if (this.type === 'observer') {
        el.setAttribute('data-src', value)
        this.io?.observe(el)
      } else {
        console.log('TODO: ');
        
        el.setAttribute('data-src', value)
      }
    }
  }

  unbind(el: Element) {
    console.log('unbind');
    
    if (this.type === 'observer') {
      this.io?.unobserve(el)
    }
  }

  private setObserver() {
    this.io = new IntersectionObserver(entries => {
      entries.forEach(item => {
        if (item.isIntersecting) {
          const src = (item.target as LazyElement).dataset?.src
          const bg = (item.target as LazyElement).dataset?.bg

          if (src) {
            (item.target as LazyElement).src = src
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
  console.error('[vue-lazy-loading error]: ' + msg);
}
