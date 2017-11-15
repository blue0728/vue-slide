import VueSlide from './vue-slide.vue'

const Slide = {
	install: function(Vue, options) {
		Vue.component(VueSlide.name, VueSlide)
	}
}

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(Slide)
}

export default VueSlide