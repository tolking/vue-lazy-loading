export type LazyOptions = undefined | {
  useNative?: boolean
  rootMargin?: string
}

export interface LazyElement extends Element {
  src: string | null
  dataset: {
    src: string
  }
}
