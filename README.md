# vue-lazy-loading

> a vue plugin to better supporting lazy loading for image and iframe

**The plugin will preferentially use native image and iframe [lazy-loading](https://caniuse.com/#feat=loading-lazy-attr), if the browser does not support it, it will be implemented through [IntersectionObserver](https://caniuse.com/#feat=intersectionobserver)**

## Installation

``` sh
yarn add vue-lazy-loading
# or
npm i vue-lazy-loading
```

## Usage

``` js
// Vue 3.X
import { createApp } from 'vue'
import LazyLoading from 'vue-lazy-loading'

createApp(App)
  .use(LazyLoading)
  .mount('#app')

// Vue 2.X
import Vue from 'vue'
import LazyLoading from 'vue-lazy-loading'

Vue.use(LazyLoading)
```

``` html
<template>
  <!-- Setting a fixed size is better for browser loading -->
  <!-- Replace `src` with `v-lazy` -->
  <img v-lazy="'img.jpg'" width="536" height="354" />

  <!-- Set `loading="lazy"` is not required -->
  <iframe v-lazy="'iframe.html'" loading="lazy" width="1000" height="500" />

  <!-- Load right away with set `loading="eager"` -->
  <iframe v-lazy="'iframe.html'" loading="eager" width="1000" height="500" />

  <!-- Pass in the Relative URLs like this -->
  <img v-lazy="logo" width="100" height="100" />

  <!-- Replace `srcset` with `v-lazy:set` or `v-lazy:srcset` -->
  <img v-lazy="'img.jpg'" v-lazy:set="'img.jpg 1000w, img-2x.jpg 2000w'" width="536" height="354" />

  <!-- Replace `background-image` with `v-lazy:bg` -->
  <div v-lazy:bg="logo">background</div>

  <!-- Replace `background-image: image-set` with `v-lazy:bgset` -->
  <div v-lazy:bgset="'url(bg.img) 1x, url(bg-2x.img) 2x'">background</div>
</template>

<script>
import logo from './assets/logo.png'

export default {
  data() {
    return {
      logo: logo
    }
  }
}
```

## Options

### useNative
- Type: `Boolben`
- Default: `true`
- Required: `false`

Use the native image lazy-loading for the web

### rootMargin
- Type: `String`
- Default: `200px`
- Required: `false`

rootMargin for IntersectionObserver

## Load animation

Loading animation is not included by default. You can use it this way

``` css
img,
iframe {
  background: rgba(50, 50, 50, 0.3) url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="white"><path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"/><path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"><animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="0.8s" repeatCount="indefinite" /></path></svg>') center no-repeat;
}
```

## Browser Support

Available in [latest browsers](http://caniuse.com/#feat=intersectionobserver). If browser support is not available (eg IE), then make use of this [polyfill](https://www.npmjs.com/package/intersection-observer).

``` js
require('intersection-observer')
import LazyLoading from 'vue-lazy-loading'
```

## License

[MIT](http://opensource.org/licenses/MIT)
