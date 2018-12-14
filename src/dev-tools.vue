<template>
    <div class="webcg-devtools">
        <div class="modal draggable" tabindex="-1" role="dialog">
            <div class="modal-content resizable">
                <div class="modal-header drag-handle">
                    <h5 class="modal-title">WebCG DevTools {{ version }}</h5>
                </div>
                <div class="modal-navbar">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link" :class="{'active': tab === 'tools'}" data-toggle="tab"
                               href="#tools"
                               role="tab"
                               aria-controls="tools" aria-selected="true" @click="tab = 'tools'">Tools</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" :class="{'active': tab === 'settings'}" data-toggle="tab"
                               href="#settings"
                               role="tab"
                               aria-controls="settings" aria-selected="false" @click="tab = 'settings'">Settings</a>
                        </li>
                    </ul>
                </div>
                <tab-tools :settings="settings" v-if="tab === 'tools'"></tab-tools>
                <tab-settings v-model="settings" v-if="tab === 'settings'"></tab-settings>
                <div class="modal-footer">
                    <a href="https://github.com/indr/webcg-devtools">https://github.com/indr/webcg-devtools</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { version } from '../package.json'
  import storage from './lib/storage'
  import TabSettings from './components/tab-settings.vue'
  import TabTools from './components/tab-tools.vue'

  export default {
    name: 'webcg-dev-tools',
    components: { TabSettings, TabTools },
    data () {
      return {
        tab: 'tools',
        version: version,
        settings: {}
      }
    },
    created () {
      this.loadSettings(this.settings)
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
    watch: {
      settings: function (settings) {
        this.applySettings(settings)
        this.saveSettings(settings)
      }
    },
    methods: {
      loadSettings (settings) {
        settings.callUpdateBeforePlay = storage.get('callUpdateBeforePlay', true)
        settings.showRemoveButton = storage.get('showRemoveButton', false)
        settings.backgroundColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color')
      },
      saveSettings (settings) {
        storage.set('callUpdateBeforePlay', settings.callUpdateBeforePlay)
        storage.set('showRemoveButton', settings.showRemoveButton)
      },
      applySettings (settings) {
        document.body.style.backgroundColor = settings.backgroundColor
      },
      dragged ($el) {
        storage.set('offsetTop', $el.offsetTop)
        storage.set('offsetLeft', $el.offsetLeft)
      },
      resized ($el) {
        storage.set('offsetWidth', $el.offsetWidth)
        storage.set('offsetHeight', $el.offsetHeight)
      },
      restoreDimensions ($draggable, $resizable) {
        const minWidth = 410
        const defaultWidth = 410
        const minHeight = 63
        const defaultHeight = 380
        $draggable.style.top = Math.max(0, storage.get('offsetTop') || 200) + 'px'
        $draggable.style.left = Math.max(0, storage.get('offsetLeft') || 200) + 'px'
        $resizable.style.width = Math.max(minWidth, storage.get('offsetWidth') || defaultWidth) + 'px'
        $resizable.style.height = Math.max(minHeight, storage.get('offsetHeight') || defaultHeight) + 'px'
      },

    }
  }
</script>

<style lang="scss">
    @import 'bootstrap.scss';
    @import 'style.scss';
</style>
