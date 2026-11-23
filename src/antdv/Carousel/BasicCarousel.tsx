import { defineComponent, ref, nextTick } from 'vue'
import { Carousel } from 'ant-design-vue'
import { XCarouselProps } from './types/props'

export default defineComponent<XCarouselProps>({
  name: 'XCarousel',

  inheritAttrs: true, // TAG: Props Reactive
  setup(props, { attrs, slots, expose }) {
    const _Carousel = ref(null)
    function goTo(slide: number, dontAnimate?: boolean) {
      nextTick(() => {
        _Carousel.value && _Carousel.value.goTo(slide, dontAnimate)
      })
    }
    function next() {
      nextTick(() => {
        _Carousel.value && _Carousel.value.next()
      })
    }
    function prev() {
      nextTick(() => {
        _Carousel.value && _Carousel.value.prev()
      })
    }
    // 补充暴露原组件方法，方便外部调用
    expose({
      goTo,
      next,
      prev
    })
    return () => {
      return (
        <Carousel {...attrs} {...props} ref={_Carousel}>
          {{ ...slots }}
        </Carousel>
      )
    }
  },
})
