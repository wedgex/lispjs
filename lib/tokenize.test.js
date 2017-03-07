import { expect } from 'chai'
import tokenize from './tokenize'

describe('tokenize', () => {
  describe('without spaces before/after (/)', () => {
    const code = '(begin (+ 3 2))'
    it('returns token array', () => {
      expect(tokenize(code)).to.eql(['(', 'begin', '(', '+', '3', '2', ')', ')'])
    })
  })

  describe('with spaces before/after (/)', () => {
    const code = '( begin ( + 3 2 ) )'
    it('returns token array', () => {
      expect(tokenize(code)).to.eql(['(', 'begin', '(', '+', '3', '2', ')', ')'])
    })
  })
})
