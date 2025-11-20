import Blits from '@lightningjs/blits'
import TopBar from '../components/TopBar.js'
import Sidebar from '../components/Sidebar.js'
import Canvas from '../components/Canvas.js'
import PropertiesPanel from '../components/PropertiesPanel.js'
import { Theme } from '../theme.js'
import { useStore } from '../store.js'

export default Blits.Component('BuilderHome', {
  components: { TopBar, Sidebar, Canvas, PropertiesPanel, useStore },
  template: `
    <Element w="1920" h="1080" :color="$bg">
      <!-- Top bar -->
      <TopBar />

      <!-- Main content -->
      <Element :y="$topbar" :w="1920" :h="1080 - $topbar" :color="$bg">
        <Element :x="$pad" :y="$pad" :w="$w" :h="$h">
          <Sidebar />
          <Element :x="$sidebar + $pad">
            <Canvas />
          </Element>
          <Element :x="$sidebar + $pad + $canvas + $pad">
            <PropertiesPanel />
          </Element>
        </Element>
      </Element>
    </Element>
  `,
  state() {
    const pad = Theme.layout.padding
    const sidebar = Theme.layout.sidebarWidth
    const propsW = Theme.layout.propsPanelWidth
    const top = Theme.layout.topbarHeight
    const canvasW = 1920 - (sidebar + propsW) - pad * 2
    return {
      bg: Theme.colors.background,
      pad,
      sidebar,
      topbar: top,
      w: 1920 - pad * 2,
      h: 1080 - top - pad * 2,
      canvas: canvasW,
    }
  },
  hooks: {
    ready() {
      // Ensure store plugin is initialized by referencing it
      this.$plugin('store')
    },
  },
})
