// Tiny shared mutable state read by both the DOM and the WebGL scene.
// The 3D scene samples these every frame; DOM listeners write to them.
export const ui = {
  /** overall vertical scroll progress 0..1 */
  scroll: 0,
  /** normalized pointer -1..1 */
  pointer: { x: 0, y: 0 },
  /** has the intro finished / user entered */
  entered: false,
  /** rough viewport width for responsive sizing */
  vw: typeof window !== 'undefined' ? window.innerWidth : 1280,
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    ui.vw = window.innerWidth
  })
}
