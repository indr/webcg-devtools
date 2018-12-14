import storage from '../../../src/lib/storage'

describe('storage', () => {
  it('returns default value', () => {
    const value = storage.get('name', true)
    expect(value).to.equal(true)
  })

  it('can set and get boolean value', () => {
    storage.set('boolean', true)
    const value = storage.get('boolean', false)
    expect(value).to.equal(true)
  })

  it('can set and get number value', () => {
    storage.set('boolean', 11)
    const value = storage.get('boolean', 22)
    expect(value).to.equal(11)
  })

  it('can set and get null', () => {
    storage.set('null', null)
    const value = storage.get('null', true)
    expect(value).to.equal(null)
  })
})
