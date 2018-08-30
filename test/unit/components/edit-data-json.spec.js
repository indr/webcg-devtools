import Vue from 'vue'
import EditDataJson from '../../../src/components/edit-data-json.vue'

const Constructor = Vue.extend(EditDataJson)

const createCmp = function (propsData) {
  return new Constructor({ propsData })
}

describe('EditDataJson', () => {
  it('pretty stringifies value', () => {
    const vm = createCmp({ value: { 'a': 'b' } })
    expect(vm.localValue).to.equal('{\n  "a": "b"\n}')
  })

  it('emits input when localValue changes', (done) => {
    const vm = new Vue(EditDataJson)
    vm.$on('input', (val) => {
      expect(val).to.eql({ a: 'b' })
      done()
    })
    vm.localValue = '{"a": "b"}'
  })

  it('shows error message when localValue is invalid JSON', (done) => {
    const vm = new Vue(EditDataJson)
    vm.localValue = '{invalid JSON}'
    Vue.nextTick(() => {
      expect(vm.errorMessage).to.have.string('JSON Parse error:')
      done()
    })
  })
})
