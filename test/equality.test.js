import { expect } from "chai";
import { run } from "../";

describe("Equality", () => {
  describe("eq?", () => {
    it("literals are equal", () => {
      expect(run("(eq? 1 1)")).to.be.true;
    });

    it("different objects are not equal", () => {
      expect(run("(eq? (list 1) (list 1))")).to.be.false;
    });

    it("the same object is equal", () => {
      const lisp = `(begin (define foo (list 1)) (eq? foo foo))`;
      expect(run(lisp)).to.be.true;
    });
  });

  describe("equal?", () => {
    it("literals are equal", () => {
      expect(run("(equal? 1 1)")).to.be.true;
    });

    it("different objects are equal", () => {
      expect(run("(equal? (list 1) (list 1))")).to.be.true;
    });

    it("the same object is equal", () => {
      const lisp = `(begin (define foo (list 1)) (equal? foo foo))`;
      expect(run(lisp)).to.be.true;
    });
  });

  describe("not", () => {
    it("returns true if false", () => {
      expect(run("(not false)")).to.be.true;
    });

    it("returns false otherwise", () => {
      expect(run("(not true)")).to.be.false;
      expect(run("(not 3)")).to.be.false;
      expect(run("(not (list 3))")).to.be.false;
      expect(run("(not (list))")).to.be.false;
    });
  });
});
