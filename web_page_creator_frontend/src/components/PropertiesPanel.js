import Blits from '@lightningjs/blits'
import { Theme, panelEffects } from '../theme.js'

export default Blits.Component('PropertiesPanel', {
  template: `
    <Element :w="$w" :h="$h" :effects="$fx" :color="$bg">
      <Element :x="$pad" :y="$pad">
        <Text size="28" :color="$titleColor" content="Properties" />
      </Element>
      <Element :x="$pad" :y="$pad + 56">
        <Text size="20" :color="$muted" :content="$selectedLabel" />
      </Element>

      <!-- Content -->
      <Element :x="$pad" :y="$pad + 100">
        <Text size="20" :color="$label" content="Text / Label" />
        <Text y="34" size="22" :color="$value" :content="$contentPreview" />
      </Element>

      <!-- Color and Size -->
      <Element :x="$pad" :y="$pad + 170">
        <Text size="20" :color="$label" content="Color" />
        <Text y="34" size="22" :color="$value" :content="$colorValue" />
      </Element>

      <Element :x="$pad" :y="$pad + 240">
        <Text size="20" :color="$label" content="Size" />
        <Text y="34" size="22" :color="$value" :content="$sizeValue" />
      </Element>

      <!-- Alignment for text -->
      <Element :alpha="$showAlign ? 1 : 0" :x="$pad" :y="$pad + 310">
        <Text size="20" :color="$label" content="Align" />
        <Text y="34" size="22" :color="$value" :content="$alignValue" />
      </Element>

      <!-- Instruction -->
      <Element :x="$pad" :y="$h - 120">
        <Text size="18" :color="$muted" content="Hint: Use keyboard to tweak properties" />
        <Text y="28" size="18" :color="$muted" content="Enter to cycle property, +/- to change size" />
      </Element>
    </Element>
  `,
  state() {
    return {
      w: Theme.layout.propsPanelWidth,
      h: 1080 - Theme.layout.topbarHeight - Theme.layout.padding * 2,
      pad: Theme.layout.padding,
      bg: Theme.colors.surface,
      titleColor: Theme.colors.text,
      label: Theme.colors.mutedText,
      value: Theme.colors.text,
      muted: Theme.colors.mutedText,
      fx: [],
      selectedLabel: 'Nothing selected',
      contentPreview: '-',
      colorValue: '-',
      sizeValue: '-',
      alignValue: '-',
      showAlign: false,
    }
  },
  hooks: {
    ready() {
      this.fx = panelEffects(this)
      this.updateFromStore()
      this.$setInterval(() => this.updateFromStore(), 250)
    },
  },
  methods: {
    updateFromStore() {
      const store = this.$plugin('store')
      const sel = store.elements.find((e) => e.id === store.selectedId)
      if (!sel) {
        this.selectedLabel = 'Nothing selected'
        this.contentPreview = '-'
        this.colorValue = '-'
        this.sizeValue = '-'
        this.alignValue = '-'
        this.showAlign = false
        return
      }
      this.selectedLabel = `${sel.type} (${sel.w}x${sel.h})`
      if (sel.type === 'text') {
        this.contentPreview = sel.props.content
        this.colorValue = sel.props.color
        this.sizeValue = String(sel.props.size)
        this.alignValue = sel.props.align
        this.showAlign = true
      } else if (sel.type === 'button') {
        this.contentPreview = sel.props.label
        this.colorValue = `${sel.props.bg} / ${sel.props.color}`
        this.sizeValue = String(sel.props.size)
        this.alignValue = '-'
        this.showAlign = false
      } else if (sel.type === 'image') {
        this.contentPreview = sel.props.src
        this.colorValue = '—'
        this.sizeValue = `${sel.w}x${sel.h}`
        this.alignValue = '-'
        this.showAlign = false
      } else if (sel.type === 'section') {
        this.contentPreview = 'Section'
        this.colorValue = sel.props.bg
        this.sizeValue = `${sel.w}x${sel.h}`
        this.alignValue = '-'
        this.showAlign = false
      }
    },
    adjustSize(delta) {
      const store = this.$plugin('store')
      const sel = store.elements.find((e) => e.id === store.selectedId)
      if (!sel) return
      if (sel.type === 'text' || sel.type === 'button') {
        const newSize = Math.max(12, (sel.props.size || 24) + delta)
        store.updateElement(sel.id, { props: { size: newSize } })
      } else if (sel.type === 'image' || sel.type === 'section') {
        store.updateElement(sel.id, { w: Math.max(40, sel.w + delta * 8), h: Math.max(40, sel.h + delta * 4) })
      }
      this.updateFromStore()
    },
  },
  input: {
    enter() {
      const store = this.$plugin('store')
      const sel = store.elements.find((e) => e.id === store.selectedId)
      if (!sel) return
      if (sel.type === 'text') {
        const aligns = ['left', 'center', 'right']
        const idx = aligns.indexOf(sel.props.align)
        store.updateElement(sel.id, { props: { align: aligns[(idx + 1) % aligns.length] } })
      } else if (sel.type === 'button') {
        const nextBg = sel.props.bg === '#2563EB' ? '#F59E0B' : '#2563EB'
        store.updateElement(sel.id, { props: { bg: nextBg } })
      } else if (sel.type === 'section') {
        const next = sel.props.bg === '#ffffff' ? '#f3f4f6' : '#ffffff'
        store.updateElement(sel.id, { props: { bg: next } })
      }
      this.updateFromStore()
    },
    up() {
      this.adjustSize(2)
    },
    down() {
      this.adjustSize(-2)
    },
  },
})
