<template>
    <div class="modal-body">
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <h3>DevTools</h3>
                <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model.lazy="localValue.callUpdateBeforePlay"
                               id="webcgCallUpdateBeforePlay">
                        <label class="form-check-label" for="webcgCallUpdateBeforePlay">
                            Call "update" before "play" like CasparCG
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model.lazy="localValue.showRemoveButton"
                               id="webcgShowRemoveButton">
                        <label class="form-check-label" for="webcgShowRemoveButton">
                            Show "Remove" button
                        </label>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-6">
                <h3>Overlay</h3>
                <div class="form-group">
                    <label for="webcgInputOptionBackgroundColor">Background color</label>
                    <input type="text" class="form-control" v-model.lazy="localValue.backgroundColor"
                           id="webcgInputOptionBackgroundColor">
                    <small class="form-text text-muted">
                        <a href="#" @click="localValue.backgroundColor = '#000'">Black</a>
                        <a href="#" @click="localValue.backgroundColor = '#fff'">White</a>
                        <a href="#" @click="localValue.backgroundColor = '#0f0'">Green</a>
                        <a href="#" @click="localValue.backgroundColor = 'rgba(0, 0, 0, 0)'">Transparent</a>
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'tab-settings',
    props: ['value'],
    data () {
      return {
        localValue: JSON.parse(JSON.stringify(this.value))
      }
    },
    watch: {
      localValue: {
        handler: function (val) {
          this.$emit('input', JSON.parse(JSON.stringify(val)))
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>