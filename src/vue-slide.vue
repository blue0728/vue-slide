<style scoped>
@b slide {
	overflow: hidden;
    position: relative;

	@e group{
		display: flex;

		@m item {
			flex: 1;
			overflow: hidden;
			text-align: center;

			a {
				display: block;
				width: 100%;
				overflow: hidden;
				text-decoration: none;
			}

			img{
				display: block;
				width: 100%;
			}
		}
	}
}

@b dots{

	position: absolute;
  	right: 0;
  	left: 0;
  	bottom: 12px;
  	transform: translateZ(1px);
  	text-align: center;
  	font-size: 0;

  	@e dot {
  		display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ccc;
		transition: all .3s;

        @m active{
        	width: 20px;
	        border-radius: 5px;
	        background: #fff;
        }
  	}
}
</style>
<template>
	<div class="slide" ref="slide">
		<div class="slide__group" ref="slideGroup">
			<slot></slot>
		</div>
		<div v-if="showDot" class="dots">
	      	<span class="dots__dot" :class="{'dots__dot--active': currentPageIndex === index }" v-for="(item, index) in dots"></span>
	    </div>
	</div>
</template>
<script>
import BScroll from 'better-scroll';
	
	const COMPONENT_NAME = 'vue-slide'

	const EVENT_CHANGE = 'change'

	export default{
		name: COMPONENT_NAME,
		props: {
			loop: {
		        type: Boolean,
		        default: true
		    },
		    autoPlay: {
		        type: Boolean,
		        default: false
		    },
		    interval: {
		        type: Number,
		        default: 4000
		    },
		    showDot: {
		        type: Boolean,
		        default: true
		    },
		    click: {
		        type: Boolean,
		        default: true
		    }
		},
		data: function() {
	      	return {
	        	dots: [],
	        	currentPageIndex: 0
	      	}	
	    },
		mounted: function(){
			this.$nextTick(() => {

				this._setSlideWidth();

				if (this.showDot) {
				    this._initDots()
				}

				this._initSlide();
				if (this.autoPlay) {
		          	this._play()
		        }
			})

			window.addEventListener('resize', () => {
				if (!this.slide || !this.slide.enabled) {
		          	return
		        }
		        clearTimeout(this.resizeTimer)

		        this.resizeTimer = setTimeout(()=>{
		        	if (this.slide.isInTransition) {
			            this._onScrollEnd()
			        } else {
			        	if (this.autoPlay) {
			              this._play()
			            }
			        }
			        this.refresh()
		        }, 60)
			})
		},
		activated() {
		    if (!this.slide) {
		        return
		    }
		    this.slide.enable()
		    let pageIndex = this.slide.getCurrentPage().pageX
		    if (pageIndex > this.dots.length) {
		        pageIndex = pageIndex % this.dots.length
		    }
		    this.slide.goToPage(pageIndex, 0, 0)
		    if (this.loop) {
		        pageIndex -= 1
		    }
		    this.currentPageIndex = pageIndex
		    if (this.autoPlay) {
		        this._play()
		    }
	    },
		deactivated() {
	      	this.slide.disable()
	      	clearTimeout(this.timer)
	    },
	    beforeDestroy() {
	      	this.slide.disable()
	      	clearTimeout(this.timer)
	    },
		methods: {
			refresh: function() {
		        this._setSlideWidth(true)
		        this.slide.refresh()
		    },
		    next: function() {
		    	if(this.slide.isInTransition){
		    		return;
		    	}
		        this.slide.next()
		    },
		    prev: function(){
		    	if(this.slide.isInTransition){
		    		return;
		    	}
				this.slide.prev()
		    },
		    goto: function(index){
		    	let pageIndex = Number(index) +1
				this.slide.goToPage(pageIndex, 0)
		    },
			_initSlide: function(){
				this.slide = new BScroll(this.$refs.slide, {
			        scrollX: true,
			        momentum: false,
			        snap: {
			            loop: this.loop,
			            threshold: 0.3,
			            speed: 400
			        },
			        click: this.click
			    })

			    this.slide.on('scrollEnd', this._onScrollEnd)

			    this.slide.on('touchend', () => {
			        if (this.autoPlay) {
			           this._play()
			        }
			    })
			    this.slide.on('beforeScrollStart', () => {
			        if (this.autoPlay) {
			           clearTimeout(this.timer)
			        }
			    })
			},
			_initDots() {
		        this.dots = new Array(this.children.length)
		    },
			_setSlideWidth(isResize) {
		        this.children = this.$refs.slideGroup.children
		        let width = 0
		        let slideWidth = this.$refs.slide.clientWidth
		        for (let i = 0; i < this.children.length; i++) {
		          	let child = this.children[i]
		          	child.setAttribute('class', 'slide__group--item')
		          	child.style.width = slideWidth + 'px'
		          	width += slideWidth
		        }
		        if (this.loop && !isResize) {
		          	width += 2 * slideWidth
		        }
		        this.$refs.slideGroup.style.width = width + 'px'
		    },
		    _onScrollEnd: function(){
		    	let pageIndex = this.slide.getCurrentPage().pageX
		        if (this.loop) {
		          	pageIndex -= 1
		        }
		        this.currentPageIndex = pageIndex
		        if (this.autoPlay) {
		          	this._play()
		        }

		        this.$emit(EVENT_CHANGE, pageIndex)
		    },
		    _play: function(){
		    	let pageIndex = this.slide.getCurrentPage().pageX + 1
		        clearTimeout(this.timer)
		        this.timer = setTimeout(() => {
		          	this.slide.goToPage(pageIndex, 0, 400)
		        }, this.interval)
		    }
		}
	}
</script>