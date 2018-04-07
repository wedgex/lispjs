import { run } from "../";

describe("Lists", () => {
  describe("list", () => {
    it("creates a list", () => {
      expect(run("(list 1 (+ 3 4))")).toEqual([1, 7]);
    });

    it("creates an empty list", () => {
      expect(run("(list)")).toEqual([]);
    });
  });

  describe("car", () => {
    it("returns the head of a list", () => {
      expect(run("(car (list 1 2 3))")).toBe(1);
    });
  });

  describe("cdr", () => {
    it("returns the tail of a list", () => {
      expect(run("(cdr (list 1 2 3))")).toEqual([2, 3]);
    });
  });

  //describe('cons', () => {
  //it('returns a list combining args', () => {
  //expect(run("(cons (list 1) (list))")).to.eql([1])
  //expect(run("(cons (list 1) (list 2 3 4))")).to.eql([[1], 2, 3, 4])
  ////(cons "a" '(b c))                      ==>  ("a" b c)
  ////(cons 'a 3)                            ==>  (a . 3)
  ////(cons '(a b) 'c)                       ==>  ((a b) . c)
  //})
  //})

  describe("length", () => {
    it("returns length of lists", () => {
      expect(run("(length (list 1 2 3))")).toBe(3);
      expect(run("(length (list 1 (list 2) (list c d e)))")).toBe(3);
      expect(run("(length (list))")).toBe(0);
    });
  });

  describe("list?", () => {
    it("returns true for list", () => {
      expect(run("(list? (list))")).toBe(true);
    });

    it("returns false for other", () => {
      expect(run("(list? 1)")).toBe(false);
    });
  });

  describe("map", () => {
    it("maps one collection", () => {
      expect(run("(map car (list (list 1 2) (list 2 3)))")).toEqual([1, 2]);
    });

    it("maps multiple collections", () => {
      expect(run("(map + (list 1 1) (list 0 1))")).toEqual([1, 2]);
    });
  });

  describe("max", () => {
    it("returns max", () => {
      expect(run("(max 3 4)")).toEqual(4);
    });
  });

  describe("min", () => {
    it("returns min", () => {
      expect(run("(min 3 4)")).toEqual(3);
    });
  });
});
