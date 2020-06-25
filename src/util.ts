import { LazyElement } from '../types/index.js'

export function getObserver(rootMargin: string) {
  const io = new IntersectionObserver(entries => {
    entries.forEach((item) => {
      if (item.isIntersecting) {
        (item.target as LazyElement).src = (item.target as LazyElement).dataset.src
        io.unobserve(item.target)
      }
    })
  }, {
    rootMargin: rootMargin
  })

  return io
}