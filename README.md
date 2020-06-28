# vue-lazy-loading

> *alpha* a vue plugin to better supporting lazy loading for image and iframe

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

``` vue
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

  <!-- Replace `style.backgroundImage` with `v-lazy:bg` or `v-lazy:background` -->
  <div v-lazy:bg="logo">background</div>
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

## Browser Support

Available in [latest browsers](http://caniuse.com/#feat=intersectionobserver). If browser support is not available (eg IE), then make use of this [polyfill](https://www.npmjs.com/package/intersection-observer).

``` js
require('intersection-observer')
import LazyLoading from 'vue-lazy-loading'
```

## License

[MIT](http://opensource.org/licenses/MIT)

## Keywords

vue lazy img iframe loading background-image