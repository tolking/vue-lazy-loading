import { LazyOptions, LazyElement } from '../types/index.js'

export class LazyCore {
  private useNative: boolean
  private rootMargin: string
  private type: 'loading' | 'observer' | 'listener' = 'loading'
  private io?: IntersectionObserver

  constructor(options: LazyOptions) {
    this.useNative = options?.useNative ?? true
    this.rootMargin = options?.rootMargin ?? '200px'
    this.init()
    this.type = 'listener' // NOTE: test

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

  bind(el: Element, { value }: { value: string }) {
    console.log('bind', value);
    
    !el.getAttribute('loading') && el.setAttribute('loading', 'lazy')
    this.update(el, { value })
  }

  update(el: Element, { value }: { value: string }) {
    console.log('update', value);
    
    if (this.type === 'loading') {
      el.setAttribute('src', value)
    } else if (this.type === 'observer') {
      el.setAttribute('data-src', value)
      this.io?.observe(el)
    } else {
      console.log('TODO: ');
      
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
          (item.target as LazyElement).src = (item.target as LazyElement).dataset.src
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
