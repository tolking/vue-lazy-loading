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

- **Setting a fixed size is better for browser loading**

``` vue
<template>
  <img v-lazy="'img.jpg'" width="536" height="354" />

  <img v-lazy="logo" width="100" height="100" />

  <iframe v-lazy="'iframe.html'" width="1000" height="500" />

  <div v-lazy:bg="logo">background</div>
  <!--or v-lazy:background="logo"-->
  
  <img v-lazy="'img.jpg'" v-lazy:set="'img.jpg 1000w, img-2x.jpg 2000w'" width="536" height="354" />
  <!--or v-lazy:srcset="URL"-->
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

Available in [latest browsers](http://caniuse.com/#feat=intersectionobserver). If browser support is not available, then make use of this [polyfill](https://www.npmjs.com/package/intersection-observer).

``` js
require('intersection-observer')
import LazyLoading from 'vue-lazy-loading'
```

## License

[MIT](http://opensource.org/licenses/MIT)

## Keywords

vue lazy img iframe loading background-image