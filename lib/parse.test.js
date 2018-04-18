import { expect } from "chai";
import parse from "./parse";

describe("parse", () => {
  it("throws error if there are no tokens", () => {
    expect(() => parse([])).to.throw("Unexpected EoF");
  });

  it("throw exception on unmatched )", () => {
    expect(() => parse([")"])).to.throw("Unexpected )");
    expect(() => parse(["(", ")", ")"])).to.throw("Unexpected )");
  });

  it("returns integer atoms", () => {
    expect(parse(["1"])).to.eql([1]);
  });

  it("returns float atoms", () => {
    expect(parse(["1.5"])).to.eql([1.5]);
  });

  it("returns symbol atoms", () => {
    expect(parse(["+"])).to.eql(["+"]);
  });

  it("returns expression", () => {
    expect(parse(["(", "+", "1", "2", ")"])).to.eql([["+", 1, 2]]);
  });

  it("returns nested expressions", () => {
    expect(parse(["(", "+", "(", "+", "1", "1", ")", "2", ")"])).to.eql([
      ["+", ["+", 1, 1], 2]
    ]);
  });

  it("handles multiple expressions", () => {
    expect(parse(["(", "+", "1", "2", ")", "(", "-", "2", "1", ")"])).to.eql([
      ["+", 1, 2],
      ["-", 2, 1]
    ]);
  });
});
