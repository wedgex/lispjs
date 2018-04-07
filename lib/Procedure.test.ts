import Procedure from "./Procedure";
import Env from "./Env";

describe("Procedure", () => {
  let proc;
  let fakeEval;
  let env;

  beforeEach(() => {
    fakeEval = jest.fn();
    env = new Env();
    proc = new Procedure(["x"], ["x"], env, fakeEval);
  });

  it("returns a function", () => {
    expect(typeof proc).toEqual("function");
  });

  describe("func", () => {
    beforeEach(() => {
      proc(1);
    });

    it("calls eval", () => {
      expect(fakeEval).toBeCalled();
    });

    describe("eval", () => {
      it("is called with body", () => {
        expect(fakeEval.mock.calls[fakeEval.mock.calls.length - 1][0]).toEqual([
          "x"
        ]);
      });

      it("is called with new env with args matched to params", () => {
        const env = fakeEval.mock.calls[fakeEval.mock.calls.length - 1][1];
        expect(env.get("x")).toBe(1);
      });
    });
  });
});
