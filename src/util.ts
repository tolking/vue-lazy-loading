import { LazyOptions, LazyBinding, LazyElement } from '../types/index.js'

export class LazyCore {
  private useNative: boolean
  private rootMargin: string
  private type?: 'loading' | 'observer' | 'none'
  private io?: IntersectionObserver

  constructor(options: LazyOptions) {
    this.useNative = options?.useNative ?? true
    this.rootMargin = options?.rootMargin ?? '200px'
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
    !this.type && this.init()
    binding.arg !== 'bg' &&
      binding.arg !== 'bgset' &&
      !el.hasAttribute('loading') &&
      el.setAttribute('loading', 'lazy')
    this.update(el, binding)
  }

  update(el: Element, { oldValue, value, arg }: LazyBinding) {
    if (oldValue === value) return
    const isEager = el.getAttribute('loading') === 'eager'

    switch (arg) {
      case undefined:
        el.hasAttribute('src') && el.removeAttribute('src')
        if (!isEager && this.type === 'observer') {
          el.setAttribute('data-src', value)
          this.io!.observe(el)
        } else {
          el.setAttribute('src', value)
        }
        break
      case 'set':
      case 'srcset':
        el.hasAttribute('srcset') && el.removeAttribute('srcset')
        if (!isEager && this.type === 'observer') {
          el.setAttribute('data-srcset', value)
          this.io!.observe(el)
        } else {
          el.setAttribute('srcset', value)
        }
        break
      case 'bg':
        if (!isEager && (this.type === 'loading' || this.type === 'observer')) {
          !this.io && this.setObserver()
          el.setAttribute('data-bg', value)
          this.io!.observe(el)
        } else {
          setStyle(el, 'bg', value)
        }
        break;
      case 'bgset':
        if (!isEager && (this.type === 'loading' || this.type === 'observer')) {
          !this.io && this.setObserver()
          el.setAttribute('data-bgset', value)
          this.io!.observe(el)
        } else {
          setStyle(el, 'bgset', value)
        }
        break;
      default:
        error('One of v-lazy, v-lazy:set, v-lazy:srcset, v-lazy:bg, v-lazy:bgset')
        break;
    }
  }

  unbind(el: Element) {
    this.type === 'observer' && this.io!.unobserve(el)
  }

  private setObserver() {
    this.io = new IntersectionObserver(entries => {
      entries.forEach(item => {
        if (item.isIntersecting) {
          const el = (item.target as LazyElement)
          const { src, srcset, bg, bgset } = getDataset(el)

          bg && setStyle(el, 'bg', bg)
          bgset && setStyle(el, 'bgset', bgset)
          src && el.setAttribute('src', src)
          srcset && el.setAttribute('srcset', srcset)
          this.io!.unobserve(item.target)
        }
      })
    }, {
      rootMargin: this.rootMargin
    })
  }
}

function getDataset(el: LazyElement) {
  if (el.dataset) {
    return el.dataset
  } else {
    const obj = {} as LazyElement['dataset']

    for (let i = 0; i < el.attributes.length; i++) {
      const name = el.attributes[i].nodeName

      if (/^data-\w+$/.test(name)) {
        const key = name.split('-')[1]
        const value = el.attributes[i].nodeValue || undefined

        if (['src', 'srcset', 'bg', 'bgset'].indexOf(key) !== -1) {
          obj[key as 'src' | 'srcset' | 'bg' | 'bgset'] = value
        }
      }
    }
    return obj
  }
}

export function getVueVersion(Vue: any) {
  return Number(Vue.version.split('.')[0])
}

export function setStyle(el: Element, type: 'bg' | 'bgset', value: string) {
  const oldStyle = el.getAttribute('style') || ''
  const style =
    type === 'bg'
      ? `background-image: url(${value});`
      : `background-image: -webkit-image-set(${value}); background-image: image-set(${value});`
  const newStyle = oldStyle + style

  el.setAttribute('style', newStyle)
}

export function error(msg: string) {
  process.env.NODE_ENV === 'development' &&
    console.error('[vue-lazy-loading error]: ' + msg);
}
