<template>
    <div class="webcg-devtools">
        <div class="modal draggable" tabindex="-1" role="dialog">
            <div class="modal-content resizable">
                <div class="modal-header drag-handle">
                    <h5 class="modal-title">WebCG DevTools {{ version }}</h5>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group col">
                            <button type="button" class="btn btn-block btn-primary" @click="play()">
                                Play
                            </button>
                        </div>
                        <div class="form-group col">
                            <button type="button" class="btn btn-block btn-outline-secondary" @click="eval('next')">
                                Next
                            </button>
                        </div>
                        <div class="form-group col">
                            <button type="button" class="btn btn-block btn-outline-secondary" @click="eval('stop')">
                                Stop
                            </button>
                        </div>
                        <div class="form-group col">
                            <button type="button" class="btn btn-block btn-outline-secondary" @click="eval('remove')">
                                Remove
                            </button>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col">
                            <div class="input-group">
                                <input type="text" class="form-control" :class="{'is-invalid': invokeErrorMessage}"
                                       v-model="invokeExpr">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" @click="invoke()">
                                        Invoke
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-row" v-if="invokeErrorMessage">
                        <div class="col">
                            <div class="alert alert-danger" role="alert">
                                {{ invokeErrorMessage }}
                            </div>
                        </div>
                    </div>
                    <edit-data v-model="updateData" v-on:update="update"/>
                </div>
                <div class="modal-footer">
                    <a href="https://github.com/indr/webcg-devtools">https://github.com/indr/webcg-devtools</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { version } from '../package.json'
  import EditData from './components/edit-data.vue'

  const STORAGE_KEY_PREFIX = 'webcg-devtools'

  export default {
    name: 'webcg-dev-tools',
    components: {EditData},
    data () {
      return {
        invokeExpr: '',
        invokeErrorMessage: null,
        updateData: {},
        version: version
      }
    },
    created () {
      this.restoreInputs()
    },
    mounted () {
      const $draggable = this.$el.querySelector('.draggable')
      const $resizable = this.$el.querySelector('.resizable')
      this.restoreDimensions($draggable, $resizable)
      this.$draggable({
        ondragged: this.dragged.bind(this)
      })
      this.$resizable({
        targetNode: $resizable,
        onresized: this.resized.bind(this)
      })
    },
    methods: {
      eval (expr) {
        if (!expr) return
        if (expr.indexOf('(') < 0 && expr.indexOf(')') < 0) {
          expr += '()'
        }
        console.log('[webcg-devtools] calling ' + expr)
        window.eval(expr)
      },
      invoke () {
        this.invokeErrorMessage = null
        this.saveInputs()
        try {
          this.eval(this.invokeExpr || '')
        } catch (ex) {
          // Ignore the exception that is thrown because the function is not defined
          if (ex.name === 'ReferenceError' && /is not defined$/.test(ex.message)) {
            return
          }
          // Display any other error message
          this.invokeErrorMessage = ex.message
        }
      },
      play () {
        // CasparCG invokes update before the first play command
        if (!this.played) {
          this.update(this.updateData)
          this.played = true
        }
        this.eval('play')
      },
      update (data) {
        this.updateData = data
        this.saveInputs()
        const stringified = JSON.stringify(this.updateData)
        console.log('[webcg-devtools] calling update ' + stringified)
        // stringify contains a string in this form '{"f0":123}'. but what we want to pass
        // to the update() function has this form '"{\"f0\":123}\"', so we stringify() again.
        window.eval('window[\'update\'](' + JSON.stringify(stringified) + ')')
      },
      saveInputs () {
        window.localStorage.setItem(STORAGE_KEY_PREFIX + '.invokeExpr', this.invokeExpr || '')
        window.localStorage.setItem(STORAGE_KEY_PREFIX + '.updateData', JSON.stringify(this.updateData))
      },
      restoreInputs () {
        this.invokeExpr = window.localStorage.getItem(STORAGE_KEY_PREFIX + '.invokeExpr')
        try {
          this.updateData = JSON.parse(window.localStorage.getItem(STORAGE_KEY_PREFIX + '.updateData')) || {}
        } catch (ex) {
          this.updateData = {}
        }
      },
      dragged ($el) {
        window.localStorage.setItem(STORAGE_KEY_PREFIX + '.offsetTop', $el.offsetTop)
        window.localStorage.setItem(STORAGE_KEY_PREFIX + '.offsetLeft', $el.offsetLeft)
      },
      resized ($el) {
        window.localStorage.setItem(STORAGE_KEY_PREFIX + '.offsetWidth', $el.offsetWidth)
        window.localStorage.setItem(STORAGE_KEY_PREFIX + '.offsetHeight', $el.offsetHeight)
      },
      restoreDimensions ($draggable, $resizable) {
        const minWidth = 410
        const defaultWidth = 410
        const minHeight = 63
        const defaultHeight = 380
        $draggable.style.top = Math.max(0, window.localStorage.getItem(STORAGE_KEY_PREFIX + '.offsetTop') || 200) + 'px'
        $draggable.style.left = Math.max(0, window.localStorage.getItem(STORAGE_KEY_PREFIX + '.offsetLeft') || 200) + 'px'
        $resizable.style.width = Math.max(minWidth, window.localStorage.getItem(STORAGE_KEY_PREFIX + '.offsetWidth') || defaultWidth) + 'px'
        $resizable.style.height = Math.max(minHeight, window.localStorage.getItem(STORAGE_KEY_PREFIX + '.offsetHeight') || defaultHeight) + 'px'
      },
    }
  }
</script>

<style lang="scss">
    @import 'bootstrap.scss';
    @import 'style.scss';
</style>
