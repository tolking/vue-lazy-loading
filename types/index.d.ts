export interface LazyOptions {
  useNative: Boolean
  rootMargin: string
}

export interface LazyElement extends Element {
  src: string | null
  dataset: {
    src: string
  }
}
