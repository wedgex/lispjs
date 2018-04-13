import { run } from "../";
import { expect } from "chai";

describe("lispjs", () => {
  it("evaluates literals", () => expect(run("1")).to.eql(1));

  it("evaluates to last value", () => expect(run("1 2")).to.eql(2));

  it("fibonacci", () => {
    const lisp = `(define fib (lambda (n) (if (<= n 1) 1 (+ (fib (- n 1)) (fib (- n 2))))))
    (fib 10)`;
    expect(run(lisp)).to.eql(89);
  });
});
