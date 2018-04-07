import lispEval from "./eval";
import standardEnv from "./standardEnv";
import Env from "./Env";
import parse from "./parse";

describe("eval", () => {
  describe("prodedure call", () => {
    // TODO fix spy
    it.skip("calls proc with args", () => {
      const e = { foo: () => {} };
      const spy = jest.spyOn(e, "foo");
      const env = new Env(e);
      const exp = ["foo", 0, 1];
      lispEval(exp, env);
      expect(spy).calledWith(0, 1);
    });
  });

  describe("variable reference", () => {
    const testEnv = new Env({
      foo: "bar"
    });

    it("fetches variable from env", () => {
      expect(lispEval("foo", testEnv)).toBe("bar");
    });
  });

  describe("constant literal", () => {
    it("returns the literal", () => {
      expect(lispEval(1)).toBe(1);
    });
  });

  describe("conditional", () => {
    it("returns pass literal", () => {
      const exp = ["if", true, 1, 0];
      expect(lispEval(exp)).toBe(1);
    });

    it("returns fail literal", () => {
      const exp = ["if", false, 0, 1];
      expect(lispEval(exp)).toBe(1);
    });

    it("returns value of pass expression", () => {
      const exp = ["if", true, ["+", 1, 0], ["+", 0, 0]];
      expect(lispEval(exp)).toBe(1);
    });

    it("returns value of fail expression", () => {
      const exp = ["if", false, ["+", 0, 0], ["+", 1, 0]];
      expect(lispEval(exp)).toBe(1);
    });

    it("evaluates condition expression", () => {
      const exp = ["if", [">", 1, 0], 1, 0];
      expect(lispEval(exp)).toBe(1);
    });
  });

  describe("definition", () => {
    it("defines a variable", () => {
      const env = new Env();
      const exp = ["define", "foo", 1];
      lispEval(exp, env);
      expect(env.get("foo")).toBe(1);
    });

    it("evaluates value expression", () => {
      const env = standardEnv();
      const exp = ["define", "foo", ["+", 0, 1]];
      lispEval(exp, env);
      expect(env.get("foo")).toBe(1);
    });
  });

  describe("quote", () => {
    it("returns the expression without evaluating", () => {
      const exp = ["quote", ["+", 0, 1]];
      expect(lispEval(exp)).toEqual(["+", 0, 1]);
    });
  });

  describe("lambda", () => {
    it("returns a funciton", () => {
      expect(typeof lispEval(["lambda", ["x"], ["+", "x", 1]])).toEqual(
        "function"
      );
    });

    it("can access outer env", () => {
      const exp = [
        "begin",
        ["define", "foo", 1],
        ["define", "bar", ["lambda", [], "foo"]],
        ["bar"]
      ];
      expect(lispEval(exp)).toBe(1);
    });

    it("gets passed parameters", () => {
      expect(lispEval([["lambda", ["x"], "x"], 1])).toBe(1);
    });
  });
});
