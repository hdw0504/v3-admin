const useFullscreenFn = useFullscreen()
export const toggleFullscreen = useFullscreenFn.toggle
export const isFullscreen = useFullscreenFn.isFullscreen

// 下面写法走不了autoimport规则
// export const { toggle: toggleFullscreen, isFullscreen } = $(useFullscreen())
