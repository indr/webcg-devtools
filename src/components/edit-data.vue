<template>
    <div class="flex-columns">
        <div style="flex-grow: 1; display: flex; flex-direction: column;">
            <component v-bind:is="componentType" v-model="localValue"/>
        </div>
        <div class="form-row">
            <div class="form-group col">
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-outline-secondary" :class="{'active': componentType === 'edit-data-table'}">
                        <input type="radio" name="view" id="option2" autocomplete="off" v-model="componentType"
                               value="edit-data-table"> Table
                    </label>
                    <label class="btn btn-outline-secondary" :class="{'active': componentType === 'edit-data-json'}">
                        <input type="radio" name="view" id="option1" autocomplete="off" v-model="componentType"
                               value="edit-data-json"> JSON
                    </label>
                </div>
            </div>
            <div class="form-group col" style="text-align: right">
                <button type="button" class="btn btn-primary" @click="update()">
                    Update
                </button>
            </div>
        </div>
    </div>
</template>

<script>
  import EditDataTable from './edit-data-table.vue'
  import EditDataJson from './edit-data-json.vue'

  export default {
    name: 'edit-data',
    components: {EditDataTable, EditDataJson},
    props: ['value'],
    data () {
      let componentType = window.localStorage.getItem('webcg-devtools.edit-data.component-type')
      if (['edit-data-table', 'edit-data-json'].indexOf(componentType) < 0) {
        componentType = 'edit-data-table'
      }
      return {
        localValue: this.value,
        componentType
      }
    },
    watch: {
      localValue: function (val) {
        this.$emit('input', val)
      },
      componentType: function (val) {
        window.localStorage.setItem('webcg-devtools.edit-data.component-type', val)
      }
    },
    methods: {
      update () {
        this.$emit('update', this.localValue)
      }
    }
  }
</script>

<style scoped>

</style>
