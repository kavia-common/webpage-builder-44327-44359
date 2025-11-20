import Blits from '@lightningjs/blits'
import { Theme, panelEffects } from '../theme.js'
import { useStore } from '../store.js'

export default Blits.Component('Sidebar', {
  components: { useStore },
  template: `
    <Element :w="$w" :h="$h" :effects="$fx" :color="$bg">
      <Element :x="$pad" :y="$pad">
        <Text size="28" :color="$titleColor" content="Library" />
      </Element>

      <Element :x="$pad" :y="$pad + 48" :w="$w - ($pad*2)" h="44" :color="$tabBg" :effects="$tabFx">
        <Text x="16" y="10" size="22" :color="$tab1Color" content="Tools" />
        <Text x="120" y="10" size="22" :color="$tab2Color" content="Templates" />
      </Element>

      <!-- Tools -->
      <Element :alpha="$activeTab === 'tools' ? 1 : 0" :x="$pad" :y="$pad + 110">
        <Element @enter="$addText" :color="$chipBg" :effects="$chipFx" w="120" h="44"><Text x="20" y="10" size="22" :color="$chipText" content="Text" /></Element>
        <Element y="56" @enter="$addButton" :color="$chipBg" :effects="$chipFx" w="120" h="44"><Text x="20" y="10" size="22" :color="$chipText" content="Button" /></Element>
        <Element y="112" @enter="$addImage" :color="$chipBg" :effects="$chipFx" w="120" h="44"><Text x="20" y="10" size="22" :color="$chipText" content="Image" /></Element>
        <Element y="168" @enter="$addSection" :color="$chipBg" :effects="$chipFx" w="120" h="44"><Text x="20" y="10" size="22" :color="$chipText" content="Section" /></Element>
      </Element>

      <!-- Templates -->
      <Element :alpha="$activeTab === 'templates' ? 1 : 0" :x="$pad" :y="$pad + 110">
        <Element @enter="$tplHero" :color="$primary" :effects="$chipFx" w="300" h="56"><Text x="20" y="14" size="24" color="#fff" content="Hero" /></Element>
        <Element y="68" @enter="$tplTwoCol" :color="$primary" :effects="$chipFx" w="300" h="56"><Text x="20" y="14" size="24" color="#fff" content="Two-column" /></Element>
      </Element>
    </Element>
  `,
  state() {
    return {
      w: Theme.layout.sidebarWidth,
      h: 1080 - Theme.layout.topbarHeight - Theme.layout.padding * 2,
      pad: Theme.layout.padding,
      bg: Theme.colors.surface,
      titleColor: Theme.colors.text,
      tabBg: '#eef2ff',
      tab1Color: Theme.colors.primary,
      tab2Color: Theme.colors.mutedText,
      chipBg: '#eff6ff',
      chipText: Theme.colors.primary,
      primary: Theme.colors.primary,
      activeTab: 'tools',
      fx: [],
      chipFx: [],
      tabFx: [],
    }
  },
  hooks: {
    ready() {
      this.fx = panelEffects(this)
      this.chipFx = panelEffects(this)
      this.tabFx = panelEffects(this)
    },
  },
  input: {
    left() {
      this.activeTab = 'tools'
    },
    right() {
      this.activeTab = 'templates'
    },
  },
  methods: {
    $addText() {
      this.$plugin('store').addElement('text', 140, 160)
    },
    $addButton() {
      this.$plugin('store').addElement('button', 140, 160)
    },
    $addImage() {
      this.$plugin('store').addElement('image', 140, 160)
    },
    $addSection() {
      this.$plugin('store').addElement('section', 100, 140)
    },
    $tplHero() {
      this.$plugin('store').loadTemplate('Hero')
    },
    $tplTwoCol() {
      this.$plugin('store').loadTemplate('Two-column')
    },
  },
})
