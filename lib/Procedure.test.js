import { expect } from "chai";
import createProc from "./procedure";
import Env from "./Env";
import sinon from "sinon";

describe("procedure", () => {
  let proc;
  let fakeEval;

  beforeEach(() => {
    fakeEval = sinon.spy();
    const env = new Env();
    proc = createProc(["x"], ["x"], env, fakeEval);
    proc(1);
  });

  it("evaluates with the body with parameters bound", () => {
    const body = fakeEval.lastCall.args[0];
    const env = fakeEval.lastCall.args[1];
    expect(body).to.eql(["x"]);
    expect(env.get("x")).to.eql(1);
  });
});
