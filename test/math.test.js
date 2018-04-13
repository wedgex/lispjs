import { expect } from "chai";
import { run } from "../";

describe("Math", () => {
  describe("+", () => {
    it("adds", () => {
      expect(run("(+ 1 1)")).to.eql(2);
    });
  });

  describe("-", () => {
    it("subtracts", () => {
      expect(run("(- 2 1)")).to.eql(1);
    });
  });

  describe("*", () => {
    it("multiplies", () => {
      expect(run("(* 2 2)")).to.eql(4);
    });
  });

  describe("/", () => {
    it("divides", () => {
      expect(run("(/ 4 2)")).to.eql(2);
    });
  });

  describe(">", () => {
    it("is greater than", () => {
      expect(run("(> 2 1)")).to.be.true;
    });

    it("is not equal", () => {
      expect(run("(> 1 1)")).to.be.false;
    });
  });

  describe("<", () => {
    it("is greater than", () => {
      expect(run("(< 1 2)")).to.be.true;
    });

    it("is not equal", () => {
      expect(run("(< 1 1)")).to.be.false;
    });
  });

  describe(">=", () => {
    it("is greater than", () => {
      expect(run("(>= 2 1)")).to.be.true;
    });

    it("is not equal", () => {
      expect(run("(>= 1 1)")).to.be.true;
    });
  });

  describe("<=", () => {
    it("is greater than", () => {
      expect(run("(<= 1 2)")).to.be.true;
    });

    it("is not equal", () => {
      expect(run("(<= 1 1)")).to.be.true;
    });
  });

  describe("=", () => {
    it("is equal", () => {
      expect(run("(= 1 1)")).to.be.true;
    });

    it("is not equal", () => {
      expect(run("(= 1 2)")).to.be.false;
    });
  });
});
