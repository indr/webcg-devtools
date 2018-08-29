<template>
    <div class="form-row" style="flex-grow: 1">
        <div class="form-group col" style="display: flex">
            <table class="table table-bordered table-hover table-sm" style="flex: 1">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="record in records">
                    <td class="inline-edit">
                        <input type="text" class="inline-input form-control"
                               v-model="record['key']" @change="updateRecord(record)"/></td>
                    <td class="inline-edit">
                        <input type="text" class="inline-input form-control"
                               v-model="record['value']" @change="updateRecord(record)"/></td>
                    <td class="inline-buttons">
                        <button class="btn btn-outline-danger btn-sm" @click="deleteRecord(record)">-</button>
                    </td>
                </tr>
                <tr>
                    <td class="inline-edit">
                        <input ref="newRecordInputKey" type="text" class="inline-input form-control"
                               v-model="newRecord['key']">
                    </td>
                    <td class="inline-edit">
                        <input ref="newRecordInputValue" type="text" class="inline-input form-control"
                               v-model="newRecord['value']" @blur="autoCreateRecord(newRecord)">
                    </td>
                    <td class="inline-buttons">
                        <button class="btn btn-outline-success btn-sm" @click="createRecord(newRecord)">+</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'edit-data-table',
    props: ['value'],
    data () {
      return {
        newRecord: {},
        records: this.convertObjectToRecords(this.value)
      }
    },
    created () {
      this.resetNewRecord()
    },
    methods: {
      resetNewRecord () {
        const key = this.getNextKey(this.records)
        this.newRecord = {key: key, value: ''}
        if (this.$refs.newRecordInputKey) {
          this.$refs.newRecordInputKey.focus()
        }
      },
      createRecord () {
        const record = Object.assign({}, this.newRecord)
        this.records.push(record)
        this.resetNewRecord()
        this.emitInput()
      },
      autoCreateRecord () {
        if (this.newRecord['value']) {
          this.createRecord()
        }
      },
      deleteRecord (record) {
        const idx = this.records.indexOf(record)
        this.records.splice(idx, 1)
        this.emitInput()
      },
      updateRecord () {
        this.emitInput()
      },
      getNextKey (records) {
        let max = -1
        for (let i = 0; i < records.length; i++) {
          const record = records[i]
          const match = record.key.match(/^f(\d+)$/)
          if (match) {
            max = Math.max(max, parseInt(match[1]))
          }
        }
        return 'f' + (max + 1)
      },
      emitInput () {
        const obj = this.convertRecordsToObject(this.records)
        this.$emit('input', obj)
      },
      convertRecordsToObject (records) {
        const obj = {}
        for (let i = 0; i < records.length; i++) {
          obj[records[i].key] = records[i].value
        }
        return obj
      },
      convertObjectToRecords (obj) {
        const records = []
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            records.push({key, value: obj[key]})
          }
        }
        return records
      }
    }
  }
</script>

<style lang="scss">
    .webcg-devtools {
        table td.inline-edit {
            padding: 0;
        }

        input.inline-input {
            background-color: transparent;
            border-width: 0;
            margin: 1px;
            border-radius: 0;
            height: 100%;

            &:focus {
                margin: 0;
                border-width: 1px;
            }
        }
    }
</style>
