const PluginFactory = require(".");

describe("PluginFactory", () => {
  describe("init", () => {
    it("should throw an error if options is not defined", () => {
      expect(() => new PluginFactory()).toThrow();
    });

    it("should throw if name is null or undefined", () => {
      expect(() => new PluginFactory({name: undefined})).toThrow();
      expect(() => new PluginFactory({name: null})).toThrow();
    });

    it("should throw if name is not a string", () => {
      expect(() => new PluginFactory({name: 32})).toThrow();
      expect(() => new PluginFactory({name: {}})).toThrow();
      expect(() => new PluginFactory({name: []})).toThrow();
    });

    it("should expose plugin name on a property name", () => {
      const fakeName = "test";

      const pf = new PluginFactory({name: "test"});

      expect(pf.name).toBe(fakeName);
    });
  });
});
