import { expect } from "chai";
import Procedure from "./Procedure";
import Env from "./Env";
import sinon from "sinon";

describe("Procedure", () => {
  let proc;
  let fakeEval;

  beforeEach(() => {
    fakeEval = sinon.spy();
    const env = new Env();
    proc = new Procedure(["x"], ["x"], env, fakeEval);
  });

  it("returns a function", () => {
    expect(proc).to.be.a("function");
  });

  describe("func", () => {
    beforeEach(() => {
      proc(1);
    });

    it("calls eval", () => {
      expect(fakeEval.called).to.be.true;
    });

    describe("eval", () => {
      it("is called with body", () => {
        expect(fakeEval.lastCall.args[0]).to.eql(["x"]);
      });

      it("is called with new env with args matched to params", () => {
        const env = fakeEval.lastCall.args[1];
        expect(env.get("x")).to.eql(1);
      });
    });
  });
});
