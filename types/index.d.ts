export type LazyOptions = undefined | {
  useNative?: boolean
  rootMargin?: string
}

export interface LazyBinding {
  oldValue: string
  value: string
  arg?: 'bg' | 'background' | 'set' | 'srcset'
}

export interface LazyElement extends HTMLElement {
  src: string
  srcset?: string
  dataset: {
    src?: string
    srcset?: string
    bg?: string
  }
}
