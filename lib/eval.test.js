import { expect } from 'chai'
import lispEval from './eval'
import standardEnv from './standardEnv'
import Env from './Env'
import sinon from 'sinon'
import parse from './parse'

describe('eval', () => {
  describe('prodedure call', () => {
    it('calls proc with args', () => {
      const env = new Env({}, { foo: sinon.spy() })
      const exp = ['foo', 0, 1]
      lispEval(exp, env)
      expect(env.get('foo').calledWith(0, 1)).to.be.true
    })
  })

  describe('variable reference', () => {
    const testEnv = new Env({}, {
      foo: 'bar',
    })

    it('fetches variable from env', () => {
      expect(lispEval('foo', testEnv)).to.eql('bar')
    })
  })

  describe('constant literal', () => {
    it('returns the literal', () => {
      expect(lispEval(1)).to.eql(1)
    })
  })

  describe('conditional', () => {
    it('returns pass literal', () => {
      const exp = ['if', true, 1, 0]
      expect(lispEval(exp)).to.eql(1)
    })

    it('returns fail literal', () => {
      const exp = ['if', false, 0, 1]
      expect(lispEval(exp)).to.eql(1)
    })

    it('returns value of pass expression', () => {
      const exp = ['if', true, ['+', 1, 0], ['+', 0, 0]]
      expect(lispEval(exp)).to.eql(1)
    })

    it('returns value of fail expression', () => {
      const exp = ['if', false, ['+', 0, 0], ['+', 1, 0]]
      expect(lispEval(exp)).to.eql(1)
    })

    it('evaluates condition expression', () => {
      const exp = ['if', ['>', 1, 0], 1, 0]
      expect(lispEval(exp)).to.eql(1)
    })
  })

  describe('definition', () => {
    it('defines a variable', () => {
      const env = new Env({}, {})
      const exp = ['define', 'foo', 1]
      lispEval(exp, env)
      expect(env.get('foo')).to.eql(1)
    })

    it('evaluates value expression', () => {
      const env = standardEnv()
      const exp = ['define', 'foo', ['+', 0, 1]]
      lispEval(exp, env)
      expect(env.get('foo')).to.eql(1)
    })
  })

  describe('quote', () => {
    it('returns the expression without evaluating', () => {
      const exp = ['quote', ['+', 0, 1]]
      expect(lispEval(exp)).to.eql(['+', 0, 1])
    })
  })

  describe('lambda', () => {
    it('returns a funciton', () => {
      expect(lispEval(['lambda', ['x'], ['+', 'x', 1]])).to.be.a('function')
    })

    it('can access outer env', () => {
      const exp = ['begin',
        ['define', 'foo', 1],
        ['define', 'bar', ['lambda', [], 'foo']],
        ['bar'],
      ]
      expect(lispEval(exp)).to.eql(1)
    })

    it('gets passed parameters', () => {
      expect(lispEval([['lambda', ['x'], 'x'], 1])).to.eql(1)
    })
  })
})
