export type LazyOptions = undefined | {
  useNative?: boolean
  rootMargin?: string
}

export interface LazyBinding {
  value: string
  arg?: 'bg' | 'background'
}

export interface LazyElement extends HTMLElement {
  src: string
  dataset: {
    src?: string
    bg?: string
  }
}
