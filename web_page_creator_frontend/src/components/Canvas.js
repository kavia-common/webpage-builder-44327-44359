import Blits from '@lightningjs/blits'
import { Theme, gradientBg, panelEffects } from '../theme.js'

export default Blits.Component('Canvas', {
  template: `
    <Element :w="$w" :h="$h" :color="$bg">
      <Element :x="$pad" :y="$pad" :w="$w - ($pad*2)" :h="$h - ($pad*2)" :color="$surface" :effects="$fx">
        <!-- Subtle gradient backdrop -->
        <Element :w="$cw" :h="$ch" :color="$grad" />

        <!-- Render each element -->
        <Element :for="el in $elements" :key="el.id" :x="el.x" :y="el.y" @enter="$select(el.id)">
          <!-- Draw selection ring -->
          <Element :alpha="$selectedId === el.id ? 1 : 0" :w="el.w+16" :h="el.h+16" x="-8" y="-8" :effects="$ringFx" />
          <Element :w="el.w" :h="el.h" :color="$elBg(el)" :effects="$innerFx">
            <Text v-if="el.type === 'text'" :w="el.w" :h="el.h" :x="8" :y="8" :maxwidth="el.w - 16" :lineheight="el.props.size + 8" :size="el.props.size" :color="el.props.color" :align="el.props.align" :content="el.props.content" />
            <Element v-if="el.type === 'button'" :w="el.w" :h="el.h" :effects="[$shader('radius', {radius: el.props.radius || 10})]" :color="el.props.bg">
              <Text :x="el.w/2" :y="el.h/2 - 14" mount="{x:0.5}" :size="el.props.size" color="#ffffff" :content="el.props.label" align="center" />
            </Element>
            <Element v-if="el.type === 'image'" :w="el.w" :h="el.h" :effects="[$shader('radius', {radius: el.props.radius || 12})]" :src="el.props.src" />
            <Element v-if="el.type === 'section'" :w="el.w" :h="el.h" :effects="[$shader('radius', {radius: el.props.radius || 16})]" :color="el.props.bg" />
          </Element>
        </Element>
      </Element>
    </Element>
  `,
  state() {
    return {
      w: 1920 - (Theme.layout.sidebarWidth + Theme.layout.propsPanelWidth) - Theme.layout.padding * 2,
      h: 1080 - Theme.layout.topbarHeight - Theme.layout.padding * 2,
      pad: Theme.layout.padding,
      surface: Theme.colors.surface,
      bg: Theme.colors.background,
      cw: 1920 - (Theme.layout.sidebarWidth + Theme.layout.propsPanelWidth) - Theme.layout.padding * 4,
      ch: 1080 - Theme.layout.topbarHeight - Theme.layout.padding * 4,
      grad: gradientBg(),
      elements: [],
      selectedId: null,
      fx: [],
      innerFx: [],
      ringFx: [],
    }
  },
  hooks: {
    ready() {
      this.fx = panelEffects(this)
      this.innerFx = [this.$shader('radius', { radius: 12 })]
      this.ringFx = [this.$shader('radius', { radius: 16 }), this.$shader('border', { color: Theme.colors.primary, width: 3 })]
      // Poll store for changes
      this.$setInterval(() => {
        const store = this.$plugin('store')
        this.elements = store.elements
        this.selectedId = store.selectedId
      }, 100)
    },
  },
  methods: {
    $select(id) {
      this.$plugin('store').selectElement(id)
    },
    $elBg(el) {
      if (el.type === 'section') return 'transparent'
      return '#ffffffcc'
    },
    nudge(dx, dy) {
      const store = this.$plugin('store')
      const id = store.selectedId
      if (!id) return
      const el = store.elements.find((e) => e.id === id)
      if (!el) return
      store.updateElement(id, { x: el.x + dx, y: el.y + dy })
    },
  },
  input: {
    left() {
      this.nudge(-8, 0)
    },
    right() {
      this.nudge(8, 0)
    },
    up() {
      this.nudge(0, -8)
    },
    down() {
      this.nudge(0, 8)
    },
    delete() {
      this.$plugin('store').removeSelected()
    },
    backspace() {
      this.$plugin('store').removeSelected()
    },
    z(e) {
      if (e.meta || e.ctrl) {
        this.$plugin('store').undo()
      }
    },
  },
})
