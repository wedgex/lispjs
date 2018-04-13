import { expect } from "chai";
import Env from "./Env";

const testGet = createEnv => {
  describe("get", () => {
    let env;

    beforeEach(() => {
      env = createEnv();
    });

    it("returns value from inner if available", () => {
      expect(env.get("foo")).to.eql("inner");
    });

    it("falls back to outer", () => {
      expect(env.get("bar")).to.eql("outer");
    });

    it("returns undefined if not found", () => {
      expect(env.get("baz")).to.not.exist;
    });
  });
};

describe("Env", () => {
  const inner = {
    foo: "inner"
  };

  const outer = {
    bar: "outer"
  };

  let env;

  describe("object outer", () => {
    testGet(() => new Env(outer, inner));
  });

  describe("Env outer", () => {
    testGet(() => new Env(new Env(outer), inner));
  });

  describe("set", () => {
    beforeEach(() => {
      env = new Env({ foo: "outer" });
    });

    it("sets value on inner", () => {
      env.set("foo", "inner");
      expect(env.get("foo")).to.eql("inner");
    });
  });
});
