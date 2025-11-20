import Blits from '@lightningjs/blits'
import { Theme, panelEffects } from '../theme.js'

export default Blits.Component('TopBar', {
  template: `
    <Element :w="$w" :h="$h" :color="$bg" :effects="$panelFx">
      <Text :x="$pad" :y="$h/2 - 18" size="36" :color="$titleColor" content="Ocean Page Builder" />
      <Element :x="$w - ($pad + 320)" :y="12" :w="300" :h="$h - 24">
        <Element :effects="$chipFx" :color="$chipBg" :w="140" :h="$h - 24">
          <Text x="20" y="16" size="24" :color="$chipText" content="Preview" />
        </Element>
        <Element x="160" :effects="$chipFx" :color="$primary" :w="140" :h="$h - 24">
          <Text x="20" y="16" size="24" color="#ffffff" content="Export" />
        </Element>
      </Element>
    </Element>
  `,
  state() {
    return {
      w: 1920,
      h: Theme.layout.topbarHeight,
      pad: Theme.layout.padding,
      bg: Theme.colors.surface,
      titleColor: Theme.colors.text,
      primary: Theme.colors.primary,
      chipBg: '#eff6ff',
      chipText: Theme.colors.primary,
      panelFx: [],
      chipFx: [],
    }
  },
  hooks: {
    ready() {
      this.panelFx = panelEffects(this)
      this.chipFx = panelEffects(this)
    },
  },
})
