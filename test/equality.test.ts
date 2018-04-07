import { run } from "../";

describe("Equality", () => {
  describe("eq?", () => {
    it("literals are equal", () => {
      expect(run("(eq? 1 1)")).toBe(true);
    });

    it("different objects are not equal", () => {
      expect(run("(eq? (list 1) (list 1))")).toBe(false);
    });

    it("the same object is equal", () => {
      const lisp = `(begin (define foo (list 1)) (eq? foo foo))`;
      expect(run(lisp)).toBe(true);
    });
  });

  describe("equal?", () => {
    it("literals are equal", () => {
      expect(run("(equal? 1 1)")).toBe(true);
    });

    it("different objects are equal", () => {
      expect(run("(equal? (list 1) (list 1))")).toBe(true);
    });

    it("the same object is equal", () => {
      const lisp = `(begin (define foo (list 1)) (equal? foo foo))`;
      expect(run(lisp)).toBe(true);
    });
  });

  describe("not", () => {
    it("returns true if false", () => {
      expect(run("(not false)")).toBe(true);
    });

    it("returns false otherwise", () => {
      expect(run("(not true)")).toBe(false);
      expect(run("(not 3)")).toBe(false);
      expect(run("(not (list 3))")).toBe(false);
      expect(run("(not (list))")).toBe(false);
    });
  });
});
