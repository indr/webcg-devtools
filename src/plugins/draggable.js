export default {
  install (Vue) {
    Vue.prototype.$draggable = function (options) {
      options = Object.assign({}, {
        draggable: 'draggable',
        dragging: 'dragging',
        handle: 'drag-handle',
        dataOffsetX: 'data-drag-offset-x',
        dataOffsetY: 'data-drag-offset-y',
        ondragged: null
      }, options)

      const $handle = this.$el.querySelector('.' + options.handle)
      if (!$handle) return

      $handle.addEventListener('mousedown', function (e) {
        const $draggable = e.target.closest('.' + options.draggable)
        $draggable.classList.add(options.dragging)
        $draggable.setAttribute(options.dataOffsetX, e.clientX - $draggable.offsetLeft)
        $draggable.setAttribute(options.dataOffsetY, e.clientY - $draggable.offsetTop)
        e.preventDefault() // prevent text selection
      })

      window.document.addEventListener('mousemove', function (e) {
        const $dragging = window.document.querySelector('.' + options.dragging)
        if ($dragging) {
          const top = e.clientY - Number.parseInt($dragging.getAttribute(options.dataOffsetY))
          const left = e.clientX - Number.parseInt($dragging.getAttribute(options.dataOffsetX))
          $dragging.style.top = top + 'px'
          $dragging.style.left = left + 'px'
        }
      })

      $handle.addEventListener('mouseup', function (e) {
        const $dragging = window.document.querySelector('.' + options.dragging)
        $dragging.removeAttribute(options.dataOffsetX)
        $dragging.removeAttribute(options.dataOffsetY)
        $dragging.classList.remove(options.dragging)
        // window.localStorage.setItem(KEY + '.top', self.$toolbox.css('top'));
        // window.localStorage.setItem(KEY + '.left', self.$toolbox.css('left'));
        if (typeof options.ondragged === 'function') {
          options.ondragged($dragging)
        }
      })
    }
  }
}
