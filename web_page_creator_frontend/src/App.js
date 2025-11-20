import Blits from '@lightningjs/blits'
import BuilderHome from './pages/BuilderHome.js'
import { useStore } from './store.js'

export default Blits.Application({
  template: `
    <Element>
      <RouterView />
    </Element>
  `,
  plugins: [useStore],
  routes: [{ path: '/', component: BuilderHome }],
})
