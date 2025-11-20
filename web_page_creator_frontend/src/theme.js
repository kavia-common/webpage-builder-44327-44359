//
// Ocean Professional Theme and shared styles for the LightningJS Blits app
//
// PUBLIC_INTERFACE
export const Theme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB', // blue
    secondary: '#F59E0B', // amber
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    mutedText: '#6b7280',
    border: '#e5e7eb',
  },
  // Layout metrics
  layout: {
    topbarHeight: 72,
    sidebarWidth: 380,
    propsPanelWidth: 420,
    padding: 24,
    radius: 14,
    shadow: { // soft "neumorphic" style via blur drop shadow
      color: '#00000055',
      blur: 24,
      alpha: 0.16,
    },
  },
}

// PUBLIC_INTERFACE
export function panelEffects(Blits) {
  /** Returns rounded corner + shadow effects for surfaces */
  return [
    Blits.$shader('radius', { radius: Theme.layout.radius }),
    Blits.$shader('dropShadow', {
      color: Theme.colors.text,
      alpha: Theme.layout.shadow.alpha,
      blur: Theme.layout.shadow.blur,
      x: 0,
      y: 6,
    }),
  ]
}

// PUBLIC_INTERFACE
export function gradientBg() {
  /** Subtle gradient background descriptor used in Canvas backdrop */
  return {
    top: '#e8efff',
    bottom: Theme.colors.background,
  }
}
