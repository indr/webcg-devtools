import { version } from '../package.json'
import Vue from 'vue'
import DevTools from './dev-tools.vue'
import Draggable from './plugins/draggable'
import Resizable from './plugins/resizable'

function readyFn () {
  Vue.use(Draggable)
  Vue.use(Resizable)
  const app = new Vue(DevTools).$mount()
  document.body.appendChild(app.$el)
}

/**
 * When required globally
 */
if (typeof (window) !== 'undefined') {
  console.log('[webcg-devtools] version %s', version)
  ready(readyFn)
}

// @see http://youmightnotneedjquery.com/#ready
function ready (fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}
