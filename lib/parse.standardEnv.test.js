import { expect } from 'chai'
import run from './run'

// test standard enviroment via run (parse/eval)
describe('standard env', () => {
  // Math
  describe('+', () => {
    it('adds', () => {
      expect(run('(+ 1 1)')).to.eql(2)
    })
  })

  describe('-', () => {
    it('subtracts', () => {
      expect(run('(- 2 1)')).to.eql(1)
    })
  })

  describe('*', () => {
    it('multiplies', () => {
      expect(run('(* 2 2)')).to.eql(4)
    })
  })

  describe('/', () => {
    it('divides', () => {
      expect(run('(/ 4 2)')).to.eql(2)
    })
  })

  describe('>', () => {
    it('is greater than', () => {
      expect(run('(> 2 1)')).to.be.true
    })

    it('is not equal', () => {
      expect(run('(> 1 1)')).to.be.false
    })
  })

  describe('<', () => {
    it('is greater than', () => {
      expect(run('(< 1 2)')).to.be.true
    })

    it('is not equal', () => {
      expect(run('(< 1 1)')).to.be.false
    })
  })

  describe('>=', () => {
    it('is greater than', () => {
      expect(run('(>= 2 1)')).to.be.true
    })

    it('is not equal', () => {
      expect(run('(>= 1 1)')).to.be.true
    })
  })

  describe('<=', () => {
    it('is greater than', () => {
      expect(run('(<= 1 2)')).to.be.true
    })

    it('is not equal', () => {
      expect(run('(<= 1 1)')).to.be.true
    })
  })

  describe('=', () => {
    it('is equal', () => {
      expect(run('(= 1 1)')).to.be.true
    })

    it('is not equal', () => {
      expect(run('(= 1 2)')).to.be.false
    })
  })

  // https://people.csail.mit.edu/jaffer/r5rs_8.html#SEC48
  // using examples from Scheme docs to make sure some of my 
  // built in procs are at least close enough

  describe('list', () => {
    it('creates a list', () => {
      expect(run("(list 1 (+ 3 4))")).to.eql([1, 7])
    })

    it('creates an empty list', () => {
      expect(run('(list)')).to.eql([])
    })
  })

  describe('eq?', () => {
    it('literals are equal', () => {
      expect(run('(eq? 1 1)')).to.be.true
    })

    it('different objects are not equal', () => {
      expect(run('(eq? (list 1) (list 1))')).to.be.false
    })

    it('the same object is equal', () => {
      const lisp = `(begin (define foo (list 1)) (eq? foo foo))`
      expect(run(lisp)).to.be.true
    })
  })

  describe('equal?', () => {
    it('literals are equal', () => {
      expect(run('(equal? 1 1)')).to.be.true
    })

    it('different objects are equal', () => {
      expect(run('(equal? (list 1) (list 1))')).to.be.true
    })

    it('the same object is equal', () => {
      const lisp = `(begin (define foo (list 1)) (equal? foo foo))`
      expect(run(lisp)).to.be.true
    })
  })

  describe('car', () => {
    it('returns the head of a list', () => {
      expect(run('(car (list 1 2 3))')).to.eql(1)
    })
  })

  describe('cdr', () => {
    it('returns the tail of a list', () => {
      expect(run('(cdr (list 1 2 3))')).to.eql([2, 3])
    })
  })

  //describe('cons', () => {
    //it('returns a list combining args', () => {
      //expect(run("(cons (list 1) (list))")).to.eql([1])
      //expect(run("(cons (list 1) (list 2 3 4))")).to.eql([[1], 2, 3, 4])
      ////(cons "a" '(b c))                      ==>  ("a" b c)
        ////(cons 'a 3)                            ==>  (a . 3)
          ////(cons '(a b) 'c)                       ==>  ((a b) . c)
    //})
  //})
  //
  describe('length', () => {
    it('returns length of lists', () => {
      expect(run('(length (list 1 2 3))')).to.eql(3)
      expect(run('(length (list 1 (list 2) (list c d e)))')).to.eql(3)
      expect(run('(length (list))')).to.eql(0)
    })
  })

  describe('list?', () => {
    it('returns true for list', () => {
      expect(run('(list? (list))')).to.be.true
    })

    it('returns false for other', () => {
      expect(run('(list? 1)')).to.be.false
    })
  })

  describe('map', () => {
    it('maps one collection', () => {
      expect(run('(map car (list (list 1 2) (list 2 3)))')).to.eql([1, 2])
    })

    it('maps multiple collections', () => {
      expect(run('(map + (list 1 1) (list 0 1))')).to.eql([1, 2])
    })
  })

  describe('max', () => {
    it('returns max', () => {
      expect(run('(max 3 4)')).to.eql(4)
    })
  })

  describe('min', () => {
    it('returns min', () => {
      expect(run('(min 3 4)')).to.eql(3)
    })
  })

  describe('not', () => {
    it('returns true if false', () => {
      expect(run('(not false)')).to.be.true
    })

    it('returns false otherwise', () => {
      expect(run('(not true)')).to.be.false
      expect(run('(not 3)')).to.be.false
      expect(run('(not (list 3))')).to.be.false
      expect(run('(not (list))')).to.be.false
    })
  })

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
