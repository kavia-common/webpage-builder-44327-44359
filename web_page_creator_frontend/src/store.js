import Blits from '@lightningjs/blits'

/**
 * PUBLIC_INTERFACE
 * createDefaultElement
 * Creates a default element model based on type
 */
export function createDefaultElement(type, x = 100, y = 100) {
  const id = `${type}-${Date.now()}-${Math.floor(Math.random() * 10000)}`
  if (type === 'text') {
    return {
      id,
      type,
      x,
      y,
      w: 480,
      h: 80,
      props: {
        content: 'New Text',
        size: 36,
        color: '#111827',
        align: 'left',
      },
    }
  }
  if (type === 'button') {
    return {
      id,
      type,
      x,
      y,
      w: 260,
      h: 64,
      props: {
        label: 'Click Me',
        size: 28,
        color: '#ffffff',
        bg: '#2563EB',
        radius: 10,
      },
    }
  }
  if (type === 'image') {
    return {
      id,
      type,
      x,
      y,
      w: 320,
      h: 200,
      props: {
        src: 'assets/logo.png',
        fit: 'cover',
        radius: 12,
      },
    }
  }
  if (type === 'section') {
    return {
      id,
      type,
      x,
      y,
      w: 960,
      h: 300,
      props: {
        bg: '#ffffff',
        radius: 16,
      },
    }
  }
  return { id, type, x, y, w: 200, h: 100, props: {} }
}

// Storage helpers
const STORAGE_KEY = 'wpcf_canvas_state_v1'

function loadState() {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    if (!s) return null
    const parsed = JSON.parse(s)
    if (parsed && Array.isArray(parsed.elements)) return parsed
  } catch {
    // ignore
  }
  return null
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

/**
 * PUBLIC_INTERFACE
 * useStore
 * Minimal global store for the page builder using Blits plugin pattern.
 */
export const useStore = Blits.Plugin('store', {
  state() {
    const persisted = loadState()
    return {
      elements: persisted?.elements || [],
      selectedId: persisted?.selectedId || null,
      history: [],
      historyIndex: -1,
    }
  },
  methods: {
    commitState() {
      // Save to history for undo and to localStorage
      const snapshot = {
        elements: this.elements.map((e) => ({ ...e, props: { ...e.props } })),
        selectedId: this.selectedId,
      }
      // Truncate history ahead if we time-traveled before
      if (this.historyIndex < this.history.length - 1) {
        this.history = this.history.slice(0, this.historyIndex + 1)
      }
      this.history.push(snapshot)
      this.historyIndex = this.history.length - 1
      saveState(snapshot)
    },
    /** PUBLIC_INTERFACE addElement: push new element and record history */
    addElement(type, x, y) {
      this.elements = [...this.elements, createDefaultElement(type, x, y)]
      this.selectedId = this.elements[this.elements.length - 1].id
      this.commitState()
    },
    /** PUBLIC_INTERFACE selectElement: select by id */
    selectElement(id) {
      this.selectedId = id
      this.commitState()
    },
    /** PUBLIC_INTERFACE updateElement: shallow update of element fields */
    updateElement(id, patch) {
      this.elements = this.elements.map((el) =>
        el.id === id ? { ...el, ...patch, props: { ...el.props, ...(patch.props || {}) } } : el
      )
      this.commitState()
    },
    /** PUBLIC_INTERFACE removeSelected: remove currently selected */
    removeSelected() {
      if (!this.selectedId) return
      this.elements = this.elements.filter((e) => e.id !== this.selectedId)
      this.selectedId = null
      this.commitState()
    },
    /** PUBLIC_INTERFACE undo: Ctrl/Cmd+Z support */
    undo() {
      if (this.historyIndex <= 0) return
      this.historyIndex -= 1
      const snapshot = this.history[this.historyIndex]
      this.elements = snapshot.elements.map((e) => ({ ...e, props: { ...e.props } }))
      this.selectedId = snapshot.selectedId
      saveState(snapshot)
    },
    /** PUBLIC_INTERFACE loadTemplate: pre-defined templates */
    loadTemplate(templateName) {
      if (templateName === 'Hero') {
        this.elements = [
          createDefaultElement('section', 160, 160),
          { ...createDefaultElement('text', 220, 200), props: { content: 'Welcome to Ocean Pro', size: 56, color: '#111827', align: 'left' } },
          { ...createDefaultElement('text', 220, 280), props: { content: 'Build pages visually with a smooth workflow.', size: 28, color: '#6b7280', align: 'left' } },
          { ...createDefaultElement('button', 220, 360), props: { label: 'Get Started', size: 28, color: '#ffffff', bg: '#2563EB', radius: 12 } },
        ]
      } else if (templateName === 'Two-column') {
        this.elements = [
          { ...createDefaultElement('section', 120, 140), w: 1200, h: 480 },
          { ...createDefaultElement('text', 160, 180), props: { content: 'Two Column Layout', size: 48, color: '#111827', align: 'left' } },
          { ...createDefaultElement('text', 160, 260), props: { content: 'Left column with text.', size: 24, color: '#6b7280', align: 'left' } },
          { ...createDefaultElement('image', 760, 220), w: 520, h: 320, props: { src: 'assets/logo.png', fit: 'cover', radius: 12 } },
        ]
      } else {
        this.elements = []
      }
      this.selectedId = null
      this.commitState()
    },
  },
})
