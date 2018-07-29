<template>
    <div class="flex-columns">
        <div class="form-row flex-columns" style="flex-grow: 1">
            <div class="form-group col flex-columns">
                <textarea class="form-control" :class="{'is-invalid': errorMessage}" style="flex: 1; resize: none"
                          v-model.lazy="localValue"></textarea>

            </div>
        </div>
        <div class="form-row" v-if="errorMessage">
            <div class="col">
                <div class="alert alert-danger" role="alert">
                    {{ errorMessage }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'edit-data-json',
    props: ['value'],
    data () {
      return {
        errorMessage: null,
        localValue: JSON.stringify(this.value, null, 2)
      }
    },
    watch: {
      localValue: function (val) {
        let obj
        try {
          obj = JSON.parse(val)
        } catch (ex) {
          this.errorMessage = ex.message
          return
        }
        this.errorMessage = null
        this.$emit('input', obj)
      }
    }
  }
</script>

<style scoped>

</style>