<template>
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
            <div class="form-group col" v-if="settings.showRemoveButton">
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
</template>

<script>
  import storage from '../lib/storage.js'
  import EditData from './edit-data.vue'

  export default {
    name: 'tab-tools.vue',
    components: { EditData },
    props: ['settings'],
    data () {
      return {
        invokeExpr: '',
        invokeErrorMessage: null,
        updateData: {}
      }
    },
    created () {
      this.restoreInputs()
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
        if (this.settings.callUpdateBeforePlay && !this.played) {
          this.update(this.updateData)
        }
        this.eval('play')
        this.played = true
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
        storage.set('invokeExpr', this.invokeExpr || '')
        storage.set('updateData', this.updateData)
      },
      restoreInputs () {
        this.invokeExpr = storage.get('invokeExpr', '')
        try {
          this.updateData = storage.get('updateData', JSON.parse(JSON.stringify(window.debugData || {})))
        } catch (err) {
          this.updateData = {}
        }
      }
    }
  }
</script>

<style scoped>

</style>