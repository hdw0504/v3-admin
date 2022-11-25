// const useFullscreenFn = useFullscreen()
// export const toggleFullscreen = useFullscreenFn.toggle
// export const isFullscreen = useFullscreenFn.isFullscreen

export const { toggle: toggleFullscreen, isFullscreen } = $(useFullscreen())
