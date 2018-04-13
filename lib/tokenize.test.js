import { expect } from "chai";
import tokenize from "./tokenize";

describe("tokenize", () => {
  it("without spaces before/after (/)", () => {
    const code = "(begin (+ 3 2))";
    expect(tokenize(code)).to.eql(["(", "begin", "(", "+", "3", "2", ")", ")"]);
  });

  it("with spaces before/after (/)", () => {
    const code = "( begin ( + 3 2 ) )";
    expect(tokenize(code)).to.eql(["(", "begin", "(", "+", "3", "2", ")", ")"]);
  });

  it("handles newlines and tabs", () => {
    const code = `( + 3 (
    - 3 2))`;
    expect(tokenize(code)).to.eql([
      "(",
      "+",
      "3",
      "(",
      "-",
      "3",
      "2",
      ")",
      ")"
    ]);
  });
});
