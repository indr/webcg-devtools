export default {
  install (Vue) {
    Vue.prototype.$resizable = function (options) {
      options = Object.assign({}, {
        targetNode: null,
        onresized: null
      }, options)

      let oldWidth = options.targetNode.style.width
      let oldHeight = options.targetNode.style.height

      // Options for the observer (which mutations to observe)
      const config = {attributes: true, childList: false, subtree: false}

      // Callback function to execute when mutations are observed
      const callback = function () {
        const newWidth = options.targetNode.style.width
        const newHeight = options.targetNode.style.height
        if (newWidth !== oldWidth || newHeight !== oldHeight) {
          oldWidth = newWidth
          oldHeight = newHeight
          if (typeof options.onresized === 'function') {
            options.onresized(options.targetNode)
          }
        }
      }

      // Create an observer instance linked to the callback function
      const observer = new window.MutationObserver(callback)

      // Start observing the target node for configured mutations
      observer.observe(options.targetNode, config)

      // Later, you can stop observing
      // observer.disconnect();
    }
  }
}
