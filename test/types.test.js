import { expect } from 'chai'
import { run } from '../'

describe('Types', () => {
  describe('null?', () => {
    it('returns true if empty list', () => {
      expect(run('(null? (list))')).to.be.true
    })

    it('returns false otherwise', () => {
      expect(run('(null? (list 1))')).to.be.false
    })
  })

  describe('number?', () => {
    it('returns true for integers', () => {
      expect(run('(number? 1)')).to.be.true
    })

    it('returns true for floats', () => {
      expect(run('(number? 1.0)')).to.be.true
    })

    it('returns false otherwise', () => {
      expect(run('(number? (list))')).to.be.false
    })
  })

  describe('prodedure?', () => {
    // TODO
  })
})
