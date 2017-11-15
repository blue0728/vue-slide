
## Install
```
npm install vue-bsslide --save

```

## Info

`vue-bsslide` 使用了 `better-scroll`  [@ustbhuangyi](https://github.com/ustbhuangyi)，非常感谢

## Usage

```js

   <vue-slide ref="slide" @change="change">
    <div><img src="http://y.gtimg.cn/music/photo_new/T003R720x288M000002cwng4353HKz.jpg" alt=""></div>
    <div><img src="http://y.gtimg.cn/music/photo_new/T003R720x288M000001YCZlY3aBifi.jpg" alt=""></div>
    <div><img src="http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg" alt=""></div>
    <div><img src="http://y.gtimg.cn/music/photo_new/T003R720x288M00000236sfA406cmk.jpg" alt=""></div>
  </vue-slide>

import vueSlide from 'vue-bsslide'

var app = new Vue({
  el: '#app',
  components: {
    vueSlide
  },
  methods: {
    change: function(){
      console.log(arguments)
    }
  }
})
```

## demo

`/demo/index.html`
